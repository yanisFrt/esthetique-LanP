import { Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            {/* <h3 className="font-serif text-2xl font-light tracking-wider mb-4">
              SIGNATŪR
            </h3> */}
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-light tracking-wider">
                SIGNATŪR
              </span>
              <span className="font-serif text-s font-light tracking-[0.3em] text-muted-foreground -mt-1">
                ESTHELYS
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-6">
              Révéler votre beauté naturelle avec précision et douceur.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-light mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/a-propos"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  À propos de nous
                </a>
              </li>
              <li>
                <a
                  href="/prestations"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Prestations
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="font-serif text-lg font-light mb-4">Suivez-nous</h4>
            <div className="flex gap-4 mb-4">
              <a
                href="https://www.instagram.com/signatur_esthelys?igsh=MWJxNngwYmFkMmk3ZA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-full hover:bg-primary hover:border-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              {/* <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-full hover:bg-primary hover:border-primary transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a> */}

              <a
                href="https://www.tiktok.com/@browluxstudio1?_r=1&_t=ZN-928ClBdznYk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-full hover:bg-primary hover:border-primary transition-colors"
                aria-label="TikTok"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Institut SIGNATŪR. Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
