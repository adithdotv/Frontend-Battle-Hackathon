import { useState } from "react";
import { Loader } from "@/components/loader";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Statistics } from "@/components/statistics";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { Customers } from "@/components/customers";
import { Testimonials } from "@/components/testimonials";
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
      <Hero />
      <Statistics />
      <Services />
      <Portfolio />
      <Customers />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
