import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Instagram, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would send to a backend
    toast({
      title: "Message envoyé !",
      description: "Nous vous recontacterons très bientôt.",
    });

    // Reset form
    setFormData({ name: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl font-light mb-6">
            Contactez-nous
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Une question ? Un rendez-vous ? N'hésitez pas à nous contacter. 
            Nous serons ravis de vous accompagner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-3xl font-light">
                Envoyez-nous un Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-light mb-2">
                    Nom *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-light mb-2">
                    Téléphone *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Votre numéro de téléphone"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-light mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Votre message"
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-foreground hover:bg-foreground/90 text-background font-light">
                  Envoyer le Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-3xl font-light">
                  Informations de Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-light mb-1">Téléphone</h3>
                    <p className="text-muted-foreground">À renseigner</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Instagram className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-light mb-1">Instagram</h3>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      @institut_signatur
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageCircle className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-light mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Contactez-nous sur WhatsApp
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary">
              <CardContent className="pt-6">
                <h3 className="font-serif text-2xl font-light mb-4">
                  Horaires d'Ouverture
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Les horaires seront communiqués prochainement.
                </p>
                {/* <p className="text-sm text-muted-foreground"> */}
                  {/* * Prise de rendez-vous en ligne bientôt disponible via Planity */}
                {/* </p> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
