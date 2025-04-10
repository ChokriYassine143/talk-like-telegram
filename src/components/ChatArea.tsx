
import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Video, Search, MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

interface Message {
  id: string;
  content: string;
  time: string;
  isOutgoing: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  status: string;
  messages: Message[];
}

interface ChatAreaProps {
  conversation: Conversation | null;
  onSendMessage: (conversationId: string, content: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ conversation, onSendMessage }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-telegram-gray-light">
        <div className="text-center text-gray-500">
          <p className="text-xl font-medium">Select a conversation</p>
          <p className="mt-2">Choose from your existing conversations or start a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F4F7F9]">
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={conversation.avatar} alt={conversation.name} />
            <AvatarFallback className="bg-telegram-blue text-white">
              {conversation.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{conversation.name}</h3>
            <p className="text-xs text-telegram-gray-dark">{conversation.status}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-telegram-blue hover:bg-telegram-blue-light rounded-full">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-telegram-blue hover:bg-telegram-blue-light rounded-full">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-telegram-blue hover:bg-telegram-blue-light rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-telegram-blue hover:bg-telegram-blue-light rounded-full">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        {conversation.messages.map((message) => (
          <MessageBubble
            key={message.id}
            content={message.content}
            time={message.time}
            isOutgoing={message.isOutgoing}
            status={message.status}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput
        onSendMessage={(content) => onSendMessage(conversation.id, content)}
      />
    </div>
  );
};

export default ChatArea;
