
import { Dish } from "@/data/dishes";

// Replace with your own API key input method
// This is a placeholder - you'll need to implement a proper key management approach
let openaiApiKey = "";

export const setOpenAIKey = (key: string) => {
  openaiApiKey = key;
};

export const checkDishWithGPT = async (dishName: string, allergyIds: string[]): Promise<Dish | null> => {
  if (!openaiApiKey) {
    console.warn("OpenAI API key not set");
    return null;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a Chinese cuisine expert who analyzes dishes for allergen content. 
                     Provide information about Chinese dishes in JSON format.`
          },
          {
            role: "user",
            content: `Analyze the Chinese dish "${dishName}". 
                     Return ONLY a JSON object with these fields:
                     - id: a unique identifier (kebab-case)
                     - name: the dish name in English
                     - chineseName: the dish name in Chinese (if known)
                     - description: a brief description
                     - allergens: an array of allergens from this list: ${allergyIds.join(", ")}
                     - ingredients: an array of main ingredients
                     - region: the regional cuisine (if known)
                     
                     If the dish is not a Chinese dish or you don't know it, return {"found": false}.
                     Do not include any text before or after the JSON.`
          }
        ]
      })
    });

    if (!response.ok) {
      console.error("OpenAI API error:", response.statusText);
      return null;
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const dishData = JSON.parse(content);
      
      if (dishData.found === false) {
        return null;
      }
      
      return dishData as Dish;
    } catch (error) {
      console.error("Error parsing GPT response:", error);
      return null;
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return null;
  }
};
