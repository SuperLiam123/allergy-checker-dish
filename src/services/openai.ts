
import { Dish } from "@/data/dishes";
import { toast } from "@/components/ui/use-toast";

// Use the provided OpenAI API key
let openaiApiKey = "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";
let apiStatus: 'ready' | 'error' | 'quota-exceeded' = 'ready';

export const getApiStatus = () => apiStatus;

export const setOpenAIKey = (key: string) => {
  // Only for backward compatibility, we're now using the hardcoded key
  if (key) {
    openaiApiKey = key;
    apiStatus = 'ready';
  }
};

export const checkDishWithGPT = async (dishName: string, allergyIds: string[]): Promise<Dish | null> => {
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
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      
      // Handle quota exceeded error
      if (errorData.error?.code === "insufficient_quota") {
        apiStatus = 'quota-exceeded';
        toast({
          title: "API Quota Exceeded",
          description: "The OpenAI API quota has been exceeded. The app will use local database only.",
          variant: "destructive"
        });
      } else {
        apiStatus = 'error';
        toast({
          title: "API Error",
          description: "There was an error connecting to OpenAI. The app will use local database only.",
          variant: "destructive"
        });
      }
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
    apiStatus = 'error';
    return null;
  }
};
