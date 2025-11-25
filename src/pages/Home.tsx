import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Sparkles, Scissors } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";
import beauteRegard from "@/assets/beaute-regard.jpg";
import soinsVisage from "@/assets/soins-visage.jpg";
import epilations from "@/assets/epilations.jpg";

const Home = () => {
  const services = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Beauté du Regard",
      description: "Microblading, shading et restructuration pour sublimer vos sourcils naturellement.",
      image: beauteRegard,
      link: "/prestations#beaute-regard"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Soins Visage",
      description: "Microneedling, peelings chimiques et soins hydratants pour une peau éclatante.",
      image: soinsVisage,
      link: "/prestations#soins-visage"
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Épilations",
      description: "Épilations précises du visage et du corps dans le respect de votre peau.",
      image: epilations,
      link: "/prestations#epilations"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            filter: "brightness(0.7)"
          }}
        />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-light mb-6 tracking-wide animate-fade-in">
            Révélez Votre Beauté Naturelle
          </h1>
          <p className="text-lg md:text-xl font-light mb-8 leading-relaxed max-w-2xl mx-auto">
            Plus de 30 ans d'expertise en esthétique. Précision, douceur et bien-être au service de votre authenticité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-foreground font-light">
              <Link to="/prestations">Découvrir nos Prestations</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-foreground font-light">
              <Link to="/contact">Nous Contacter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
            L'Excellence au Service de Votre Beauté
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Chez SIGNATŪR, nous croyons qu'une femme brille toujours par son naturel et son authenticité. 
            Notre mission est de révéler cette beauté, jamais de la transformer. Avec des produits professionnels 
            haut de gamme et une expertise de plus de trois décennies, chaque soin est une promesse de confort, 
            de sécurité et de résultats visibles.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-center mb-16">
            Nos Spécialités
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden border-border hover:shadow-lg transition-shadow">
                {service.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-primary">{service.icon}</div>
                    <h3 className="font-serif text-2xl font-light">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <Button asChild variant="link" className="px-0 text-foreground hover:text-primary font-light">
                    <Link to={service.link}>En savoir plus →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
            Prête à Révéler Votre Beauté ?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Prenez rendez-vous dès aujourd'hui et découvrez l'expertise SIGNATŪR
          </p>
          <Button asChild size="lg" className="bg-foreground hover:bg-foreground/90 text-background font-light">
            <Link to="/contact">Contactez-nous</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
