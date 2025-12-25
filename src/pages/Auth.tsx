import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { GlassmorphismCard } from "@/components/premium/GlassmorphismCard";
import { GradientText } from "@/components/premium/AnimatedText";
import { RippleButton } from "@/components/premium/MagneticButton";
import brixxspaceLogo from "@/assets/brixxspace-logo.png";
import heroImage from "@/assets/hero-construction.jpg";

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { user, loading, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      if (isLogin) {
        const result = loginSchema.safeParse(formData);
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach((err) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setIsLoading(false);
          return;
        }

        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Invalid email or password");
          } else {
            toast.error(error.message);
          }
          setIsLoading(false);
          return;
        }

        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        const result = signupSchema.safeParse(formData);
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach((err) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("This email is already registered. Please sign in.");
          } else {
            toast.error(error.message);
          }
          setIsLoading(false);
          return;
        }

        toast.success("Account created successfully! Welcome to BRIXXSPACE.");
        navigate("/dashboard");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isLogin ? "Login" : "Sign Up"} | BRIXXSPACE Client Portal</title>
        <meta name="description" content="Access your exclusive BRIXXSPACE client portal. Track your projects, view updates, and manage your construction journey." />
      </Helmet>

      <div className="min-h-screen bg-background flex relative overflow-hidden">
        {/* Background Image - Left Side */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img 
            src={heroImage} 
            alt="Construction" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          <div className="absolute inset-0 flex flex-col justify-center p-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img src={brixxspaceLogo} alt="BRIXXSPACE" className="h-16 w-auto mb-8" />
              <h1 className="font-display text-4xl xl:text-5xl font-bold text-cream mb-6">
                Exclusive Client Portal
              </h1>
              <p className="text-cream/70 text-lg max-w-md">
                Track your projects in real-time, access documents, and stay connected 
                with your construction team. Your premium experience starts here.
              </p>
              <div className="mt-12 space-y-4">
                {[
                  "Real-time project tracking",
                  "Direct communication with your team",
                  "Access documents & blueprints",
                  "View progress photos & updates",
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 text-cream/80"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md relative z-10"
          >
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <img src={brixxspaceLogo} alt="BRIXXSPACE" className="h-12 w-auto mx-auto mb-4" />
            </div>

            <GlassmorphismCard variant="strong" glow className="p-8">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  {isLogin ? (
                    <>Welcome <GradientText>Back</GradientText></>
                  ) : (
                    <>Create <GradientText>Account</GradientText></>
                  )}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {isLogin 
                    ? "Sign in to access your client portal" 
                    : "Join the exclusive BRIXXSPACE community"
                  }
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Full Name"
                          className={`w-full pl-12 pr-4 py-3 bg-background/50 border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all ${
                            errors.fullName ? "border-destructive" : "border-border"
                          }`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-destructive text-xs mt-1">{errors.fullName}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className={`w-full pl-12 pr-4 py-3 bg-background/50 border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all ${
                        errors.email ? "border-destructive" : "border-border"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className={`w-full pl-12 pr-12 py-3 bg-background/50 border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all ${
                        errors.password ? "border-destructive" : "border-border"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-destructive text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm Password"
                          className={`w-full pl-12 pr-4 py-3 bg-background/50 border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all ${
                            errors.confirmPassword ? "border-destructive" : "border-border"
                          }`}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-destructive text-xs mt-1">{errors.confirmPassword}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <RippleButton
                  onClick={() => {}}
                  className="w-full bg-accent text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {isLogin ? "Sign In" : "Create Account"}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </RippleButton>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-accent font-medium hover:underline"
                  >
                    {isLogin ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </div>
            </GlassmorphismCard>

            <p className="text-center text-muted-foreground text-xs mt-6">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Auth;
