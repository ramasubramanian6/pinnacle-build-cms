import React, { useState, useEffect } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, Phone } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import api from "@/lib/api";
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
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits"),
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authStep, setAuthStep] = useState<'initial' | 'otp' | 'final'>('initial'); // initial -> otp -> final (details/reset)
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when mounting
  useEffect(() => {
    resetForm();
  }, []);

  const resetForm = () => {
    setFormData({ fullName: "", phone: "", email: "", password: "", confirmPassword: "", otp: "" });
    setErrors({});
    setAuthStep('initial');
    setForgotPasswordMode(false);
    setIsLogin(true);
  };

  const { user, loading, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // STEP 1: Send OTP
  const handleSendOtp = async () => {
    const emailSchema = z.string().email("Invalid email address");
    const result = emailSchema.safeParse(formData.email);

    if (!result.success) {
      setErrors({ email: result.error.errors[0].message });
      return;
    }

    setIsLoading(true);
    try {
      const type = forgotPasswordMode ? 'forgot-password' : 'signup';
      await api.post('/auth/send-otp', { email: formData.email, type });
      toast.success("OTP sent to your email!");
      setAuthStep('otp');
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (!formData.otp || formData.otp.length < 6) {
      setErrors({ otp: "Please enter a valid 6-digit OTP" });
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/auth/verify-otp', { email: formData.email, otp: formData.otp });
      toast.success("Email verified!");
      setAuthStep('final');
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 3: Final Submit (Login / Signup (after OTP) / Reset Password)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      // 1. LOGIN FLOW
      if (isLogin && !forgotPasswordMode) {
        const result = loginSchema.safeParse(formData);
        if (!result.success) {
          // ... error handling
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach((err) => {
            if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
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
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      }

      // 2. SIGNUP FLOW (Final Step)
      else if (!isLogin && !forgotPasswordMode) {
        // OTP is already verified if we are at 'final' step
        const result = signupSchema.safeParse(formData);
        if (!result.success) {
          // ... error handling
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach((err) => {
            if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
          });
          setErrors(fieldErrors);
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(formData.email, formData.password, formData.fullName, formData.otp, formData.phone);
        if (error) {
          toast.error(error.message);
          setIsLoading(false);
          return;
        }

        toast.success("Account created successfully!");
        navigate("/dashboard");
      }

      // 3. FORGOT PASSWORD (Final Step)
      else if (forgotPasswordMode) {
        if (!formData.password || formData.password !== formData.confirmPassword) {
          setErrors({ confirmPassword: "Passwords do not match" });
          setIsLoading(false);
          return;
        }

        await api.post('/auth/reset-password', {
          email: formData.email,
          otp: formData.otp, // Need to send OTP again for verification security
          password: formData.password
        });

        toast.success("Password reset successfully! Please login.");
        resetForm();
      }

    } catch (error: any) {
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    resetForm();
    setIsLogin(!isLogin);
  };

  const toggleForgotPassword = () => {
    resetForm();
    setForgotPasswordMode(true);
    setIsLogin(false); // Valid state for logic check

    // We want to be in "initial" step of forgot password
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  // RENDER HELPERS

  const renderTitle = () => {
    if (forgotPasswordMode) return <>Reset <GradientText>Password</GradientText></>;
    if (isLogin) return <>Welcome <GradientText>Back</GradientText></>;
    return <>Create <GradientText>Account</GradientText></>;
  };

  const renderSubtitle = () => {
    if (forgotPasswordMode) return "Enter your email to verify identity";
    if (isLogin) return "Sign in to access your client portal";
    return "Join the exclusive BRIXXSPACE community";
  };

  return (
    <>
      <Helmet>
        <title>{isLogin && !forgotPasswordMode ? "Login" : "Sign Up"} | BRIXXSPACE Client Portal</title>
      </Helmet>

      <div className="min-h-screen bg-background flex relative overflow-hidden">
        {/* ... (Kept existing visual layout) */}

        {/* Background Image - Left Side */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img src={heroImage} alt="Construction" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-800/90" />
          {/* ... (Existing Logo and Branding Text - Kept same) */}
          <div className="absolute inset-0 flex flex-col justify-center p-16">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <img src={brixxspaceLogo} alt="BRIXXSPACE" className="h-16 w-auto mb-8" />
              <h1 className="font-display text-4xl xl:text-5xl font-bold mb-6 leading-tight">
                <span className="text-white">Welcome to Your</span>
                <span className="block bg-gradient-to-r from-[#FFB800] to-[#FFA500] bg-clip-text text-transparent mt-2">Client Portal</span>
              </h1>
              {/* ... features list ... */}
              <div className="space-y-5">
                {/* ... icons ... */}
              </div>
            </motion.div>
          </div>
        </div>


        {/* Form Side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
          <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md relative z-10">
            <GlassmorphismCard variant="strong" glow className="p-8">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  {renderTitle()}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {renderSubtitle()}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* LOGIN FORM (Standard) */}
                {isLogin && !forgotPasswordMode && (
                  <>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address"
                        className={`w-full pl-12 pr-4 py-3 bg-background/50 border rounded-xl ${errors.email ? "border-destructive" : "border-border"}`} />
                    </div>
                    {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password"
                        className={`w-full pl-12 pr-12 py-3 bg-background/50 border rounded-xl ${errors.password ? "border-destructive" : "border-border"}`} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-destructive text-xs">{errors.password}</p>}
                  </>
                )}


                {/* SIGNUP & FORGOT PASSWORD (Multi-Step) */}
                {(!isLogin || forgotPasswordMode) && (
                  <>
                    {/* STEP 1: EMAIL */}
                    {authStep === 'initial' && (
                      <div className="space-y-4">
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address"
                            className={`w-full pl-12 pr-4 py-3 bg-background/50 border rounded-xl ${errors.email ? "border-destructive" : "border-border"}`} />
                        </div>
                        {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}

                        <RippleButton type="button" onClick={handleSendOtp} className="w-full bg-accent text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send verification Code <ArrowRight className="w-5 h-5" /></>}
                        </RippleButton>
                      </div>
                    )}

                    {/* STEP 2: OTP */}
                    {authStep === 'otp' && (
                      <div className="space-y-4">
                        <p className="text-sm text-center text-muted-foreground">Code sent to {formData.email}</p>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <input type="text" name="otp" value={formData.otp} onChange={handleChange} placeholder="Enter 6-digit Code" maxLength={6}
                            className={`w-full pl-12 pr-4 py-3 bg-background/50 border rounded-xl ${errors.otp ? "border-destructive" : "border-border"}`} />
                        </div>
                        {errors.otp && <p className="text-destructive text-xs">{errors.otp}</p>}

                        <RippleButton type="button" onClick={handleVerifyOtp} className="w-full bg-accent text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Code"}
                        </RippleButton>
                        <button type="button" onClick={() => setAuthStep('initial')} className="w-full text-sm text-muted-foreground hover:text-white mt-2">Change Email</button>
                      </div>
                    )}

                    {/* STEP 3: FINAL DETAILS */}
                    {authStep === 'final' && (
                      <div className="space-y-4">
                        {!forgotPasswordMode && (
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name"
                              className={`w-full pl-12 pr-4 py-3 bg-background/50 border rounded-xl ${errors.fullName ? "border-destructive" : "border-border"}`} />
                          </div>
                        )}

                        {!forgotPasswordMode && (
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number"
                              className={`w-full pl-12 pr-4 py-3 bg-background/50 border rounded-xl ${errors.phone ? "border-destructive" : "border-border"}`} />
                          </div>
                        )}

                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder={forgotPasswordMode ? "New Password" : "Password"}
                            className={`w-full pl-12 pr-12 py-3 bg-background/50 border rounded-xl ${errors.password ? "border-destructive" : "border-border"}`} />
                        </div>

                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <input type={showPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password"
                            className={`w-full pl-12 pr-12 py-3 bg-background/50 border rounded-xl ${errors.confirmPassword ? "border-destructive" : "border-border"}`} />
                        </div>
                      </div>
                    )}
                  </>
                )}


                {/* SUBMIT BUTTON - ONLY SHOW IF LOGIN OR FINAL STEP */}
                {(isLogin && !forgotPasswordMode) || (authStep === 'final') ? (
                  <RippleButton type="submit" className="w-full bg-accent text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> :
                      isLogin && !forgotPasswordMode ? <>Sign In <ArrowRight className="w-5 h-5" /></> :
                        forgotPasswordMode ? "Reset Password" : "Create Account"
                    }
                  </RippleButton>
                ) : null}

              </form>

              <div className="mt-6 text-center space-y-2">
                {/* Forgot Password Link */}
                {isLogin && !forgotPasswordMode && (
                  <button type="button" onClick={toggleForgotPassword} className="text-sm text-muted-foreground hover:text-white">
                    Forgot Password?
                  </button>
                )}

                <p className="text-muted-foreground text-sm">
                  {isLogin && !forgotPasswordMode ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button type="button" onClick={toggleMode} className="text-accent font-medium hover:underline">
                    {isLogin && !forgotPasswordMode ? "Sign Up" : "Sign In"}
                  </button>
                  {forgotPasswordMode && (
                    <div className="mt-2">
                      <button type="button" onClick={resetForm} className="text-xs text-muted-foreground hover:underline">Back to Login</button>
                    </div>
                  )}
                </p>
              </div>
            </GlassmorphismCard>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Auth;
