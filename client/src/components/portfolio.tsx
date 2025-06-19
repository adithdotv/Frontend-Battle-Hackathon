import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Eye, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PopupModal } from "./popup-modal";
import type { PortfolioItem } from "@shared/schema";

export function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: portfolioItems, isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  const itemsPerView = 3;
  const totalItems = portfolioItems?.length || 0;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  if (isLoading) {
    return (
      <section id="portfolio" className="py-20 bg-muted/30 dark:bg-muted/20 theme-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="gradient-text">Our Portfolio</span>
            </h2>
          </div>
          <div className="portfolio-carousel">
            <div className="carousel-track">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="carousel-item animate-pulse">
                  <div className="bg-muted rounded-2xl h-64 mb-4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-muted/30 dark:bg-muted/20 theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Our Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our latest projects and success stories
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="portfolio-carousel">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="carousel-btn carousel-btn-prev"
            onClick={prevSlide}
            disabled={totalItems <= itemsPerView}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="carousel-btn carousel-btn-next"
            onClick={nextSlide}
            disabled={totalItems <= itemsPerView}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Carousel Track */}
          <div className="carousel-track">
            <div 
              className="carousel-slides"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {portfolioItems?.map((item) => (
                <div key={item.id} className="carousel-item">
                  <div className="group relative overflow-hidden rounded-2xl shadow-lg card-hover">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 text-white">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-sm mb-4">{item.description}</p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => openModal(item)}
                            className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visit Site
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Item Modal */}
      <PopupModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedItem?.title || ''}
        size="lg"
      >
        {selectedItem && (
          <div className="space-y-6">
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-2">Project Overview</h4>
                <p className="text-muted-foreground">{selectedItem.description}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Category</h4>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {selectedItem.category}
                </span>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'].map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-muted rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Live Site
                </Button>
                <Button variant="outline" className="flex-1">
                  View Case Study
                </Button>
              </div>
            </div>
          </div>
        )}
      </PopupModal>
    </section>
  );
}
