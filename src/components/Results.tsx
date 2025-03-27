
import { useEffect } from "react";
import { Dish } from "@/data/dishes";
import { Allergen, allergens } from "@/data/allergies";
import { Check, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResultsProps {
  dish: Dish | null;
  allergyResults: {[key: string]: boolean};
}

export function Results({ dish, allergyResults }: ResultsProps) {
  if (!dish) return null;

  const hasAnyAllergy = Object.values(allergyResults).some(result => result);
  
  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="result-card">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-2xl font-medium">{dish.name}</h3>
              {dish.chineseName && (
                <span className="text-lg text-muted-foreground">{dish.chineseName}</span>
              )}
            </div>
            {dish.region && (
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                  {dish.region}
                </span>
              </div>
            )}
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={hasAnyAllergy ? 'allergy' : 'safe'}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                hasAnyAllergy 
                  ? 'bg-destructive/10 text-destructive' 
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {hasAnyAllergy ? (
                <>
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-medium">Contains Allergens</span>
                </>
              ) : (
                <>
                  <Check className="h-5 w-5" />
                  <span className="font-medium">Safe to eat</span>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <p className="mt-4 text-muted-foreground">{dish.description}</p>
        
        {dish.ingredients && (
          <div className="mt-6">
            <h4 className="text-sm font-medium flex items-center">
              <Info className="h-4 w-4 mr-1" /> 
              Common Ingredients
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {dish.ingredients.map(ingredient => (
                <span 
                  key={ingredient} 
                  className="text-xs bg-secondary px-2 py-1 rounded-full"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <h4 className="text-sm font-medium flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" /> 
            Your Allergy Results
          </h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {Object.entries(allergyResults).map(([allergyId, hasAllergy]) => {
              const allergenItem = allergens.find(a => a.id === allergyId);
              
              return (
                <span 
                  key={allergyId} 
                  className={`text-xs px-2 py-1 rounded-full flex items-center ${
                    hasAllergy
                      ? 'bg-destructive text-destructive-foreground'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {hasAllergy ? (
                    <AlertCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <Check className="h-3 w-3 mr-1" />
                  )}
                  {allergenItem?.name || allergyId}
                </span>
              );
            })}
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium flex items-center">
            <Info className="h-4 w-4 mr-1" /> 
            Known Allergens in Dish
          </h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {dish.allergens.map(allergenId => {
              const allergenItem = allergens.find(a => a.id === allergenId);
              const isSelected = allergenId in allergyResults;
              
              return (
                <span 
                  key={allergenId} 
                  className={`text-xs px-2 py-1 rounded-full ${
                    isSelected
                      ? allergyResults[allergenId]
                        ? 'bg-destructive text-destructive-foreground'
                        : 'bg-green-100 text-green-800'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {allergenItem?.name || allergenId}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Results;
