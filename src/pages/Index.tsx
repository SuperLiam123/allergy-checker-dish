
import { useState, useEffect } from "react";
import AllergySelector from "@/components/AllergySelector";
import DishSearch from "@/components/DishSearch";
import Results from "@/components/Results";
import ApiKeyInput from "@/components/ApiKeyInput";
import { searchDish, checkAllergyInDish, Dish } from "@/data/dishes";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { checkDishWithGPT } from "@/services/openai";

const Index = () => {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [foundDish, setFoundDish] = useState<Dish | null>(null);
  const [hasAllergies, setHasAllergies] = useState<{[key: string]: boolean}>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<'initial' | 'not-found' | 'found'>('initial');

  const handleAllergySelect = (allergyId: string) => {
    setSelectedAllergies(prev => {
      if (prev.includes(allergyId)) {
        return prev.filter(id => id !== allergyId);
      } else {
        return [...prev, allergyId];
      }
    });
    
    // Reset search results when changing allergies
    if (foundDish) {
      setFoundDish(null);
      setHasAllergies({});
      setStatus('initial');
    }
  };

  const handleSearch = async (dishName: string) => {
    if (selectedAllergies.length === 0) {
      toast({
        title: "No allergies selected",
        description: "Please select at least one allergy to check.",
        variant: "destructive"
      });
      return;
    }
    
    setSearchQuery(dishName);
    setIsLoading(true);
    
    // First try local database
    let dish = searchDish(dishName);
    
    // If not found locally, try ChatGPT
    if (!dish) {
      try {
        const gptDish = await checkDishWithGPT(dishName, selectedAllergies);
        if (gptDish) {
          dish = gptDish;
        }
      } catch (error) {
        console.error("Error fetching from ChatGPT:", error);
      }
    }
    
    if (dish) {
      setFoundDish(dish);
      
      // Check each selected allergy
      const allergyResults: {[key: string]: boolean} = {};
      selectedAllergies.forEach(allergyId => {
        allergyResults[allergyId] = checkAllergyInDish(dish, allergyId);
      });
      
      setHasAllergies(allergyResults);
      setStatus('found');
    } else {
      setFoundDish(null);
      setHasAllergies({});
      setStatus('not-found');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/20">
      <motion.div 
        className="w-full max-w-3xl text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center mb-3">
          <h1 className="text-4xl font-bold tracking-tight">Chinese Food Allergy Checker</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Check if your favorite Chinese dishes contain ingredients you're allergic to
        </p>
        <div className="mt-4">
          <ApiKeyInput />
        </div>
      </motion.div>

      <AllergySelector 
        selectedAllergies={selectedAllergies} 
        onAllergySelect={handleAllergySelect} 
      />
      
      <DishSearch onSearch={handleSearch} isLoading={isLoading} />

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
              We couldn't find "{searchQuery}" in our database or through AI assistance. Please try another dish or check your spelling.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Results 
        dish={foundDish} 
        allergyResults={hasAllergies}
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
