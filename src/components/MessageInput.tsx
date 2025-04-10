
import React, { useState } from 'react';
import { Paperclip, Smile, Mic, Send, Image, Paperclip as Attachment } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 p-3 bg-white shadow-inner">
      <div className="flex items-end gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-gray-500 hover:text-telegram-blue hover:bg-telegram-blue-light transition-colors duration-200">
              <Paperclip className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-52 p-2">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center h-16 space-y-1 hover:bg-telegram-blue-light hover:text-telegram-blue">
                <Image className="h-6 w-6" />
                <span className="text-xs">Photo/Video</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center h-16 space-y-1 hover:bg-telegram-blue-light hover:text-telegram-blue">
                <Attachment className="h-6 w-6" />
                <span className="text-xs">File</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <div className="flex-1 relative">
          <Textarea
            placeholder="Message"
            className="resize-none min-h-[40px] max-h-[150px] py-2 px-3 rounded-xl border-gray-200 focus-visible:ring-telegram-blue transition-all duration-200"
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 rounded-full text-gray-500 hover:text-telegram-blue hover:bg-telegram-blue-light transition-colors duration-200"
        >
          <Smile className="h-5 w-5" />
        </Button>
        
        {message.trim() ? (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-full text-telegram-blue hover:bg-telegram-blue-light transition-all duration-200 transform hover:scale-105"
            onClick={handleSend}
          >
            <Send className="h-5 w-5" />
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-full text-gray-500 hover:text-telegram-blue hover:bg-telegram-blue-light transition-colors duration-200"
          >
            <Mic className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
