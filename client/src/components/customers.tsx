export function Customers() {
  const customers = [
    "TechCorp",
    "InnovateLab", 
    "DataFlow",
    "CloudTech",
    "FutureApp",
    "NextBase"
  ];

  return (
    <section id="customers" className="py-20 bg-muted/50 theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Trusted by Industry Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're proud to work with amazing companies across various industries
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60 dark:opacity-40">
          {customers.map((customer, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-muted-foreground">{customer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
