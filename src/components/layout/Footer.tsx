import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowUpRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", path: "/about" },
    { name: "Our Projects", path: "/projects" },
    { name: "Properties", path: "/properties" },
    { name: "Blog", path: "/blog" },
    { name: "Careers", path: "/careers" },
  ],
  services: [
    { name: "Residential Construction", path: "/projects?category=residential" },
    { name: "Commercial Projects", path: "/projects?category=commercial" },
    { name: "Infrastructure", path: "/projects?category=infrastructure" },
    { name: "Renovation", path: "/projects?category=renovation" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export const Footer = () => {
  return (
    <footer className="bg-slate-dark text-cream">
      {/* CTA Section */}
      <div className="border-b border-cream/10">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
                Ready to Build Your Vision?
              </h2>
              <p className="text-cream/60">
                Let's discuss your next project and bring your ideas to life.
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
                className="group inline-flex items-center gap-3 bg-accent text-primary px-8 py-4 rounded font-semibold uppercase tracking-wider hover:bg-gold-dark transition-all duration-300 shadow-gold"
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
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent rounded-sm flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-primary">A</span>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-wide">
                    APEX
                  </h2>
                  <p className="text-xs uppercase tracking-[0.3em] text-cream/60">
                    Construction
                  </p>
                </div>
              </div>
            </Link>
            <p className="text-cream/60 mb-6 leading-relaxed">
              Building excellence since 1985. We transform visions into 
              architectural masterpieces that stand the test of time.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-primary transition-all duration-300"
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
                    className="text-cream/60 hover:text-accent transition-colors duration-300"
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
                    className="text-cream/60 hover:text-accent transition-colors duration-300"
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
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-cream/60 hover:text-accent transition-colors duration-300"
                >
                  <MapPin size={20} className="mt-0.5 shrink-0" />
                  <span>123 Construction Ave,<br />New York, NY 10001</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+12345678900"
                  className="flex items-center gap-3 text-cream/60 hover:text-accent transition-colors duration-300"
                >
                  <Phone size={20} className="shrink-0" />
                  <span>+1 (234) 567-8900</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@apexconstruction.com"
                  className="flex items-center gap-3 text-cream/60 hover:text-accent transition-colors duration-300"
                >
                  <Mail size={20} className="shrink-0" />
                  <span>info@apexconstruction.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream/40">
            <p>© 2024 Apex Construction. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-cream transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-cream transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
