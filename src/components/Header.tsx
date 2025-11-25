import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/a-propos", label: "À Propos" },
    { to: "/prestations", label: "Prestations" },
    { to: "/galerie", label: "Galerie" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-light tracking-wider">
                SIGNATŪR
              </span>
              <span className="font-serif text-s font-light tracking-[0.3em] text-muted-foreground -mt-1">
                ESTHELYS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              //   <Link
              //     key={link.to}
              //     to={link.to}
              //     className={`font-light text-sm tracking-wide transition-colors hover:text-primary ${
              //       isActive(link.to)
              //         ? "text-foreground border-b-2 border-primary pb-1"
              //         : "text-muted-foreground"
              //     }`}
              //   >
              //     {link.label}
              //   </Link>
              //             <Link
              //   key={link.to}
              //   to={link.to}
              //   className={`
              //     relative font-light text-sm tracking-wide transition-colors
              //     ${isActive(link.to) ? "text-foreground" : "text-muted-foreground"}
              //     group
              //   `}
              // >
              //   {link.label}
              //   <span
              //     className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"
              //   ></span>
              // </Link>

              <Link
                key={link.to}
                to={link.to}
                className={`
    relative font-light text-sm tracking-wide transition-colors duration-300
    ${isActive(link.to) ? "text-foreground" : "text-muted-foreground"}
    group
  `}
              >
                {link.label}

                {/* Underline */}
                <span
                  className={`
      absolute left-0 -bottom-0.5 h-[2px] bg-primary transition-all duration-300
      ${isActive(link.to) ? "w-full" : "w-0 group-hover:w-full"}
    `}
                />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-light text-base tracking-wide transition-colors hover:text-primary px-4 py-2 ${
                    isActive(link.to)
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
