import { useState } from "react";
import { Loader } from "@/components/loader";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Statistics } from "@/components/statistics";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { Customers } from "@/components/customers";
import { Testimonials } from "@/components/testimonials";
import { BrandKits } from "@/components/brand-kits";
import { EmissionsDashboard } from "@/components/emissions-dashboard";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <section id="home">
        <Hero />
      </section>
      <section id="statistics">
        <Statistics />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="customers">
        <Customers />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="brand-kits">
        <BrandKits />
      </section>
      <section id="dashboard">
        <EmissionsDashboard />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </div>
  );
}
