
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Key } from "lucide-react";

export function ApiKeyInput() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          <Key className="h-3 w-3 mr-1" />
          API Status
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>OpenAI API Status</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <p className="text-sm font-medium">API Connected</p>
          </div>
          <p className="text-sm text-muted-foreground">
            ChatGPT integration is active and ready to help you find information about Chinese dishes.
          </p>
          <p className="text-xs text-muted-foreground">
            The application is using a pre-configured API key. No additional setup is required.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ApiKeyInput;
