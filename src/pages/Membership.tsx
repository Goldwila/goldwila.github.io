import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import FadeIn from "@/components/FadeIn";

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Membership = () => {
  const { subscription } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const memberships = [
    {
      name: "Standard Build (Free)",
      subtitle: "FREE",
      price: "$0",
      period: "",
      members: 0,
      features: ["Standard house in village", "Name your house on website"],
      buttonText: subscription?.isSubscribed ? "Claimed" : "Subscribe on YouTube",
      buttonVariant: "outline" as const,
      popular: false,
      disabled: subscription?.isSubscribed,
      styles: {
        card: "bg-white/5 border-white/10",
        name: "text-gray-400",
        accent: "text-gray-400",
        button: "bg-transparent border-white/20 hover:bg-white/10",
      },
    },
    {
      name: "Custom Styled ($10)",
      subtitle: "$10",
      price: "$10",
      period: "one-time",
      members: 0,
      features: [
        "Custom styled house (6+ designs to choose from)",
        "Interior decoration & furniture",
        "Larger plot than standard",
        "Built within 2 weeks",
        "Special Discord role",
      ],
      note: "Pay once, keep forever. No recurring charges.",
      buttonText: "Get Custom Styled - $10",
      buttonVariant: "default" as const,
      popular: true,
      styles: {
        card: "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/50 relative overflow-hidden transform hover:scale-105 transition-transform duration-300 shadow-xl shadow-primary/10",
        name: "text-primary",
        accent: "text-primary",
        button: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20",
      },
      tag: "MOST POPULAR",
    },
    {
      name: "Fully Custom ($25)",
      subtitle: "$25",
      price: "$25",
      period: "one-time",
      members: 0,
      features: [
        "Fully custom design (your schematic/images)",
        "Interior decoration & furniture",
        "Rare blocks & materials",
        "Area preference",
        "Express build (within 1 week)",
        "Premium Discord role",
      ],
      note: "Pay once, keep forever. No recurring charges.",
      buttonText: "Get Fully Custom - $25",
      buttonVariant: "default" as const,
      popular: false,
      styles: {
        card: "bg-white/5 border-white/10",
        name: "text-gray-300",
        accent: "text-gray-400",
        button: "bg-white/10 hover:bg-white/20 text-foreground border border-white/20",
      },
    },
  ];

  const supporterTier = {
    name: "OPTIONAL",
    subtitle: "Supporter",
    price: "$3",
    period: "/month",
    description: "Support the village and get exclusive perks.",
    features: [
      "Supporter Discord role & color",
      "Early video access (24h early)",
      "Behind-the-scenes updates",
      "Exclusive supporter chat",
      "Monthly world downloads",
    ],
    note2: "Can be added to any tier above. Cancel anytime.",
    buttonText: "Become a Supporter - $3/month",
    styles: {
      card: "bg-white/5 border-white/10",
      name: "text-gray-300",
      accent: "text-gray-400",
      button: "bg-white/10 hover:bg-white/20 text-foreground border border-white/20",
    },
  };

  const faqs = [
    {
      question: "Are the Custom Styled and Fully Custom tiers really one-time payments?",
      answer: "Yes! Pay once, keep forever. The $3/month Supporter tier is completely optional and separate.",
    },
    {
      question: "Can I get a house build AND become a supporter?",
      answer: "Absolutely! The Supporter tier can be added to any of the house build tiers for ongoing perks.",
    },
    {
      question: "What if I cancel the Supporter tier?",
      answer: "Your house stays forever. You only lose the ongoing supporter perks (early access, credits, etc.).",
    },
    {
      question: "How do I submit my design for the Fully Custom tier?",
      answer: "After purchase, join our Discord and share your schematic/images in the #custom-builds channel.",
    },
    {
      question: "Can I upgrade from Custom Styled to Fully Custom later?",
      answer: "Yes! Just pay the $15 difference and we'll upgrade your build.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <SEO 
        title="Membership Plans - Goldwila" 
        description="Upgrade your house and support the village. Choose from Standard, Custom Styled, or Fully Custom builds."
      />
      <div className="grain-overlay" />

      <div className="textured-bg min-h-screen">
        <Navbar />

        <div className="container mx-auto px-6 pt-32 pb-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Membership Plans
            </h1>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Upgrade your house and support the village
            </p>
          </div>

          {/* Membership Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            {memberships.map((membership, index) => (
              <FadeIn key={membership.name} delay={index * 0.1}>
                <Card
                  className={`relative flex flex-col p-8 rounded-2xl backdrop-blur-lg shadow-lg transition-all duration-300 h-full border ${
                    membership.styles.card
                  } ${!membership.popular && "hover:border-white/20"}`}
                >
                  {('tag' in membership && membership.tag === "MOST PfOPULAR") && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  {membership.popular && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none rounded-2xl" />
                  )}
                  <div className="flex-grow relative z-10">
                    <div className="text-center mb-8">
                      <h3 className="font-serif text-3xl font-bold text-foreground mb-2">
                        {membership.name}
                      </h3>
                      <div className="mb-4">
                        <span className="text-5xl font-bold text-foreground">
                          {membership.price}
                        </span>
                        {membership.period && (
                          <span className="text-foreground/60 text-sm ml-1">
                            {membership.period}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-foreground/60">
                        {membership.members} members
                      </p>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {membership.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckIcon
                            className={`w-5 h-5 ${membership.styles.accent} flex-shrink-0 mt-1`}
                          />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto relative z-10">
                    {membership.note && (
                      <p className="text-xs text-foreground/60 mb-6 text-center italic">
                        {membership.note}
                      </p>
                    )}

                    <Button
                      className={`w-full text-base font-bold py-6 rounded-lg z-20 relative cursor-pointer ${membership.styles.button}`}
                      disabled={membership.disabled}
                    >
                      {membership.buttonText}
                    </Button>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>

          {/* Supporter Tier - Full Width */}
          <FadeIn delay={0.3}>
            <Card
              className={`max-w-4xl mx-auto p-8 rounded-2xl backdrop-blur-lg shadow-lg transition-all duration-300 hover:scale-105 border ${supporterTier.styles.card}`}
            >
              <div className="md:flex md:items-center md:gap-8">
                <div className="md:w-2/3 text-center md:text-left">
                  <p
                    className={`text-sm font-semibold tracking-widest uppercase ${supporterTier.styles.name} mb-2`}
                  >
                    {supporterTier.name}
                  </p>
                  <h3 className="font-serif text-3xl font-bold text-foreground mb-2">
                    {supporterTier.subtitle}
                  </h3>
                  <p className="text-foreground/70 mt-2 mb-6">
                    {supporterTier.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-left">
                    {supporterTier.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckIcon
                          className={`w-5 h-5 ${supporterTier.styles.accent} flex-shrink-0 mt-1`}
                        />
                        <span className="text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:w-1/3 text-center">
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-foreground">
                      {supporterTier.price}
                    </span>
                    <span className="text-foreground/60 text-sm">
                      {supporterTier.period}
                    </span>
                  </div>
                  <Button
                    className={`w-full text-base font-bold py-6 rounded-lg ${supporterTier.styles.button}`}
                  >
                    {supporterTier.buttonText}
                  </Button>
                  <div className="text-center mt-6">
                    <p className="text-xs text-foreground/60">
                      {supporterTier.note2}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>

          {/* FAQs Section */}
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <FadeIn delay={0.4}>
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-foreground/70 text-lg">
                    Got questions? We've got answers.
                  </p>
                </div>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-white/10"
                      >
                        <AccordionTrigger className="text-left text-foreground hover:text-primary transition-all hover:no-underline py-6 text-lg font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-foreground/70 text-base leading-relaxed pb-6">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              </FadeIn>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Membership;
