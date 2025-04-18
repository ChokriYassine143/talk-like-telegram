import React, { useState } from 'react';
import ChatSidebar from '@/components/ChatSidebar';
import ChatArea from '@/components/ChatArea';

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
  lastMessage: string;
  time: string;
  unread: number;
  status: string;
  messages: Message[];
}

const initialConversations: Conversation[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'See you tomorrow!',
    time: '10:30 PM',
    unread: 2,
    status: 'online',
    messages: [
      {
        id: '101',
        content: 'Hey, how are you?',
        time: '10:00 PM',
        isOutgoing: false,
      },
      {
        id: '102',
        content: 'I\'m doing great! How about you?',
        time: '10:05 PM',
        isOutgoing: true,
        status: 'read',
      },
      {
        id: '103',
        content: 'Pretty good. Want to grab lunch tomorrow?',
        time: '10:15 PM',
        isOutgoing: false,
      },
      {
        id: '104',
        content: 'Sure, that sounds good!',
        time: '10:20 PM',
        isOutgoing: true,
        status: 'read',
      },
      {
        id: '105',
        content: 'Great! Meet at the usual place at 1?',
        time: '10:25 PM',
        isOutgoing: false,
      },
      {
        id: '106',
        content: 'See you tomorrow!',
        time: '10:30 PM',
        isOutgoing: true,
        status: 'read',
      },
    ],
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'Did you see the latest episode?',
    time: '9:15 PM',
    unread: 0,
    status: 'last seen 30 minutes ago',
    messages: [
      {
        id: '201',
        content: 'Have you watched the new series on Netflix?',
        time: '9:00 PM',
        isOutgoing: false,
      },
      {
        id: '202',
        content: 'Not yet, is it good?',
        time: '9:05 PM',
        isOutgoing: true,
        status: 'read',
      },
      {
        id: '203',
        content: 'It\'s amazing! You should definitely check it out.',
        time: '9:10 PM',
        isOutgoing: false,
      },
      {
        id: '204',
        content: 'Did you see the latest episode?',
        time: '9:15 PM',
        isOutgoing: false,
      },
    ],
  },
  {
    id: '3',
    name: 'Tech Group',
    avatar: 'https://i.pravatar.cc/150?img=8',
    lastMessage: 'Alice: Check out this new framework!',
    time: '2:45 PM',
    unread: 5,
    status: 'members 25, online 3',
    messages: [
      {
        id: '301',
        content: 'Bob: Has anyone tried the new React update?',
        time: '2:30 PM',
        isOutgoing: false,
      },
      {
        id: '302',
        content: 'I\'ve been using it for a week now. It\'s great!',
        time: '2:35 PM',
        isOutgoing: true,
        status: 'read',
      },
      {
        id: '303',
        content: 'Charlie: What features do you like most?',
        time: '2:40 PM',
        isOutgoing: false,
      },
      {
        id: '304',
        content: 'Alice: Check out this new framework!',
        time: '2:45 PM',
        isOutgoing: false,
      },
    ],
  },
  {
    id: '4',
    name: 'Mark Wilson',
    avatar: 'https://i.pravatar.cc/150?img=11',
    lastMessage: 'Thanks for your help!',
    time: 'Yesterday',
    unread: 0,
    status: 'last seen yesterday at 11:30 PM',
    messages: [
      {
        id: '401',
        content: 'Hey, could you help me with something?',
        time: '11:00 PM',
        isOutgoing: false,
      },
      {
        id: '402',
        content: 'Sure, what do you need?',
        time: '11:05 PM',
        isOutgoing: true,
        status: 'read',
      },
      {
        id: '403',
        content: 'I\'m trying to figure out this coding problem...',
        time: '11:10 PM',
        isOutgoing: false,
      },
      {
        id: '404',
        content: 'Have you tried looking at Stack Overflow?',
        time: '11:15 PM',
        isOutgoing: true,
        status: 'read',
      },
      {
        id: '405',
        content: 'I found the solution! It was a silly mistake.',
        time: '11:25 PM',
        isOutgoing: false,
      },
      {
        id: '406',
        content: 'Thanks for your help!',
        time: '11:30 PM',
        isOutgoing: false,
      },
    ],
  },
  {
    id: '5',
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=20',
    lastMessage: 'The documents are ready for review',
    time: '4/9/24',
    unread: 0,
    status: 'online',
    messages: [
      {
        id: '501',
        content: 'Hi, I\'ve finished the project reports',
        time: '3:00 PM',
        isOutgoing: false,
      },
      {
        id: '502',
        content: 'Great! How does everything look?',
        time: '3:10 PM',
        isOutgoing: true,
        status: 'read',
      },
      {
        id: '503',
        content: 'We\'re on track with all milestones. I\'ll send you the documents.',
        time: '3:15 PM',
        isOutgoing: false,
      },
      {
        id: '504',
        content: 'The documents are ready for review',
        time: '3:30 PM',
        isOutgoing: false,
      },
    ],
  },
];

const Index = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const activeConversation = activeConversationId
    ? conversations.find(conv => conv.id === activeConversationId) || null
    : null;

  const handleConversationSelect = (id: string) => {
    setActiveConversationId(id);
    
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id 
          ? { ...conv, unread: 0 } 
          : conv
      )
    );
  };

  const handleSendMessage = (conversationId: string, content: string) => {
    const now = new Date();
    const timeString = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      content,
      time: timeString,
      isOutgoing: true,
      status: 'sent' as const,
    };
    
    setConversations(prev => 
      prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: content,
            time: timeString,
          };
        }
        return conv;
      })
    );
    
    if (Math.random() > 0.5) {
      setTimeout(() => {
        setConversations(prev => 
          prev.map(conv => {
            if (conv.id === conversationId) {
              return {
                ...conv,
                messages: conv.messages.map(msg => 
                  msg.id === newMessage.id 
                    ? { ...msg, status: 'delivered' as const } 
                    : msg
                ),
              };
            }
            return conv;
          })
        );
        
        setTimeout(() => {
          const responses = [
            "That's interesting!",
            "Tell me more about it.",
            "I see what you mean.",
            "That's awesome!",
            "Thanks for sharing.",
            "I'll get back to you on that.",
            "Let me think about it.",
            "Cool!",
            "Nice!",
            "👍",
            "😊",
          ];
          
          const responseContent = responses[Math.floor(Math.random() * responses.length)];
          const responseTime = `${now.getHours()}:${String(now.getMinutes() + 1).padStart(2, '0')}`;
          
          const responseMessage = {
            id: `msg-${Date.now()}`,
            content: responseContent,
            time: responseTime,
            isOutgoing: false,
          };
          
          setConversations(prev => 
            prev.map(conv => {
              if (conv.id === conversationId) {
                const updatedMessages = conv.messages.map(msg => 
                  msg.id === newMessage.id 
                    ? { ...msg, status: 'read' as const } 
                    : msg
                );
                
                return {
                  ...conv,
                  messages: [...updatedMessages, responseMessage],
                  lastMessage: responseContent,
                  time: responseTime,
                  unread: activeConversationId === conversationId ? 0 : 1,
                };
              }
              return conv;
            })
          );
        }, 1000);
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <div className="w-full md:w-80 lg:w-96 h-full flex-shrink-0 shadow-md border-r border-gray-200 z-10">
        <ChatSidebar
          conversations={conversations}
          activeConversation={activeConversationId}
          onConversationSelect={handleConversationSelect}
        />
      </div>
      <div className="flex-1 h-full relative">
        <ChatArea
          conversation={activeConversation}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Index;
