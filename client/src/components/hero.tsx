import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById("portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-background to-muted/50 dark:from-background dark:to-muted/30 theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">NextGen</span><br />
              <span className="text-foreground">Digital Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Transform your business with cutting-edge digital services. We deliver exceptional web development, design, and consulting solutions that drive growth and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-primary/25"
              >
                Get Started Today
              </Button>
              <Button 
                variant="outline"
                onClick={scrollToPortfolio}
                className="border-2 border-primary dark:border-primary px-8 py-6 text-lg font-semibold hover:bg-muted dark:hover:bg-muted/80 text-foreground dark:text-foreground"
              >
                View Our Work
              </Button>
            </div>
          </div>
          <div className="animate-slide-up">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern cityscape representing digital transformation" 
              className="rounded-2xl shadow-2xl w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
