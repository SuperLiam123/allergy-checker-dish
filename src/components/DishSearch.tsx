
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SendHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DishSearchProps {
  onSearch: (dishName: string) => void;
  isLoading: boolean;
  isMobile?: boolean;
}

export function DishSearch({ onSearch, isLoading, isMobile = false }: DishSearchProps) {
  const [dishName, setDishName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Focus the input on component mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dishName.trim()) {
      onSearch(dishName);
    }
  };

  return (
    <motion.div 
      className={`w-full ${isMobile ? 'mt-4' : 'mt-8'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className={`glass-morphism rounded-2xl ${isMobile ? 'px-3 py-2' : 'px-6 py-4'}`}>
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Enter a Chinese dish name..."
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              className={`search-input pl-8 ${isMobile ? 'text-base py-4' : 'text-lg py-6'}`}
            />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLoading ? 'loading' : 'search'}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <Button 
                type="submit" 
                disabled={!dishName.trim() || isLoading}
                className={`${isMobile ? 'px-3 py-2 h-auto' : 'px-6'}`}
                size={isMobile ? "sm" : "default"}
              >
                {isMobile ? (
                  <SendHorizontal className="h-4 w-4" />
                ) : (
                  isLoading ? "Checking..." : "Check"
                )}
              </Button>
            </motion.div>
          </AnimatePresence>
        </form>
      </div>
    </motion.div>
  );
}

export default DishSearch;
