
import { useEffect } from "react";
import { Dish } from "@/data/dishes";
import { Allergen, allergens } from "@/data/allergies";
import { Check, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResultsProps {
  dish: Dish | null;
  allergyId: string | null;
  hasAllergy: boolean | null;
}

export function Results({ dish, allergyId, hasAllergy }: ResultsProps) {
  // Find the allergy name
  const allergen = allergyId ? allergens.find(a => a.id === allergyId) : null;

  // If we don't have both a dish and allergy, don't show anything
  if (!dish || !allergyId) return null;

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
            {hasAllergy !== null && (
              <motion.div
                key={hasAllergy ? 'allergy' : 'safe'}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  hasAllergy 
                    ? 'bg-destructive/10 text-destructive' 
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {hasAllergy ? (
                  <>
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Contains {allergen?.name}</span>
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5" />
                    <span className="font-medium">Safe to eat</span>
                  </>
                )}
              </motion.div>
            )}
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
            Known Allergens
          </h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {dish.allergens.map(allergenId => {
              const allergenItem = allergens.find(a => a.id === allergenId);
              const isSelected = allergenId === allergyId;
              
              return (
                <span 
                  key={allergenId} 
                  className={`text-xs px-2 py-1 rounded-full ${
                    isSelected
                      ? 'bg-destructive text-destructive-foreground'
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
