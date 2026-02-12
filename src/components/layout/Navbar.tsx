import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User, LayoutDashboard, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import brixxspaceLogo from "@/assets/brixxspace-logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled && !isMobileMenuOpen
          ? "bg-[#080808]/90 backdrop-blur-md py-4"
          : "bg-gradient-to-b from-black/60 to-transparent py-6"
          }`}
      >
        <div className="container mx-auto px-6 relative flex items-center justify-between h-16">

          {/* Left Side (Empty for balance or could put Socials) */}
          <div className="hidden lg:block w-1/3"></div>

          {/* Center Logo - Hide when desktop menu is open to match clean look, or keep? 
              Image shows "AR HOMES" logo at top center even when menu is open.
          */}
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-100'}`}>
            <Link to="/">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
                <img src={brixxspaceLogo} alt="Brixx Space" className="h-10 md:h-12 w-auto" />
              </motion.div>
            </Link>
          </div>

          {/* Right Side - Contact & Menu */}
          <div className="w-full lg:w-1/3 flex items-center justify-end gap-6 md:gap-8 z-50">
            {/* CONTACT Text Link (Desktop) - Disabled for now */}
            {!isMobileMenuOpen && (
              <Link
                to="/contact"
                className="hidden lg:block font-body text-sm tracking-widest font-bold text-white hover:text-accent uppercase transition-colors"
                aria-label="Contact Us"
              >
                Contact
              </Link>
            )}

            {/* Hamburger Menu Trigger - Swaps to Close button inside overlay for desktop, but here for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 text-white hover:text-accent transition-colors focus:outline-none ${isMobileMenuOpen ? 'hidden lg:hidden' : 'block'}`}
              aria-label="Open menu"
            >
              <Menu className="w-8 h-8 md:w-10 md:h-10 stroke-[1.5]" />
            </button>

            {/* Close Button for Mobile (when open) */}
            {isMobileMenuOpen && (
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden p-2 text-white hover:text-accent transition-colors focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-8 h-8 md:w-10 md:h-10 stroke-[1.5]" />
              </button>
            )}


            {/* Desktop Close Button (White Square) - Only visible when menu open on Desktop */}
            {isMobileMenuOpen && (
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="hidden lg:flex h-14 w-14 bg-white items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-8 h-8 text-black stroke-[1.5]" />
              </button>
            )}
          </div>

        </div>
      </motion.header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center
                ${/* Mobile Styles */ ""}
                lg:bg-[#002833] bg-[#080808] 
            `}
            style={{ top: 0 }}
          >

            {/* ================= MOBILE LAYOUT (Vertical Stack) ================= */}
            <div className="flex lg:hidden flex-col items-center gap-8 mt-20">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-display text-4xl transition-colors duration-300 ${location.pathname === link.path ? "text-accent" : "text-white/80 hover:text-white"
                      }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-8 flex gap-4">
                {user ? (
                  <Button onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }} variant="outline" className="text-white border-white/20 hover:bg-white/10">Sign Out</Button>
                ) : (
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}><Button variant="outline" className="text-white border-white/20 hover:bg-white/10">Login</Button></Link>
                )}
              </div>
            </div>


            {/* ================= DESKTOP LAYOUT (Serif Grid with Pipes) ================= */}
            <div className="hidden lg:flex w-full max-w-6xl flex-col items-center justify-center gap-12 pt-20 relative">
              {/* Background Pattern Overlay (Subtle Global) */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

              {/* Right Side Pattern - Professional Line/Architectural Style */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 text-white/5 pointer-events-none z-0 overflow-hidden">
                <svg className="absolute right-0 top-1/2 -translate-y-1/2 h-[150%] w-auto translate-x-1/3" viewBox="0 0 500 500" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="250" cy="250" r="100" className="opacity-20" />
                  <circle cx="250" cy="250" r="150" className="opacity-10" />
                  <circle cx="250" cy="250" r="200" className="opacity-20" />
                  <circle cx="250" cy="250" r="250" className="opacity-10" />
                  <circle cx="250" cy="250" r="300" className="opacity-20" />
                  <circle cx="250" cy="250" r="350" className="opacity-10" />
                  <circle cx="250" cy="250" r="400" className="opacity-30" />

                  {/* Architectural / Blueprint accents */}
                  <path d="M250 50 L250 450" className="opacity-10" />
                  <path d="M50 250 L450 250" className="opacity-10" />
                </svg>
                <div
                  className="absolute inset-0 bg-gradient-to-l from-[#002833] via-transparent to-transparent"
                ></div>
              </div>

              {/* Primary Navigation Row */}
              <div className="relative z-50 pointer-events-auto flex flex-wrap justify-center items-center gap-x-8 gap-y-6 px-12">
                {/* Standard Links: Home, About, Services, Projects, Properties, Blog, Contact */}
                {navLinks.filter(l => l.name !== 'Home').map((link, index, array) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="flex items-center gap-8"
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`font-serif text-5xl tracking-tight transition-colors duration-300 ${location.pathname === link.path ? "text-accent" : "text-white/70 hover:text-white"
                        }`}
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      {link.name}
                    </Link>

                    {index < array.length - 1 && (
                      <span className="text-white/30 text-5xl font-light">|</span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Secondary/Account Navigation Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative z-50 pointer-events-auto flex flex-wrap justify-center items-center gap-x-8 mt-4"
              >
                {user ? (
                  <>
                    {/* Admin Links */}
                    {user.role === 'admin' && (
                      <>
                        <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-4xl text-accent hover:text-white transition-colors" style={{ fontFamily: '"Playfair Display", serif' }}>
                          Dashboard
                        </Link>
                        <span className="text-white/30 text-4xl font-light">|</span>
                      </>
                    )}

                    {/* Profile (Common) */}
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-4xl text-white/70 hover:text-white transition-colors" style={{ fontFamily: '"Playfair Display", serif' }}>
                      Profile
                    </Link>

                    {/* User Specific: Interests */}
                    {user.role !== 'admin' && (
                      <>
                        <span className="text-white/30 text-4xl font-light">|</span>
                        <Link to="/interests" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-4xl text-white/70 hover:text-white transition-colors" style={{ fontFamily: '"Playfair Display", serif' }}>
                          Interests
                        </Link>
                      </>
                    )}

                    <span className="text-white/30 text-4xl font-light">|</span>

                    {/* Sign Out */}
                    <button onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }} className="font-serif text-4xl text-white/70 hover:text-red-400 transition-colors" style={{ fontFamily: '"Playfair Display", serif' }}>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-4xl text-white/50 hover:text-white transition-colors" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Client Login
                  </Link>
                )}
              </motion.div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Text for Desktop Menu (Top Right) - Replaces the normal Contact link when menu is open
          Wait, the design has "CONTACT" next to the X button inside the dark header?
          The image shows "CONTACT [X]" at the top right.
       */}
      {isMobileMenuOpen && (
        <div className="hidden lg:block fixed top-6 right-24 z-50">
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-body text-sm tracking-widest font-bold text-white hover:text-accent uppercase transition-colors"
          >
            Contact
          </Link>
        </div>
      )}

    </>
  );
};
