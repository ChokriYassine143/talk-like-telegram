
import React, { useState } from 'react';
import { Search, MenuSquare, Plus } from 'lucide-react';
import ConversationItem from './ConversationItem';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversation: string | null;
  onConversationSelect: (id: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  conversations,
  activeConversation,
  onConversationSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredConversations = searchQuery 
    ? conversations.filter(conv => 
        conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  return (
    <div className="flex flex-col h-full border-r border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <MenuSquare className="h-5 w-5 text-telegram-blue" />
        </Button>
        <div className="relative flex-1 mx-2">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 bg-telegram-gray-light border-none focus-visible:ring-1 focus-visible:ring-telegram-blue transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Plus className="h-5 w-5 text-telegram-blue" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              id={conversation.id}
              name={conversation.name}
              avatar={conversation.avatar}
              lastMessage={conversation.lastMessage}
              time={conversation.time}
              unread={conversation.unread}
              active={activeConversation === conversation.id}
              onClick={onConversationSelect}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500 p-4 text-center">
            <p>No conversations found</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
