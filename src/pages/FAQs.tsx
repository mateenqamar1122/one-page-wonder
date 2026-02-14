import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the virtual try-on work?",
    answer:
      "Our virtual try-on uses your device's camera to capture your image and overlays selected products in real-time, giving you a realistic preview of how items look on you before purchasing.",
  },
  {
    question: "Is the virtual try-on free to use?",
    answer:
      "Yes! The virtual try-on feature is completely free for all users. Simply browse our products, select one, and click 'Try On' to get started.",
  },
  {
    question: "What devices are supported?",
    answer:
      "VirtuWear works on any modern browser with camera access — desktops, laptops, tablets, and smartphones. For the best experience, we recommend using Chrome or Safari.",
  },
  {
    question: "How accurate is the virtual try-on?",
    answer:
      "Our AI-powered technology provides a highly realistic representation. While results may vary slightly from real life, it gives you an excellent idea of fit, style, and color.",
  },
  {
    question: "Can I save or share my try-on results?",
    answer:
      "Yes! After capturing your try-on photo, you can download the image to share with friends or save for later reference.",
  },
  {
    question: "What products are available for try-on?",
    answer:
      "We currently support sunglasses, watches, jackets, and blazers for virtual try-on. We're constantly adding new categories and products.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping times and costs vary by location. Check our shipping page for more details.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day hassle-free return policy. If you're not satisfied with your purchase, you can return it for a full refund or exchange.",
  },
];

const FAQs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about VirtuWear and our virtual try-on experience.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;
