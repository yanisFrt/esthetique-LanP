import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Services = () => {
  const beauteRegard = [
    { service: "Microblading – Signatūr Brow", price: "150 €" },
    { service: "Shading – Poudré Brow", price: "180 €" },
    { service: "Combo Microblading + Shading – Brow Fusion", price: "190 €" },
    { service: "Brow Sculpt (Restructuration + Coloration)", price: "25 €" },
    { service: "Brow Lift + coloration", price: "45 €" },
  ];

  const soinsVisage = [
    { service: "Microneedling contour des yeux – Eye Glow", price: "40 €" },
    { service: "Microneedling visage complet – Time Glow", price: "70 €" },
    { service: "Microneedling visage + cou", price: "100 €" },
    { service: "Forfait / 4 séances microneedling", price: "350 €" },
    { service: "Hydratation Express – Facial Flash", price: "39 €" },
    {
      service: "ProPeel – Peeling chimique anti-âge & anti-taches",
      price: "120 € / séance",
    },
  ];

  const epilationsVisage = [
    { service: "Sourcils", price: "11 €" },
    { service: "Lèvre supérieure", price: "9 €" },
    { service: "Menton", price: "9 €" },
    { service: "Pattes d'oie", price: "15 €" },
    { service: "Visage complet", price: "35 €" },
  ];

  const epilationsCorps = [
    { service: "1/2 jambes", price: "25 €" },
    { service: "Jambes complètes", price: "35 €" },
    { service: "Aisselles", price: "19 €" },
    { service: "Maillot simple", price: "11 €" },
    { service: "Maillot échancré", price: "19 €" },
    { service: "Maillot intégral", price: "25 €" },
    { service: "Interfessier", price: "22 €" },
    { service: "Forfait corps complet", price: "59 €" },
  ];

  const ServiceSection = ({
    title,
    description,
    services,
    id,
  }: {
    title: string;
    description: string;
    services: { service: string; price: string }[];
    id: string;
  }) => (
    <Card id={id} className="scroll-mt-24">
      <CardHeader>
        <CardTitle className="font-serif text-3xl font-light">
          {title}
        </CardTitle>
        <p className="text-muted-foreground leading-relaxed pt-2">
          {description}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {services.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-start gap-4">
                <span className="text-foreground">{item.service}</span>
                {/* <span className="text-primary text-yellow-600 font-light whitespace-nowrap">{item.price}</span> */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-600">
                  {item.price}
                </span>
              </div>
              {index < services.length - 1 && <Separator className="mt-3" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl font-light mb-6">
            Prestations & Tarifs
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Découvrez nos prestations dédiées à révéler votre beauté naturelle.
            Chaque soin est réalisé avec précision et douceur, dans le respect
            de votre peau.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-8">
          <ServiceSection
            id="beaute-regard"
            title="Beauté du Regard"
            description="Sublimez vos sourcils avec nos techniques de pointe : microblading, shading ou combo. Des résultats naturels et durables pour un regard parfaitement structuré."
            services={beauteRegard}
          />

          <ServiceSection
            id="soins-visage"
            title="Soins Visage"
            description="Offrez à votre peau un éclat renouvelé avec nos soins anti-âge, hydratants et régénérants. Du microneedling aux peelings chimiques, chaque traitement est adapté à vos besoins."
            services={soinsVisage}
          />

          <ServiceSection
            id="epilations"
            title="Épilations Visage"
            description="Une épilation précise et douce pour un visage parfaitement net. Nos techniques respectent la sensibilité de votre peau."
            services={epilationsVisage}
          />

          <ServiceSection
            id="epilations-corps"
            title="Épilations Corps"
            description="Des épilations professionnelles pour une peau douce et lisse. Forfaits avantageux disponibles."
            services={epilationsCorps}
          />
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-secondary p-12 rounded-lg">
          <h2 className="font-serif text-3xl font-light mb-4">
            Des Questions sur nos Prestations ?
          </h2>
          <p className="text-muted-foreground mb-6">
            Notre équipe se tient à votre disposition pour vous conseiller
          </p>
          <a
            href="/contact"
            className="inline-block bg-foreground text-background px-8 py-3 rounded-md hover:bg-foreground/90 transition-colors font-light"
          >
            Nous Contacter
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;
