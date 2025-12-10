import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import OptimizedImage from "@/components/OptimizedImage";
import beauteRegardImg from "@/assets/beaute-du-regard.png";
import soinsVisageImg from "@/assets/soin-visage.png";
import epilationVisageImg from "@/assets/epilation-visage.png";
import epilationCorpsImg from "@/assets/epilation-corps.png";

const Services = () => {
  const beauteRegard = [
    {
      service: "Microblading — SIGNATŪR Brow",
      price: "150 €",
      duration: "2h",
      description: "Technique de maquillage semi-permanent poil à poil, ultra réaliste, permettant de restructurer et densifier la ligne naturelle des sourcils."
    },
    {
      service: "Shading — Poudré Brow",
      price: "180 €",
      duration: "2h",
      description: "Effet poudré élégant et uniforme offrant un résultat défini et sophistiqué, idéal pour un rendu maquillé naturel."
    },
    {
      service: "Combo Microblading + Shading — Brow Fusion",
      price: "199 €",
      duration: "2h",
      description: "Association du poil à poil et de l'effet poudré pour un résultat complet : structure réaliste + intensité optimale, parfaitement équilibré."
    },
    {
      service: "Retouche Microblading / Shading / Combo",
      price: "80 €",
      duration: "1h",
      description: "Retouche à réaliser entre 4 et 6 semaines après la prestation initiale pour fixer la couleur et parfaire le résultat."
    },
    {
      service: "Brow Sculpt — Restructuration + Mapping + Épilation",
      price: "25 €",
      duration: "30 min",
      description: "Reconstruction précise de la forme : mapping professionnel pour symétrie parfaite + épilation à la cire ou à la pince."
    },
    {
      service: "Option Coloration",
      price: "+10 €",
      description: "Sublime et intensifie la ligne pour un fini net et harmonieux."
    },
    {
      service: "Brow Lift + Coloration",
      price: "45 €",
      duration: "30 min",
      description: "Technique qui redresse, discipline et fixe les sourcils pour un effet lift naturel. La coloration renforce la structure pour un regard plus ouvert, soigné et éclatant, avec une tenue longue durée."
    },
  ];

  const soinsVisage = [
    {
      service: "Microneedling Contour des Yeux — Eye Glow",
      price: "40 €",
      duration: "30 min",
      description: "Soin ciblé du contour des yeux pour lisser les ridules, estomper les cernes et réveiller l'éclat du regard. Stimule doucement le collagène pour un effet lumineux et reposé."
    },
    {
      service: "Microneedling Visage Complet — Time Glow",
      price: "70 €",
      duration: "45 min",
      description: "Améliore la texture de la peau, atténue les ridules et cicatrices, et redonne un teint lumineux grâce à la stimulation du collagène."
    },
    {
      service: "Microneedling Visage + Cou — Time Glow Plus",
      price: "100 €",
      duration: "60 min",
      description: "Soin anti-âge global qui lisse, revitalise et raffermit la peau du visage et du cou pour un rajeunissement visible et harmonieux."
    },
    {
      service: "Forfait Microneedling — 4 Séances",
      price: "350 €",
      description: "Programme complet pour optimiser les résultats de régénération cutanée et améliorer durablement la qualité de la peau."
    },
    {
      service: "Hydratation Express — Facial Flash",
      price: "39 €",
      duration: "25 min",
      description: "Soin rapide pour les peaux ternes ou déshydratées, utilisant un sérum concentré en acide hyaluronique et un masque repulpant. Résultat : peau douce, fraîche et lumineuse, parfait avant un événement ou pour un coup d'éclat immédiat."
    },
    {
      service: "ProPeel — Peeling Chimique Anti-Âge & Anti-Taches",
      price: "120 €",
      duration: "45 min",
      description: "Soin resurfaçant pour lisser les rides, atténuer les taches pigmentaires et uniformiser le teint. Résultat : peau régénérée, éclatante et rajeunie."
    },
  ];

  const epilationsVisage = [
    { service: "Sourcils", price: "15 €" },
    { service: "Lèvre Supérieure", price: "10 €" },
    { service: "Menton", price: "10 €" },
    { service: "Pattes d'Oie", price: "15 €" },
    { service: "Visage Complet", price: "35 €" },
  ];

  const epilationsCorps = [
    { service: "1/2 Jambes", price: "25 €" },
    { service: "Jambes Complètes", price: "35 €" },
    { service: "Aisselles", price: "19 €" },
    { service: "Maillot Simple", price: "11 €" },
    { service: "Maillot Échancré", price: "19 €" },
    { service: "Maillot Intégral", price: "25 €" },
    { service: "Interfessier", price: "22 €" },
    { service: "Forfait Corps Complet", price: "59 €" },
  ];

  const signaturMakeup = [
    {
      service: "SIGNATŪR Flash Look",
      price: "35 €",
      duration: "25 min",
      description: "Maquillage express pour un teint frais et un regard lumineux."
    },
    {
      service: "SIGNATŪR Day Look",
      price: "40 €",
      duration: "35 min",
      description: "Look naturel et lumineux pour la journée."
    },
    {
      service: "SIGNATŪR Evening Glow",
      price: "59 €",
      duration: "45 min",
      description: "Maquillage sophistiqué et travaillé pour soirées ou événements spéciaux."
    },
    {
      service: "SIGNATŪR Wedding Look",
      price: "110 €",
      duration: "75 min",
      description: "Maquillage premium, longue tenue et photogénique, spécialement conçu pour le jour du mariage. Regard intense, teint parfait et finition raffinée pour sublimer la mariée."
    },
  ];

  const ServiceSection = ({
    title,
    description,
    services,
    id,
    isBold,
    image,
  }: {
    title: string;
    description: string;
    services: { service: string; price: string; duration?: string; description?: string }[];
    id: string;
    isBold?: boolean;
    image?: string;
  }) => (
    <Card id={id} className="scroll-mt-24">
      <CardHeader>
        <CardTitle className={`font-serif text-3xl ${isBold ? 'font-semibold' : 'font-light'}`}>
          {title}
        </CardTitle>
        <p className="text-muted-foreground leading-relaxed pt-2">
          {description}
        </p>
      </CardHeader>
      <CardContent>
        {image ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Image côté gauche */}
            <div className="flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden">
              <OptimizedImage
                src={image}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {/* Services côté droit */}
            <div className="space-y-3">
              {services.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <span className="text-foreground">{item.service}</span>
                      {item.duration && (
                        <span className="text-muted-foreground text-sm ml-2">— {item.duration}</span>
                      )}
                      {item.description && (
                        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{item.description}</p>
                      )}
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-600 whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  {index < services.length - 1 && <Separator className="mt-3" />}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <span className="text-foreground">{item.service}</span>
                    {item.duration && (
                      <span className="text-muted-foreground text-sm ml-2">— {item.duration}</span>
                    )}
                    {item.description && (
                      <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{item.description}</p>
                    )}
                  </div>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-600 whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
                {index < services.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </div>
        )}
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
            image={beauteRegardImg}
          />

          <ServiceSection
            id="soins-visage"
            title="Soins Visage"
            description="Offrez à votre peau un éclat renouvelé avec nos soins anti-âge, hydratants et régénérants. Du microneedling aux peelings chimiques, chaque traitement est adapté à vos besoins."
            services={soinsVisage}
            image={soinsVisageImg}
          />

          <ServiceSection
            id="epilations"
            title="Épilations Visage"
            description="Une épilation précise et douce pour un visage parfaitement net. Nos techniques respectent la sensibilité de votre peau."
            services={epilationsVisage}
            image={epilationVisageImg}
          />

          <ServiceSection
            id="epilations-corps"
            title="Épilations Corps"
            description="Des épilations professionnelles pour une peau douce et lisse. Forfaits avantageux disponibles."
            services={epilationsCorps}
            image={epilationCorpsImg}
          />

          <ServiceSection
            id="signature-makeup"
            title="SIGNATŪR MAKEUP"
            description="Des prestations maquillage sur-mesure adaptées à chaque occasion. De l'éclat express au look mariage, sublimez votre beauté avec nos techniques professionnelles."
            services={signaturMakeup}
            isBold={true}
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
