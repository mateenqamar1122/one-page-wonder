import * as faceapi from "face-api.js";

let modelsLoaded = false;

export async function loadFaceModels(): Promise<void> {
  if (modelsLoaded) return;
  const MODEL_URL = "/models";
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
  ]);
  modelsLoaded = true;
}

export interface OverlayPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number; // rotation in radians
}

/**
 * Detect face landmarks and compute eyewear overlay position.
 * Returns null if no face is detected.
 */
export async function detectEyewearPosition(
  imageElement: HTMLImageElement | HTMLCanvasElement
): Promise<OverlayPosition | null> {
  const detection = await faceapi
    .detectSingleFace(imageElement, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks();

  if (!detection) return null;

  const landmarks = detection.landmarks;
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();

  // Center of each eye
  const leftCenter = {
    x: leftEye.reduce((s, p) => s + p.x, 0) / leftEye.length,
    y: leftEye.reduce((s, p) => s + p.y, 0) / leftEye.length,
  };
  const rightCenter = {
    x: rightEye.reduce((s, p) => s + p.x, 0) / rightEye.length,
    y: rightEye.reduce((s, p) => s + p.y, 0) / rightEye.length,
  };

  const eyeDistance = Math.hypot(
    rightCenter.x - leftCenter.x,
    rightCenter.y - leftCenter.y
  );

  const angle = Math.atan2(
    rightCenter.y - leftCenter.y,
    rightCenter.x - leftCenter.x
  );

  // Glasses width ~2.4x the eye distance, centered between eyes
  const width = eyeDistance * 2.4;
  const height = width * 0.45; // typical glasses aspect ratio
  const centerX = (leftCenter.x + rightCenter.x) / 2;
  const centerY = (leftCenter.y + rightCenter.y) / 2;

  return {
    x: centerX - width / 2,
    y: centerY - height / 2,
    width,
    height,
    angle,
  };
}

/**
 * Get a default overlay position for non-eyewear products (watches, clothing).
 * Centered in the lower portion of the image for watches, mid-body for clothing.
 */
export function getDefaultOverlayPosition(
  imageWidth: number,
  imageHeight: number,
  category: "watch" | "clothing"
): OverlayPosition {
  const size = Math.min(imageWidth, imageHeight) * 0.3;

  if (category === "watch") {
    return {
      x: imageWidth * 0.15,
      y: imageHeight * 0.55,
      width: size,
      height: size,
      angle: 0,
    };
  }

  // Clothing: center-body
  return {
    x: (imageWidth - size * 1.2) / 2,
    y: imageHeight * 0.3,
    width: size * 1.2,
    height: size * 1.5,
    angle: 0,
  };
}

/**
 * Remove near-white / light background pixels from an image,
 * returning a new canvas with transparency.
 */
function removeBackground(img: HTMLImageElement): HTMLCanvasElement {
  const c = document.createElement("canvas");
  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0, w, h);

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  // Sample corners to detect background color
  const samplePositions = [
    0, // top-left
    (w - 1) * 4, // top-right
    (h - 1) * w * 4, // bottom-left
    ((h - 1) * w + (w - 1)) * 4, // bottom-right
  ];

  let bgR = 0, bgG = 0, bgB = 0, count = 0;
  for (const idx of samplePositions) {
    if (idx >= 0 && idx + 2 < data.length) {
      bgR += data[idx];
      bgG += data[idx + 1];
      bgB += data[idx + 2];
      count++;
    }
  }
  bgR = Math.round(bgR / count);
  bgG = Math.round(bgG / count);
  bgB = Math.round(bgB / count);

  const threshold = 60; // color distance threshold
  const edgeFade = 30; // softer edge transition

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const dist = Math.sqrt(
      (r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2
    );

    if (dist < threshold) {
      data[i + 3] = 0; // fully transparent
    } else if (dist < threshold + edgeFade) {
      // Feathered edge for smooth transition
      const alpha = ((dist - threshold) / edgeFade) * 255;
      data[i + 3] = Math.min(data[i + 3], Math.round(alpha));
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return c;
}

/**
 * Draw the user photo with the product overlay onto a canvas and return a data URL.
 * Removes background from overlay and applies realistic blending.
 */
export function compositeImage(
  canvas: HTMLCanvasElement,
  userImg: HTMLImageElement,
  overlayImg: HTMLImageElement,
  position: OverlayPosition
): string {
  const ctx = canvas.getContext("2d")!;
  canvas.width = userImg.naturalWidth || userImg.width;
  canvas.height = userImg.naturalHeight || userImg.height;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(userImg, 0, 0, canvas.width, canvas.height);

  // Remove background from overlay
  const cleanOverlay = removeBackground(overlayImg);

  // Draw shadow first for depth
  ctx.save();
  ctx.translate(position.x + position.width / 2, position.y + position.height / 2);
  ctx.rotate(position.angle);
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowBlur = position.width * 0.05;
  ctx.shadowOffsetX = position.width * 0.01;
  ctx.shadowOffsetY = position.width * 0.02;

  // Draw the clean overlay
  ctx.globalAlpha = 0.92;
  ctx.drawImage(
    cleanOverlay,
    -position.width / 2,
    -position.height / 2,
    position.width,
    position.height
  );

  // Second pass with multiply blend for color integration
  ctx.globalCompositeOperation = "multiply";
  ctx.globalAlpha = 0.08;
  ctx.drawImage(
    cleanOverlay,
    -position.width / 2,
    -position.height / 2,
    position.width,
    position.height
  );

  ctx.restore();

  return canvas.toDataURL("image/jpeg", 0.92);
}
