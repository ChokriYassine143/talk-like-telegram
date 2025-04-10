
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ConversationItemProps {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread?: number;
  active?: boolean;
  onClick: (id: string) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  id,
  name,
  avatar,
  lastMessage,
  time,
  unread = 0,
  active = false,
  onClick
}) => {
  return (
    <div 
      className={cn(
        "flex items-center p-3 gap-3 cursor-pointer hover:bg-telegram-gray-light transition-colors rounded-md",
        active && "bg-telegram-blue-light"
      )}
      onClick={() => onClick(id)}
    >
      <Avatar className="h-12 w-12 shrink-0">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback className="bg-telegram-blue text-white">
          {name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h3 className="font-medium truncate">{name}</h3>
          <span className="text-xs text-telegram-gray-dark shrink-0 ml-2">{time}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-telegram-gray-dark truncate">{lastMessage}</p>
          {unread > 0 && (
            <span className="flex-shrink-0 bg-telegram-blue text-white rounded-full text-xs h-5 w-5 flex items-center justify-center ml-2">
              {unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
