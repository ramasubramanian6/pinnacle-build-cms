import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceCategoryDetail from "./pages/ServiceCategoryDetail";
import ServiceSubcategoryDetail from "./pages/ServiceSubcategoryDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import PackageDetail from "./pages/PackageDetail";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Interests from "./pages/Interests";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminWorkers from "./pages/admin/AdminWorkers";
import AdminPackages from "./pages/admin/AdminPackages";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminServices from "./pages/admin/AdminServices";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminSliderImages from "./pages/admin/AdminSliderImages";
import AdminPromotions from "./pages/admin/AdminPromotions";
import AdminProjectInterests from "./pages/admin/AdminProjectInterests";
import AdminServiceCategories from "./pages/admin/AdminServiceCategories";
import AdminServiceSubcategories from "./pages/admin/AdminServiceSubcategories";
import NotFound from "./pages/NotFound";

import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:categorySlug" element={<ServiceCategoryDetail />} />
              <Route path="/services/:categorySlug/:subcategorySlug" element={<ServiceSubcategoryDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/packages/:id" element={<PackageDetail />} />
              <Route path="/packages/:id" element={<PackageDetail />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/interests" element={<Interests />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/properties" element={<AdminProperties />} />
              <Route path="/admin/contacts" element={<AdminContacts />} />
              <Route path="/admin/workers" element={<AdminWorkers />} />
              <Route path="/admin/packages" element={<AdminPackages />} />
              <Route path="/admin/testimonials" element={<AdminTestimonials />} />
              <Route path="/admin/services" element={<AdminServices />} />
              <Route path="/admin/blogs" element={<AdminBlogs />} />
              <Route path="/admin/slider-images" element={<AdminSliderImages />} />
              <Route path="/admin/promotions" element={<AdminPromotions />} />
              <Route path="/admin/project-interests" element={<AdminProjectInterests />} />
              <Route path="/admin/service-categories" element={<AdminServiceCategories />} />
              <Route path="/admin/service-subcategories" element={<AdminServiceSubcategories />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
