
import { useState, useEffect } from "react";
import AllergySelector from "@/components/AllergySelector";
import DishSearch from "@/components/DishSearch";
import Results from "@/components/Results";
import { searchDish, checkAllergyInDish, Dish } from "@/data/dishes";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [selectedAllergy, setSelectedAllergy] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [foundDish, setFoundDish] = useState<Dish | null>(null);
  const [hasAllergy, setHasAllergy] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<'initial' | 'not-found' | 'found'>('initial');

  const handleAllergySelect = (allergyId: string) => {
    setSelectedAllergy(allergyId);
    // Reset search results when changing allergy
    if (foundDish) {
      setFoundDish(null);
      setHasAllergy(null);
      setStatus('initial');
    }
  };

  const handleSearch = (dishName: string) => {
    if (!selectedAllergy) return;
    
    setSearchQuery(dishName);
    setIsLoading(true);
    
    // Simulate a search delay for better UX
    setTimeout(() => {
      const dish = searchDish(dishName);
      
      if (dish) {
        setFoundDish(dish);
        setHasAllergy(checkAllergyInDish(dish, selectedAllergy));
        setStatus('found');
      } else {
        setFoundDish(null);
        setHasAllergy(null);
        setStatus('not-found');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/20">
      <motion.div 
        className="w-full max-w-3xl text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold tracking-tight mb-3">Chinese Food Allergy Checker</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Check if your favorite Chinese dishes contain ingredients you're allergic to
        </p>
      </motion.div>

      <AllergySelector 
        selectedAllergy={selectedAllergy} 
        onAllergySelect={handleAllergySelect} 
      />
      
      <AnimatePresence mode="wait">
        {selectedAllergy && (
          <DishSearch onSearch={handleSearch} isLoading={isLoading} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {status === 'not-found' && searchQuery && !isLoading && (
          <motion.div 
            className="w-full max-w-2xl mx-auto mt-8 glass-morphism rounded-xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-medium mb-2">Dish Not Found</h3>
            <p className="text-muted-foreground">
              We couldn't find "{searchQuery}" in our database. Please try another dish or check your spelling.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Results 
        dish={foundDish} 
        allergyId={selectedAllergy} 
        hasAllergy={hasAllergy} 
      />
      
      <motion.div 
        className="w-full max-w-2xl mx-auto mt-auto pt-12 text-center text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <p>
          This tool provides general information only and should not replace professional medical advice.
          Always consult with healthcare providers regarding allergies and dietary restrictions.
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
