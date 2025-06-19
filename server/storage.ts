import { 
  users, 
  services,
  portfolioItems,
  testimonials,
  contactSubmissions,
  type User, 
  type InsertUser,
  type Service,
  type InsertService,
  type PortfolioItem,
  type InsertPortfolioItem,
  type Testimonial,
  type InsertTestimonial,
  type ContactSubmission,
  type InsertContactSubmission
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getServices(): Promise<Service[]>;
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getTestimonials(): Promise<Testimonial[]>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private portfolioItems: Map<number, PortfolioItem>;
  private testimonials: Map<number, Testimonial>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private currentUserId: number;
  private currentServiceId: number;
  private currentPortfolioId: number;
  private currentTestimonialId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.portfolioItems = new Map();
    this.testimonials = new Map();
    this.contactSubmissions = new Map();
    this.currentUserId = 1;
    this.currentServiceId = 1;
    this.currentPortfolioId = 1;
    this.currentTestimonialId = 1;
    this.currentContactId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed services
    const servicesData: Omit<Service, 'id'>[] = [
      {
        title: "Web Development",
        description: "Custom web applications built with modern technologies for optimal performance and user experience.",
        icon: "fas fa-code",
        features: ["React & Next.js", "Node.js Backend", "Database Design"],
        gradient: "from-primary-500 to-violet-500"
      },
      {
        title: "UI/UX Design",
        description: "Beautiful, intuitive designs that enhance user engagement and drive conversions.",
        icon: "fas fa-palette",
        features: ["User Research", "Wireframing", "Prototyping"],
        gradient: "from-violet-500 to-cyan-500"
      },
      {
        title: "Mobile Apps",
        description: "Native and cross-platform mobile applications for iOS and Android.",
        icon: "fas fa-mobile-alt",
        features: ["React Native", "Flutter", "App Store Deploy"],
        gradient: "from-cyan-500 to-primary-500"
      },
      {
        title: "Digital Marketing",
        description: "Comprehensive digital marketing strategies to grow your online presence.",
        icon: "fas fa-chart-line",
        features: ["SEO Optimization", "Social Media", "PPC Campaigns"],
        gradient: "from-green-500 to-emerald-500"
      },
      {
        title: "Cloud Solutions",
        description: "Scalable cloud infrastructure and deployment solutions for your applications.",
        icon: "fas fa-cloud",
        features: ["AWS/Azure", "DevOps", "CI/CD Pipeline"],
        gradient: "from-orange-500 to-red-500"
      },
      {
        title: "Consulting",
        description: "Strategic technology consulting to optimize your business processes.",
        icon: "fas fa-cogs",
        features: ["Tech Strategy", "Process Optimization", "Digital Transformation"],
        gradient: "from-purple-500 to-pink-500"
      }
    ];

    servicesData.forEach(service => {
      const id = this.currentServiceId++;
      this.services.set(id, { ...service, id });
    });

    // Seed portfolio items
    const portfolioData: Omit<PortfolioItem, 'id'>[] = [
      {
        title: "E-commerce Platform",
        description: "Modern shopping experience with AI recommendations",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Web Development"
      },
      {
        title: "Healthcare Dashboard",
        description: "Patient management system with real-time analytics",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Healthcare"
      },
      {
        title: "Fintech Mobile App",
        description: "Personal finance management with smart insights",
        imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Mobile"
      },
      {
        title: "Education Platform",
        description: "Interactive learning management system",
        imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Education"
      },
      {
        title: "Real Estate Platform",
        description: "Property search with virtual tours and AR features",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Real Estate"
      },
      {
        title: "Travel Booking App",
        description: "Smart travel planning with personalized recommendations",
        imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Travel"
      }
    ];

    portfolioData.forEach(item => {
      const id = this.currentPortfolioId++;
      this.portfolioItems.set(id, { ...item, id });
    });

    // Seed testimonials
    const testimonialsData: Omit<Testimonial, 'id'>[] = [
      {
        name: "Michael Chen",
        title: "CEO",
        company: "TechCorp",
        content: "NextGen transformed our digital presence completely. Their attention to detail and technical expertise exceeded our expectations.",
        rating: 5,
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
      },
      {
        name: "Sarah Rodriguez",
        title: "CTO",
        company: "InnovateLab",
        content: "The team delivered our mobile app ahead of schedule with exceptional quality. Outstanding project management and communication.",
        rating: 5,
        avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
      },
      {
        name: "David Kim",
        title: "Founder",
        company: "DataFlow",
        content: "Working with NextGen was a game-changer for our startup. They understood our vision and brought it to life perfectly.",
        rating: 5,
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
      }
    ];

    testimonialsData.forEach(testimonial => {
      const id = this.currentTestimonialId++;
      this.testimonials.set(id, { ...testimonial, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values());
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const contactSubmission: ContactSubmission = {
      ...submission,
      id,
      createdAt: new Date()
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }
}

export const storage = new MemStorage();
