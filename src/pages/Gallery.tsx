const Gallery = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl font-light mb-6">
            Galerie
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Découvrez les résultats de nos prestations. Photos avant/après à venir très prochainement.
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="bg-secondary rounded-lg p-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 border-4 border-primary rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="font-serif text-3xl font-light mb-4">
              Galerie en Construction
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Nos photos avant/après de prestations réelles seront bientôt disponibles. 
              Revenez prochainement pour découvrir les transformations naturelles réalisées 
              chez SIGNATŪR.
            </p>
          </div>
        </div>

        {/* Grid Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="aspect-square bg-muted rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
