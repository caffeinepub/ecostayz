import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Leaf, MapPin, Star, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Property } from "../backend.d";
import { useGetAllProperties } from "../hooks/useQueries";

const propertyImages = [
  "/assets/generated/property-1.dim_600x400.jpg",
  "/assets/generated/property-2.dim_600x400.jpg",
  "/assets/generated/property-3.dim_600x400.jpg",
];

const fallbackProperties: Property[] = [
  {
    id: "p1",
    name: "Rainforest Treehouse",
    location: "Daintree, Queensland",
    description:
      "Perch above the ancient canopy in this solar-powered treehouse surrounded by World Heritage rainforest.",
    ecoFeatures: ["Solar Power", "Rainwater", "Composting"],
    pricePerNight: BigInt(280),
    maxGuests: BigInt(4),
  },
  {
    id: "p2",
    name: "Lakeside Eco Cabin",
    location: "Cradle Mountain, Tasmania",
    description:
      "A serene pine-clad cabin on a pristine mountain lake, fully off-grid with breath-taking wilderness views.",
    ecoFeatures: ["Off-Grid", "Grey Water", "Wildlife Safe"],
    pricePerNight: BigInt(220),
    maxGuests: BigInt(6),
  },
  {
    id: "p3",
    name: "Beachfront Bungalow",
    location: "Noosa, Queensland",
    description:
      "Fall asleep to waves in this bamboo bungalow steps from pristine sand — reef-safe and zero-waste certified.",
    ecoFeatures: ["Solar Power", "Reef Safe", "Zero Waste"],
    pricePerNight: BigInt(310),
    maxGuests: BigInt(4),
  },
];

function PropertyCard({
  property,
  index,
  visible,
}: { property: Property; index: number; visible: boolean }) {
  const img = propertyImages[index % propertyImages.length];
  const ocidSuffix = index + 1;

  return (
    <article
      className={`group bg-card rounded-3xl overflow-hidden shadow-eco hover:shadow-eco-lg transition-all duration-500 hover:-translate-y-1 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        transition:
          "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease",
      }}
      data-ocid={`properties.item.${ocidSuffix}`}
    >
      <div className="relative overflow-hidden aspect-[3/2]">
        <img
          src={img}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-earth-300 fill-earth-300" />
          <span className="font-body text-xs font-semibold text-white">
            4.9
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <Badge className="bg-primary/90 text-primary-foreground border-0 font-body text-xs backdrop-blur-sm">
            <Leaf className="w-3 h-3 mr-1" />
            Eco Certified
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-foreground mb-1.5">
          {property.name}
        </h3>
        <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span className="font-body text-sm">{property.location}</span>
        </div>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Eco feature badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {property.ecoFeatures.slice(0, 3).map((feat) => (
            <span
              key={feat}
              className="inline-flex items-center gap-1 bg-forest-100 text-forest-700 text-xs font-body font-medium px-2.5 py-1 rounded-full"
            >
              <Leaf className="w-2.5 h-2.5" />
              {feat}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-display text-2xl font-semibold text-foreground">
              ${property.pricePerNight.toString()}
            </span>
            <span className="font-body text-sm text-muted-foreground">
              {" "}
              / night
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span className="font-body text-sm">
              Up to {property.maxGuests.toString()}
            </span>
          </div>
        </div>

        <Button
          asChild
          className="w-full mt-4 bg-primary hover:bg-forest-800 text-primary-foreground font-body font-medium rounded-full transition-all duration-300"
          data-ocid={`properties.view_button.${ocidSuffix}`}
        >
          <a href="#contact">View Details</a>
        </Button>
      </div>
    </article>
  );
}

export default function Properties() {
  const { data: properties, isLoading } = useGetAllProperties();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const displayProperties =
    properties && properties.length > 0 ? properties : fallbackProperties;

  return (
    <section id="properties" className="py-20 lg:py-28 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 block">
            Our Properties
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mb-4">
            Extraordinary Places to Stay
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Each property is hand-picked for its minimal environmental footprint
            and maximum connection to the natural world.
          </p>
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            data-ocid="properties.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-3xl overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            data-ocid="properties.list"
          >
            {displayProperties.slice(0, 3).map((property, i) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={i}
                visible={visible}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
