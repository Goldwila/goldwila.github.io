import { Card } from "@/components/ui/card";

const VillageGallery = () => {
  const galleryImages = [
    { src: "/v1.webp" },
    { src: "/v2.webp" },
    { src: "/v3.webp" },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Our Village
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            A glimpse into our growing world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <img 
                src={image.src} 
                alt="Village view"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VillageGallery;
