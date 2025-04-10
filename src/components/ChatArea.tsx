
import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Video, Search, MoreVertical, Info } from 'lucide-react';
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
      <div className="flex-1 flex items-center justify-center bg-[#F4F7F9]">
        <div className="text-center text-gray-500 animate-fade-in">
          <div className="flex justify-center mb-4">
            <Avatar className="h-16 w-16 bg-telegram-blue-light text-telegram-blue">
              <Info className="h-8 w-8" />
            </Avatar>
          </div>
          <p className="text-xl font-medium">Select a conversation</p>
          <p className="mt-2">Choose from your existing conversations or start a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F4F7F9]">
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 transition-all duration-200 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
          <Avatar className="h-10 w-10 ring-2 ring-offset-2 ring-telegram-blue-light">
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
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-telegram-blue hover:bg-telegram-blue-light rounded-full transition-colors duration-200">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-telegram-blue hover:bg-telegram-blue-light rounded-full transition-colors duration-200">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-telegram-blue hover:bg-telegram-blue-light rounded-full transition-colors duration-200">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-telegram-blue hover:bg-telegram-blue-light rounded-full transition-colors duration-200">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin bg-[url('https://i.imgur.com/LMtQywO.png')] bg-repeat bg-center">
        <div className="space-y-2 py-2">
          {conversation.messages.map((message) => (
            <MessageBubble
              key={message.id}
              content={message.content}
              time={message.time}
              isOutgoing={message.isOutgoing}
              status={message.status}
            />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput
        onSendMessage={(content) => onSendMessage(conversation.id, content)}
      />
    </div>
  );
};

export default ChatArea;
