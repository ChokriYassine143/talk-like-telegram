
import React, { useState } from 'react';
import { Paperclip, Smile, Mic, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="border-t border-gray-200 p-3 bg-white">
      <div className="flex items-end gap-2">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-gray-500 hover:text-telegram-blue hover:bg-telegram-blue-light">
          <Paperclip className="h-5 w-5" />
        </Button>
        
        <div className="flex-1 relative">
          <Textarea
            placeholder="Message"
            className="resize-none min-h-[40px] max-h-[150px] py-2 px-3 rounded-xl border-gray-200 focus-visible:ring-telegram-blue"
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 rounded-full text-gray-500 hover:text-telegram-blue hover:bg-telegram-blue-light"
        >
          <Smile className="h-5 w-5" />
        </Button>
        
        {message.trim() ? (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-full text-telegram-blue hover:bg-telegram-blue-light"
            onClick={handleSend}
          >
            <Send className="h-5 w-5" />
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-full text-gray-500 hover:text-telegram-blue hover:bg-telegram-blue-light"
          >
            <Mic className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
