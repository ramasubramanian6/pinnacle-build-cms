import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowUpRight, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import brixxspaceLogo from "@/assets/brixxspace-logo.png";

const footerLinks = {
  company: [
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ],
  services: [
    { name: "Residential Development", path: "/services" },
    { name: "Commercial Spaces", path: "/services" },
    { name: "Investment & Consulting", path: "/services" },
    { name: "Project Management", path: "/services" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/brixxspace", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/brixxspace", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/brixxspace", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@brixxspace", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer className="bg-card text-foreground">
      {/* CTA Section */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
                Ready to Build Your Dreams?
              </h2>
              <p className="text-muted-foreground">
                Let's discuss your next project and transform your vision into reality.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 rounded font-semibold hover:bg-gold-dark transition-all duration-300 shadow-gold"
              >
                Start a Project
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img 
                src={brixxspaceLogo} 
                alt="BRIXXSPACE" 
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Building Dreams Into Reality. Premium real estate development 
              and infrastructure solutions you can trust.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com/?q=Tirunelveli,Tamil+Nadu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-muted-foreground hover:text-accent transition-colors duration-300"
                >
                  <MapPin size={20} className="mt-0.5 shrink-0" />
                  <span>No. 45, VOC Road,<br />Tirunelveli, Tamil Nadu 627001</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors duration-300"
                >
                  <Phone size={20} className="shrink-0" />
                  <span>+91 98765 43210</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@brixxspace.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors duration-300"
                >
                  <Mail size={20} className="shrink-0" />
                  <span>info@brixxspace.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 BRIXXSPACE. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
