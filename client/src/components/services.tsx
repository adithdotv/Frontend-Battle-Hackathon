import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Service } from "@shared/schema";

export function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });
  
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -180,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.68, -0.55, 0.265, 1.55],
        delay: 0.3,
      },
    },
  };

  if (isLoading) {
    return (
      <section id="services" className="py-20 services-bg theme-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="gradient-text">Features & Services</span>
            </motion.h2>
          </div>
          <div className="services-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="service-card-skeleton">
                <div className="animate-pulse bg-muted/20 rounded-2xl h-80"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 services-bg theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text">Features & Services</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Comprehensive digital solutions with cutting-edge technology
          </motion.p>
        </div>
        
        <motion.div 
          ref={containerRef}
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services?.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card group"
              variants={cardVariants}
              whileHover={{ 
                y: -12,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <div className="service-card-content">
                <motion.div 
                  className="service-icon-container"
                  variants={iconVariants}
                >
                  <div className="service-icon">
                    <i className={`${service.icon} text-white text-2xl`}></i>
                  </div>
                  <div className="icon-glow"></div>
                </motion.div>
                
                <motion.h3 
                  className="service-title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {service.title}
                </motion.h3>
                
                <motion.p 
                  className="service-description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  {service.description}
                </motion.p>
                
                <motion.div 
                  className="service-price"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  Premium Service
                </motion.div>
                
                <motion.button 
                  className="service-cta-button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Learn More</span>
                  <ArrowRight className="cta-arrow" />
                  <ExternalLink className="cta-external" />
                </motion.button>
              </div>
              
              <div className="service-card-glow"></div>
              <div className="service-card-border"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
