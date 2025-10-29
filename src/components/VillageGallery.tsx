import { Card } from "@/components/ui/card";

const VillageGallery = () => {
  const galleryImages = [
    { title: "Main Square", description: "Village center with fountain" },
    { title: "Residential Area", description: "Subscriber houses row" },
    { title: "Community Farm", description: "Shared farming area" },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Our Village
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Take a look at what we've built together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <Card 
              key={index}
              className="overflow-hidden border-white/10 hover:border-white/20 transition-all group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src="/home.png" 
                  alt={image.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-4 bg-white/5 backdrop-blur-sm">
                <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                  {image.title}
                </h3>
                <p className="text-foreground/60 text-sm">
                  {image.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VillageGallery;
