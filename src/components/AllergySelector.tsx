
import { useState } from "react";
import { Allergen, allergens } from "@/data/allergies";
import { motion } from "framer-motion";

interface AllergySelectorProps {
  selectedAllergy: string | null;
  onAllergySelect: (allergyId: string) => void;
}

export function AllergySelector({ selectedAllergy, onAllergySelect }: AllergySelectorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div 
        className="mb-8 animate-fade-in"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-medium mb-4 text-center">Select Your Allergy</h2>
        <p className="text-muted-foreground text-center mb-6">
          Choose an allergy to check if a Chinese dish contains allergens that could affect you.
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
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
              className="allergy-item"
              data-selected={selectedAllergy === allergen.id}
              onClick={() => onAllergySelect(allergen.id)}
            >
              <div className="font-medium">{allergen.name}</div>
              <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{allergen.description}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default AllergySelector;
