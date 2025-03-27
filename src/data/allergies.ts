
export interface Allergen {
  id: string;
  name: string;
  description: string;
}

export const allergens: Allergen[] = [
  {
    id: "peanuts",
    name: "Peanuts",
    description: "Allergic reaction to peanuts and peanut derivatives."
  },
  {
    id: "shellfish",
    name: "Shellfish",
    description: "Includes shrimp, crab, lobster, and other shellfish."
  },
  {
    id: "soy",
    name: "Soy",
    description: "Soybeans and soy-based products including tofu and soy sauce."
  },
  {
    id: "gluten",
    name: "Gluten",
    description: "Found in wheat, barley, rye, and some oats."
  },
  {
    id: "tree_nuts",
    name: "Tree Nuts",
    description: "Includes almonds, walnuts, cashews, and other tree nuts."
  },
  {
    id: "sesame",
    name: "Sesame",
    description: "Sesame seeds and sesame oil."
  },
  {
    id: "fish",
    name: "Fish",
    description: "Various fish species like cod, salmon, and tuna."
  },
  {
    id: "eggs",
    name: "Eggs",
    description: "Eggs and egg-based products."
  }
];
