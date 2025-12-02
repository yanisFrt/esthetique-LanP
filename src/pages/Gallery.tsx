import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type GalleryItem = {
  id: number;
  category: string;
  service: string;
  beforeImage: string;
  afterImage: string;
  description: string;
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showBefore, setShowBefore] = useState<{ [key: number]: boolean }>({});

  const categories = [
    "all",
    "beaute-regard",
    "soins-visage",
    "epilations",
    "makeup",
  ];

  const categoryLabels: { [key: string]: string } = {
    all: "Tout",
    "beaute-regard": "Beauté du Regard",
    "soins-visage": "Soins Visage",
    epilations: "Épilations",
    makeup: "SIGNATŪR MAKEUP",
  };

  const galleryItems: GalleryItem[] = [
    // BEAUTÉ DU REGARD - Microblading
    {
      id: 1,
      category: "beaute-regard",
      service: "Microblading — SIGNATŪR Brow",
      beforeImage: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&h=600&fit=crop&q=80",
      description: "Restructuration sourcils - Effet poil à poil naturel",
    },
    {
      id: 2,
      category: "beaute-regard",
      service: "Microblading — SIGNATŪR Brow",
      beforeImage: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop&q=80",
      description: "Densification sourcils clairsemés",
    },
    {
      id: 3,
      category: "beaute-regard",
      service: "Shading — Poudré Brow",
      beforeImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop&q=80",
      description: "Effet poudré élégant et sophistiqué",
    },
    {
      id: 4,
      category: "beaute-regard",
      service: "Combo Microblading + Shading",
      beforeImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=600&fit=crop&q=80",
      description: "Résultat complet : structure + intensité",
    },
    {
      id: 5,
      category: "beaute-regard",
      service: "Brow Lift + Coloration",
      beforeImage: "https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80",
      description: "Effet lift naturel et intensification",
    },

    // SOINS VISAGE - Microneedling
    {
      id: 6,
      category: "soins-visage",
      service: "Microneedling Visage — Time Glow",
      beforeImage: "https://images.unsplash.com/photo-1498758536662-35b82cd15e29?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800&h=600&fit=crop&q=80",
      description: "Amélioration texture et éclat de la peau",
    },
    {
      id: 7,
      category: "soins-visage",
      service: "Microneedling Visage — Time Glow",
      beforeImage: "https://images.unsplash.com/photo-1506003094589-53954a26283f?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop&q=80",
      description: "Réduction cicatrices et pores",
    },
    {
      id: 8,
      category: "soins-visage",
      service: "Microneedling Contour Yeux — Eye Glow",
      beforeImage: "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1508186225823-0963cf9ab0de?w=800&h=600&fit=crop&q=80",
      description: "Réduction cernes et ridules",
    },
    {
      id: 9,
      category: "soins-visage",
      service: "ProPeel — Peeling Chimique",
      beforeImage: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1560087637-bf797bc7796a?w=800&h=600&fit=crop&q=80",
      description: "Uniformisation teint et anti-âge",
    },
    {
      id: 10,
      category: "soins-visage",
      service: "Hydratation Express — Facial Flash",
      beforeImage: "https://images.unsplash.com/photo-1512361436605-a484bdb34b5f?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&h=600&fit=crop&q=80",
      description: "Coup d'éclat et hydratation intense",
    },

    // ÉPILATIONS
    {
      id: 11,
      category: "epilations",
      service: "Épilation Sourcils",
      beforeImage: "https://images.unsplash.com/photo-1508835277982-1c1b0e205603?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=600&fit=crop&q=80",
      description: "Sourcils parfaitement dessinés",
    },
    {
      id: 12,
      category: "epilations",
      service: "Épilation Visage Complet",
      beforeImage: "https://images.unsplash.com/photo-1500522144261-ea64433bbe27?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop&q=80",
      description: "Peau nette et douce",
    },
    {
      id: 13,
      category: "epilations",
      service: "Épilation Jambes",
      beforeImage: "https://images.unsplash.com/photo-1520065786657-b71a007dd8a5?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1526336686768-c75e851d7b15?w=800&h=600&fit=crop&q=80",
      description: "Résultat lisse et longue durée",
    },

    // SIGNATŪR MAKEUP
    {
      id: 14,
      category: "makeup",
      service: "SIGNATŪR Flash Look",
      beforeImage: "https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop&q=80",
      description: "Maquillage express pour un teint frais",
    },
    {
      id: 15,
      category: "makeup",
      service: "SIGNATŪR Day Look",
      beforeImage: "https://images.unsplash.com/photo-1514315384763-ba401779410f?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=600&fit=crop&q=80",
      description: "Maquillage naturel et lumineux",
    },
    {
      id: 16,
      category: "makeup",
      service: "SIGNATŪR Evening Glow",
      beforeImage: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1555068800-678f179ce085?w=800&h=600&fit=crop&q=80",
      description: "Look sophistiqué pour soirées",
    },
    {
      id: 17,
      category: "makeup",
      service: "SIGNATŪR Wedding Look",
      beforeImage: "https://images.unsplash.com/photo-1505968409348-bd000797c92e?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=600&fit=crop&q=80",
      description: "Maquillage mariage premium et raffiné",
    },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const toggleImage = (id: number) => {
    setShowBefore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl md:text-6xl font-light mb-6">
            Galerie Avant/Après
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Découvrez les transformations réalisées avec nos prestations.
            Cliquez sur les images pour voir le résultat avant/après.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm font-light hover:bg-primary/90 transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              {categoryLabels[category]}
            </Badge>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => toggleImage(item.id)}
            >
              <div className="relative aspect-square">
                <img
                  src={showBefore[item.id] ? item.beforeImage : item.afterImage}
                  alt={item.service}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge
                    variant="secondary"
                    className="bg-background/90 backdrop-blur"
                  >
                    {showBefore[item.id] ? "Avant" : "Après"}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <span className="text-white text-sm font-light">
                    Cliquez pour voir {showBefore[item.id] ? "après" : "avant"}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-serif text-lg font-light mb-1">
                  {item.service}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-secondary rounded-lg p-8 text-center">
          <h2 className="font-serif text-2xl font-light mb-3">
            Résultats Authentiques
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Toutes nos prestations sont réalisées avec soin et précision.
            Les résultats peuvent varier selon les caractéristiques individuelles.
            Contactez-nous pour une consultation personnalisée.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
