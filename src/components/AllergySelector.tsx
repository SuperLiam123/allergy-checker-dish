
import { useState } from "react";
import { Allergen, allergens } from "@/data/allergies";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface AllergySelectorProps {
  selectedAllergies: string[];
  onAllergySelect: (allergyId: string) => void;
  isMobile?: boolean;
}

export function AllergySelector({ selectedAllergies, onAllergySelect, isMobile = false }: AllergySelectorProps) {
  return (
    <div className="w-full">
      <motion.div 
        className={`${isMobile ? 'mb-4' : 'mb-8'} animate-fade-in`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-medium mb-2 sm:mb-4 text-center`}>Select Your Allergies</h2>
        {!isMobile && (
          <p className="text-muted-foreground text-center mb-6">
            Choose one or more allergies to check if a Chinese dish contains allergens that could affect you.
          </p>
        )}
      </motion.div>
      
      <motion.div 
        className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-2 md:grid-cols-4 gap-3'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        {allergens.map((allergen, index) => (
          <motion.div
            key={allergen.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div
              className={`allergy-item relative ${isMobile ? 'px-3 py-2 text-sm' : ''}`}
              data-selected={selectedAllergies.includes(allergen.id)}
              onClick={() => onAllergySelect(allergen.id)}
            >
              {selectedAllergies.includes(allergen.id) && (
                <div className="absolute top-2 right-2">
                  <Check className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-primary`} />
                </div>
              )}
              <div className="font-medium">{allergen.name}</div>
              <div className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-muted-foreground mt-1 line-clamp-1`}>
                {allergen.description}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default AllergySelector;
