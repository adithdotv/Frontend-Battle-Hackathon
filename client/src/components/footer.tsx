import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Linkedin, Github, Dribbble, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white dark:text-slate-100 py-16 theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold gradient-text mb-4">NextGen</div>
            <p className="text-slate-400 mb-6">
              Transforming businesses with cutting-edge digital solutions and innovative technology.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="bg-slate-800 hover:bg-primary">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-slate-800 hover:bg-primary">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-slate-800 hover:bg-primary">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-slate-800 hover:bg-primary">
                <Dribbble className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Digital Marketing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Consulting</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-slate-400 mb-4">Stay updated with our latest news and insights.</p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 bg-slate-800 border-slate-700 text-white"
              />
              <Button className="ml-2 bg-primary hover:bg-primary/90">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; 2024 NextGen Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
