import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Membership = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const memberships = [
    {
      name: "FREE",
      subtitle: "YouTube Subscriber",
      price: "$0",
      period: "",
      features: [
        "Standard house in village",
        "Name your house on website",
        "Discord community access",
        "Featured in episodes",
      ],
      buttonText: "Already Included - Subscribe on YouTube",
      buttonVariant: "outline" as const,
      popular: false,
      themeColor: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      accentColor: "text-green-400",
    },
    {
      name: "POPULAR",
      subtitle: "Custom House",
      price: "$10",
      period: "one-time",
      features: [
        "Custom styled house (6+ designs to choose from)",
        "Interior decoration & furniture",
        "Larger plot than standard",
        "Built within 2 weeks",
        "Special Discord role",
      ],
      note: "Pay once, keep forever. No recurring charges.",
      buttonText: "Get Custom House - $10",
      buttonVariant: "default" as const,
      popular: true,
      themeColor: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      accentColor: "text-blue-400",
    },
    {
      name: "PREMIUM",
      subtitle: "Premium Custom",
      price: "$25",
      period: "one-time",
      features: [
        "Fully custom design (your schematic/images)",
        "Unique rare blocks & materials",
        "Area preference (choose your district)",
        "Express build (within 1 week)",
        "Premium Discord role",
        "Behind-the-scenes build documentation",
      ],
      note: "Pay once, keep forever. No recurring charges.",
      buttonText: "Get Premium Custom - $25",
      buttonVariant: "default" as const,
      popular: false,
      themeColor: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      accentColor: "text-purple-400",
    },
  ];

  const supporterTier = {
    name: "OPTIONAL",
    subtitle: "Supporter",
    price: "$3",
    period: "/month",
    description: "Want to support the project ongoing?",
    features: [
      "Supporter Discord role & color",
      "Early video access (24h early)",
      "Behind-the-scenes updates",
      "Vote on community projects",
      "Name in video credits",
      "Exclusive supporter chat",
      "Monthly world downloads",
    ],
    note: "No house benefits - just ongoing support perks.",
    note2: "Can be added to any tier above. Cancel anytime.",
    buttonText: "Become a Supporter - $3/month",
    themeColor: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30",
    accentColor: "text-orange-400",
  };

  const faqs = [
    {
      question: "Is the custom house really one-time? No recurring charges?",
      answer: "Yes! Pay once, keep forever. The $3/month Supporter tier is completely optional.",
    },
    {
      question: "Can I get a custom house AND become a supporter?",
      answer: "Absolutely! The Supporter tier can be added to any tier for ongoing perks.",
    },
    {
      question: "What if I cancel the Supporter tier?",
      answer: "Your house stays forever. You only lose the ongoing perks (early access, credits, etc.).",
    },
    {
      question: "How do I submit my custom design?",
      answer: "After purchase, join our Discord and share your schematic/images in the #custom-builds channel.",
    },
    {
      question: "Can I upgrade from Custom House to Premium Custom later?",
      answer: "Yes! Just pay the $15 difference and we'll upgrade your build.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
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
            {memberships.map((membership) => (
              <Card
                key={membership.name}
                className={`relative p-8 bg-gradient-to-br ${membership.themeColor} backdrop-blur-sm transition-all ${
                  membership.popular
                    ? `${membership.borderColor} border-2 scale-105 shadow-2xl`
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {membership.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full">
                    <span className="text-xs font-bold text-white">MOST POPULAR</span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <p className={`text-sm font-semibold ${membership.accentColor} mb-1`}>{membership.name}</p>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                    {membership.subtitle}
                  </h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-foreground">
                      {membership.price}
                    </span>
                    {membership.period && (
                      <span className="text-foreground/60 text-sm ml-1">{membership.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {membership.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className={`w-5 h-5 ${membership.accentColor} flex-shrink-0 mt-0.5`} />
                      <span className="text-foreground/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {membership.note && (
                  <p className="text-xs text-foreground/60 mb-4 text-center italic">
                    {membership.note}
                  </p>
                )}

                <Button
                  className={`w-full ${
                    membership.buttonVariant === "outline"
                      ? "bg-white/10 hover:bg-white/20"
                      : "bg-primary hover:bg-primary/90"
                  }`}
                  size="lg"
                >
                  {membership.buttonText}
                </Button>
              </Card>
            ))}
          </div>

          {/* Supporter Tier - Full Width */}
          <Card className={`max-w-4xl mx-auto p-8 bg-gradient-to-br ${supporterTier.themeColor} backdrop-blur-sm ${supporterTier.borderColor} hover:border-white/20 transition-all mb-16`}>
            <div className="text-center mb-6">
              <p className={`text-sm font-semibold ${supporterTier.accentColor} mb-1`}>{supporterTier.name}</p>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                {supporterTier.subtitle}
              </h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-foreground">
                  {supporterTier.price}
                </span>
                <span className="text-foreground/60 text-sm">{supporterTier.period}</span>
              </div>
              <p className="text-foreground/70 mt-2">{supporterTier.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {supporterTier.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className={`w-5 h-5 ${supporterTier.accentColor} flex-shrink-0 mt-0.5`} />
                  <span className="text-foreground/80 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-center mb-6">
              <p className="text-sm text-foreground/60 mb-1">{supporterTier.note}</p>
              <p className="text-sm text-foreground/60">{supporterTier.note2}</p>
            </div>

            <Button className="w-full md:w-auto md:mx-auto md:block bg-primary hover:bg-primary/90" size="lg">
              {supporterTier.buttonText}
            </Button>
          </Card>

          {/* FAQs Section */}
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
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
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Membership;
