
import { useEffect } from "react";
import { Dish } from "@/data/dishes";
import { Allergen, allergens } from "@/data/allergies";
import { Check, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResultsProps {
  dish: Dish | null;
  allergyResults: {[key: string]: boolean};
  isMobile?: boolean;
}

export function Results({ dish, allergyResults, isMobile = false }: ResultsProps) {
  if (!dish) return null;

  const hasAnyAllergy = Object.values(allergyResults).some(result => result);
  
  return (
    <motion.div 
      className={`w-full ${isMobile ? 'mt-4' : 'mt-8'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`result-card ${isMobile ? 'p-4' : 'p-6'}`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-medium`}>{dish.name}</h3>
              {dish.chineseName && !isMobile && (
                <span className="text-lg text-muted-foreground">{dish.chineseName}</span>
              )}
            </div>
            {dish.region && (
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                  {dish.region}
                </span>
                {dish.chineseName && isMobile && (
                  <span className="text-xs text-muted-foreground">{dish.chineseName}</span>
                )}
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
              className={`flex items-center space-x-1 ${isMobile ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-sm'} rounded-lg ${
                hasAnyAllergy 
                  ? 'bg-destructive/10 text-destructive' 
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {hasAnyAllergy ? (
                <>
                  <AlertCircle className={`${isMobile ? 'h-3 w-3' : 'h-5 w-5'}`} />
                  <span className="font-medium">
                    {isMobile ? 'Allergens' : 'Contains Allergens'}
                  </span>
                </>
              ) : (
                <>
                  <Check className={`${isMobile ? 'h-3 w-3' : 'h-5 w-5'}`} />
                  <span className="font-medium">Safe</span>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <p className={`${isMobile ? 'mt-2 text-sm' : 'mt-4'} text-muted-foreground`}>{dish.description}</p>
        
        {dish.ingredients && (
          <div className={`${isMobile ? 'mt-3' : 'mt-6'}`}>
            <h4 className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium flex items-center`}>
              <Info className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} mr-1`} /> 
              Common Ingredients
            </h4>
            <div className="mt-1 flex flex-wrap gap-1">
              {dish.ingredients.map(ingredient => (
                <span 
                  key={ingredient} 
                  className={`${isMobile ? 'text-[10px]' : 'text-xs'} bg-secondary px-2 py-0.5 rounded-full`}
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className={`${isMobile ? 'mt-3' : 'mt-6'}`}>
          <h4 className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium flex items-center`}>
            <AlertCircle className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} mr-1`} /> 
            Your Allergy Results
          </h4>
          <div className="mt-1 flex flex-wrap gap-1">
            {Object.entries(allergyResults).map(([allergyId, hasAllergy]) => {
              const allergenItem = allergens.find(a => a.id === allergyId);
              
              return (
                <span 
                  key={allergyId} 
                  className={`${isMobile ? 'text-[10px]' : 'text-xs'} px-2 py-0.5 rounded-full flex items-center ${
                    hasAllergy
                      ? 'bg-destructive text-destructive-foreground'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {hasAllergy ? (
                    <AlertCircle className={`${isMobile ? 'h-2 w-2' : 'h-3 w-3'} mr-1`} />
                  ) : (
                    <Check className={`${isMobile ? 'h-2 w-2' : 'h-3 w-3'} mr-1`} />
                  )}
                  {allergenItem?.name || allergyId}
                </span>
              );
            })}
          </div>
        </div>
        
        <div className={`${isMobile ? 'mt-3' : 'mt-6'}`}>
          <h4 className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium flex items-center`}>
            <Info className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} mr-1`} /> 
            Known Allergens in Dish
          </h4>
          <div className="mt-1 flex flex-wrap gap-1">
            {dish.allergens.map(allergenId => {
              const allergenItem = allergens.find(a => a.id === allergenId);
              const isSelected = allergenId in allergyResults;
              
              return (
                <span 
                  key={allergenId} 
                  className={`${isMobile ? 'text-[10px]' : 'text-xs'} px-2 py-0.5 rounded-full ${
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
