
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Key, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getApiStatus } from "@/services/openai";

export function ApiKeyInput() {
  const [status, setStatus] = useState<'ready' | 'error' | 'quota-exceeded'>('ready');
  
  useEffect(() => {
    // Check the status when the component mounts
    setStatus(getApiStatus());
    
    // Set up interval to check status every 5 seconds
    const interval = setInterval(() => {
      setStatus(getApiStatus());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

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
            {status === 'ready' ? (
              <>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <p className="text-sm font-medium">API Connected</p>
              </>
            ) : status === 'quota-exceeded' ? (
              <>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <p className="text-sm font-medium">API Quota Exceeded</p>
              </>
            ) : (
              <>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <p className="text-sm font-medium">API Error</p>
              </>
            )}
          </div>
          
          {status === 'ready' ? (
            <p className="text-sm text-muted-foreground">
              ChatGPT integration is active and ready to help you find information about Chinese dishes.
            </p>
          ) : status === 'quota-exceeded' ? (
            <div className="space-y-2">
              <p className="text-sm text-yellow-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" /> 
                The OpenAI API quota has been exceeded.
              </p>
              <p className="text-sm text-muted-foreground">
                The app will only use the local database to check dishes. Some dishes might not be found.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" /> 
                There was an error connecting to OpenAI API.
              </p>
              <p className="text-sm text-muted-foreground">
                The app will only use the local database to check dishes. Some dishes might not be found.
              </p>
            </div>
          )}
          
          <p className="text-xs text-muted-foreground">
            The application is using a pre-configured API key. No additional setup is required.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ApiKeyInput;
