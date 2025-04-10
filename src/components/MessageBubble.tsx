
import React from 'react';
import { cn } from "@/lib/utils";
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  content: string;
  time: string;
  isOutgoing: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  time,
  isOutgoing,
  status = 'sent'
}) => {
  return (
    <div 
      className={cn(
        "flex mb-3",
        isOutgoing ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "relative rounded-xl py-2 px-3 max-w-[80%] animate-message-appear",
          isOutgoing 
            ? "bg-telegram-bubble-out message-bubble-out" 
            : "bg-telegram-bubble-in message-bubble-in"
        )}
      >
        <div className="whitespace-pre-wrap break-words text-sm">{content}</div>
        <div className="flex items-center justify-end mt-1 space-x-1">
          <span className="text-xs text-gray-500">{time}</span>
          {isOutgoing && (
            status === 'read' ? (
              <CheckCheck className="h-3 w-3 text-telegram-blue" />
            ) : status === 'delivered' ? (
              <CheckCheck className="h-3 w-3 text-gray-400" />
            ) : (
              <Check className="h-3 w-3 text-gray-400" />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
