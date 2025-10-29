import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const features = [
  {
    title: "Your Own House",
    description: "Every subscriber gets their own unique house built in our growing Minecraft village. It's not just decoration - it's proof you're part of something bigger.",
  },
  {
    title: "Watch It Grow",
    description: "See our village transform from a quiet settlement into a bustling community. Your house will be featured in the next episode after you subscribe.",
  },
  {
    title: "Be Part of History",
    description: "As the village expands, so does your legacy. Every building tells a story, and yours is waiting to be written in blocks and pixels.",
  },
];

const FeaturesSection = () => {
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchSubscriberCount = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/houses/subscriber-count`);
        const data = await response.json();
        setSubscriberCount(data.subscriberCount);
      } catch (error) {
        console.error("Failed to fetch subscriber count:", error);
      }
    };

    fetchSubscriberCount();
  }, []);

  return (
    <section id="village" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto mb-8">
            Watch as our village transforms with every new subscriber. Your house isn't just a structure - it's your mark on our world.
          </p>
          {subscriberCount !== null && (
            <div className="text-center animate-fade-in">
              <p className="text-foreground/60 text-sm mb-2">Current Subscribers</p>
              <p className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                {subscriberCount.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="textured-bg border-white/10 p-8 hover:border-white/20 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
