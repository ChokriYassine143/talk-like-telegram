
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ConversationItem from './ConversationItem';
import { Input } from "@/components/ui/input";

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
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 bg-telegram-gray-light border-none focus-visible:ring-1 focus-visible:ring-telegram-blue"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filteredConversations.map((conversation) => (
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
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
