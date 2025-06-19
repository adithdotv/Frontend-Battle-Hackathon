import { useState } from "react";
import { Cloud, Settings, Check } from "lucide-react";

interface Brand {
  id: string;
  name: string;
  colorDot: string;
  isActive?: boolean;
}

const brands: Brand[] = [
  { id: "1", name: "TechFlow", colorDot: "#3B82F6" },
  { id: "2", name: "CreativeStudio", colorDot: "#10B981" },
  { id: "3", name: "DataSync", colorDot: "#F59E0B" },
  { id: "4", name: "CloudVision", colorDot: "#EF4444" },
  { id: "5", name: "NeuralNet", colorDot: "#8B5CF6" },
  { id: "6", name: "PixelCraft", colorDot: "#EC4899" },
];

export function BrandKits() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>("1");

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
  };

  return (
    <section className="py-20 bg-background dark:bg-background theme-transition">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Brand Kits</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your brand assets and configurations with our intuitive interface
          </p>
        </div>
        
        {/* Brand Cards Container */}
        <div className="brand-kits-container">
          <div className="space-y-4">
            {brands.map((brand) => {
              const isSelected = selectedBrand === brand.id;
              
              return (
                <div
                  key={brand.id}
                  className={`brand-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleBrandSelect(brand.id)}
                >
                  {/* Left Toggle/Selector */}
                  <div className="brand-selector">
                    <div className={`selector-circle ${isSelected ? 'active' : ''}`}>
                      {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </div>
                  
                  {/* Brand Info */}
                  <div className="brand-info">
                    <div className="brand-icon">
                      <Cloud className="h-5 w-5 text-slate-400" />
                      <div 
                        className="color-dot"
                        style={{ backgroundColor: brand.colorDot }}
                      ></div>
                    </div>
                    <span className="brand-name">{brand.name}</span>
                  </div>
                  
                  {/* Settings Icon */}
                  <div className="brand-settings">
                    <Settings className="h-4 w-4 text-slate-400 hover:text-slate-300 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}