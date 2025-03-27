
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Key } from "lucide-react";
import { setOpenAIKey } from "@/services/openai";
import { toast } from "@/components/ui/use-toast";

export function ApiKeyInput() {
  const [apiKey, setApiKey] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      setOpenAIKey(apiKey.trim());
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved for this session.",
      });
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          <Key className="h-3 w-3 mr-1" />
          Set API Key
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <p className="text-sm text-muted-foreground">
            Enter your OpenAI API key to enable ChatGPT integration for finding more Chinese dishes.
            The key will only be stored in your browser for this session.
          </p>
          <Input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            type="password"
          />
          <Button onClick={handleSaveKey} className="w-full">Save Key</Button>
          <p className="text-xs text-muted-foreground">
            Your API key is only stored in your browser's memory and is never sent to our servers.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ApiKeyInput;
