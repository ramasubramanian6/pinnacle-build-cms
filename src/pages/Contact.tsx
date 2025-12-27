import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { ScrollReveal, StaggerReveal } from "@/components/premium/ScrollReveal";
import { GlassmorphismCard, GradientBorderCard } from "@/components/premium/GlassmorphismCard";
import { GradientText } from "@/components/premium/AnimatedText";
import { AnimatedInput, AnimatedTextarea } from "@/components/premium/AnimatedInput";
import { RippleButton } from "@/components/premium/MagneticButton";
import { contactInfo, mapEmbedUrl } from "@/data/contact";
import { siteConfig } from "@/data/site";
import { useSubmitContact } from "@/hooks/useContact";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone is required").max(20, "Phone must be less than 20 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submitContact = useSubmitContact();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    await submitContact.mutateAsync({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      subject: formData.subject || undefined,
      message: formData.message,
    });
    
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const whatsappMessage = encodeURIComponent("Hello! I'm interested in learning more about BRIXXSPACE construction services.");

  return (
    <>
      <Helmet>
        <title>Contact Us | BRIXXSPACE - Get Free Consultation in Tirunelveli</title>
        <meta 
          name="description" 
          content="Contact BRIXXSPACE for your next construction project in Tirunelveli. Get a free consultation and quote. Call us at +91 98765 43210 or visit our office." 
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal>
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                Contact Us
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <GradientText>Get in</GradientText> Touch
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Ready to start your project? Contact us today for a free consultation 
                and let's bring your vision to life.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-6">
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info) => (
                <GlassmorphismCard key={info.title} hover className="p-6 text-center">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    {info.title}
                  </h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-muted-foreground text-sm">
                      {detail}
                    </p>
                  ))}
                </GlassmorphismCard>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <ScrollReveal direction="left">
                <GradientBorderCard className="p-8">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <AnimatedInput
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                      />
                      <AnimatedInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <AnimatedInput
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                      />
                      <AnimatedInput
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        error={errors.subject}
                      />
                    </div>
                    <AnimatedTextarea
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                    />
                    <div className="flex gap-4">
                      <RippleButton
                        onClick={() => {}}
                        className="bg-accent text-primary-foreground px-8 py-3 rounded-lg font-semibold disabled:opacity-50"
                      >
                        {submitContact.isPending ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Message
                            <Send size={16} className="ml-2 inline" />
                          </>
                        )}
                      </RippleButton>
                      <a
                        href={`https://wa.me/${siteConfig.whatsapp}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button type="button" variant="outline" size="lg">
                          <MessageCircle size={16} className="mr-2" />
                          WhatsApp
                        </Button>
                      </a>
                    </div>
                  </form>
                </GradientBorderCard>
              </ScrollReveal>

              {/* Map */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="h-full min-h-[500px] rounded-2xl overflow-hidden border border-border">
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "500px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="BRIXXSPACE Location - Tirunelveli"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
