
export interface Dish {
  id: string;
  name: string;
  chineseName?: string;
  description: string;
  allergens: string[];
  ingredients?: string[];
  region?: string;
}

export const dishes: Dish[] = [
  {
    id: "kung_pao_chicken",
    name: "Kung Pao Chicken",
    chineseName: "宫保鸡丁",
    description: "A spicy stir-fry dish with chicken, peanuts, vegetables, and chili peppers.",
    allergens: ["peanuts", "soy"],
    ingredients: ["chicken", "peanuts", "soy sauce", "chili peppers", "vegetables"],
    region: "Sichuan"
  },
  {
    id: "mapo_tofu",
    name: "Mapo Tofu",
    chineseName: "麻婆豆腐",
    description: "Soft tofu in a spicy sauce with minced meat.",
    allergens: ["soy"],
    ingredients: ["tofu", "ground pork", "doubanjiang", "soy sauce", "chili oil"],
    region: "Sichuan"
  },
  {
    id: "dim_sum",
    name: "Dim Sum",
    chineseName: "点心",
    description: "Various small dishes served in steamer baskets or small plates.",
    allergens: ["gluten", "shellfish", "soy", "sesame", "peanuts", "eggs"],
    ingredients: ["flour", "various fillings", "soy sauce"],
    region: "Cantonese"
  },
  {
    id: "chow_mein",
    name: "Chow Mein",
    chineseName: "炒面",
    description: "Stir-fried noodles with vegetables and protein.",
    allergens: ["gluten", "soy", "eggs"],
    ingredients: ["noodles", "vegetables", "protein", "soy sauce"],
    region: "Cantonese"
  },
  {
    id: "peking_duck",
    name: "Peking Duck",
    chineseName: "北京烤鸭",
    description: "Roasted duck known for its thin, crispy skin.",
    allergens: ["soy", "gluten"],
    ingredients: ["duck", "hoisin sauce", "pancakes", "scallions", "cucumber"],
    region: "Beijing"
  },
  {
    id: "hot_pot",
    name: "Hot Pot",
    chineseName: "火锅",
    description: "A communal meal with a simmering pot of soup stock and various ingredients.",
    allergens: ["shellfish", "fish", "soy", "gluten", "sesame"],
    ingredients: ["broth", "meats", "seafood", "vegetables", "tofu", "noodles"],
    region: "Various"
  },
  {
    id: "spring_rolls",
    name: "Spring Rolls",
    chineseName: "春卷",
    description: "Cylindrical appetizers filled with vegetables and sometimes meat.",
    allergens: ["gluten", "soy", "eggs"],
    ingredients: ["wheat flour wrapper", "vegetables", "sometimes meat", "soy sauce"],
    region: "Various"
  },
  {
    id: "fried_rice",
    name: "Fried Rice",
    chineseName: "炒饭",
    description: "Rice stir-fried with eggs, vegetables, and protein.",
    allergens: ["eggs", "soy"],
    ingredients: ["rice", "eggs", "vegetables", "protein", "soy sauce"],
    region: "Various"
  },
  {
    id: "sweet_and_sour_pork",
    name: "Sweet and Sour Pork",
    chineseName: "糖醋里脊",
    description: "Deep-fried pork with a sweet and tangy sauce.",
    allergens: ["gluten", "soy"],
    ingredients: ["pork", "flour", "vegetables", "sweet and sour sauce"],
    region: "Cantonese"
  },
  {
    id: "fortune_cookies",
    name: "Fortune Cookies",
    chineseName: "",
    description: "Crisp cookies with a paper fortune inside.",
    allergens: ["gluten", "eggs"],
    ingredients: ["flour", "sugar", "vanilla", "eggs"],
    region: "American-Chinese"
  },
  {
    id: "wonton_soup",
    name: "Wonton Soup",
    chineseName: "馄饨汤",
    description: "Soup with filled dumplings and broth.",
    allergens: ["gluten", "shellfish", "eggs", "soy"],
    ingredients: ["flour", "shrimp or pork", "eggs", "broth", "vegetables"],
    region: "Cantonese"
  },
  {
    id: "dandan_noodles",
    name: "Dan Dan Noodles",
    chineseName: "担担面",
    description: "Spicy Sichuan noodles with preserved vegetables and minced meat.",
    allergens: ["gluten", "peanuts", "sesame", "soy"],
    ingredients: ["noodles", "preserved vegetables", "chili oil", "minced pork", "Sichuan peppercorns"],
    region: "Sichuan"
  },
  {
    id: "shrimp_dumplings",
    name: "Shrimp Dumplings (Har Gow)",
    chineseName: "虾饺",
    description: "Translucent dumplings filled with shrimp.",
    allergens: ["shellfish", "gluten"],
    ingredients: ["shrimp", "wheat starch", "tapioca starch", "bamboo shoots"],
    region: "Cantonese"
  },
  {
    id: "szechuan_fish",
    name: "Szechuan Fish",
    chineseName: "水煮鱼",
    description: "Poached fish in hot and spicy broth.",
    allergens: ["fish", "soy"],
    ingredients: ["fish fillets", "chili oil", "Sichuan peppercorns", "vegetables"],
    region: "Sichuan"
  },
  {
    id: "egg_tarts",
    name: "Egg Tarts",
    chineseName: "蛋挞",
    description: "Sweet pastry crust filled with egg custard.",
    allergens: ["eggs", "gluten"],
    ingredients: ["flour", "eggs", "sugar", "milk"],
    region: "Cantonese/Macau"
  }
];

export function searchDish(name: string): Dish | undefined {
  const normalizedName = name.toLowerCase().trim();
  
  return dishes.find(dish => 
    dish.name.toLowerCase().includes(normalizedName) || 
    (dish.chineseName && dish.chineseName.includes(normalizedName))
  );
}

export function checkAllergyInDish(dish: Dish, allergyId: string): boolean {
  return dish.allergens.includes(allergyId);
}
