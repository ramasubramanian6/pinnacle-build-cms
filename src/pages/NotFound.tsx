import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center bg-background">
        <div className="text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-8xl md:text-9xl font-bold text-accent mb-4">
              404
            </h1>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="gold" size="lg">
                  <Home size={16} className="mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                <ArrowLeft size={16} className="mr-2" />
                Go Back
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
