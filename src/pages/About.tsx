import aboutHero from "@/assets/about-hero.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${aboutHero})`,
            filter: "brightness(0.6)",
          }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-6xl font-light mb-4 tracking-wide">
            À Propos de SIGNATŪR
          </h1>
          <p className="text-xl font-light">
            Plus de 30 ans de passion et d'expertise
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Histoire */}
          <div className="mb-16">
            <h2 className="font-serif text-4xl font-light mb-6">
              Notre Histoire
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Avec plus de trois décennies d'expérience dans le domaine de
                l'esthétique, l'institut SIGNATŪR est né d'une passion profonde
                pour la beauté naturelle et l'authenticité féminine.
              </p>
              <p>
                Fondé sur les principes de précision, de douceur et de
                bien-être, notre institut s'est construit une réputation
                d'excellence dans l'art de sublimer la beauté naturelle de
                chaque femme, sans jamais chercher à la transformer.
              </p>
            </div>
          </div>

          {/* Valeurs */}
          <div className="mb-16 bg-secondary p-8 md:p-12 rounded-lg">
            <h2 className="font-serif text-4xl font-light mb-8">Nos Valeurs</h2>
            <div className="grid gap-8">
              <div>
                <h3 className="font-serif text-2xl font-light mb-3">
                  Naturel & Authenticité
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nous croyons fermement qu'une femme brille toujours par son
                  naturel et son authenticité. Notre rôle est de révéler cette
                  beauté qui vous est propre, jamais de la masquer ou de la
                  transformer.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-light mb-3">
                  Précision & Expertise
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Chaque geste est exécuté avec douceur, bien-être et hygiène,
                  fruit de plus de 30 années d'expérience et de perfectionnement
                  continu de nos techniques.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-light mb-3">
                  Douceur & Bien-être
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Le confort et la sécurité sont au cœur de chaque prestation.
                  Nous créons une expérience apaisante où chaque cliente peut se
                  détendre en toute confiance.
                </p>
              </div>
            </div>
          </div>

          {/* Engagement */}
          <div className="mb-16">
            <h2 className="font-serif text-4xl font-light mb-6">
              Notre Engagement
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Chez SIGNATŪR, nous n'utilisons que des produits professionnels
                haut de gamme, soigneusement sélectionnés pour leur qualité et
                leur respect de la peau et de l'environnement.
              </p>
              <p>
                Chaque soin que nous proposons vise à sublimer votre beauté
                naturelle tout en garantissant confort, sécurité et résultats
                visibles. Nous nous engageons à maintenir les plus hauts
                standards d'hygiène et de professionnalisme.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="text-center bg-primary/10 p-8 md:p-12 rounded-lg">
            <h2 className="font-serif text-4xl font-light mb-6">
              Notre Vision
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl mx-auto">
              SIGNATŪR aspire à devenir la référence de l'esthétique naturelle
              et authentique, un lieu où chaque femme peut révéler sa beauté
              unique dans le respect de son identité et de sa singularité.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
