import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start space-x-2 max-w-3/4 ${isUser ? 'flex-row-reverse' : ''}`}>
        <div className={`rounded-full p-2 ${isUser ? 'bg-blue-600' : 'bg-gray-300'}`}>
          {isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-gray-600" />}
        </div>
        <div className={`rounded-lg p-3 ${isUser ? 'bg-blue-100' : 'bg-white'}`}>
          <p className={`text-sm ${isUser ? 'text-blue-800' : 'text-gray-800'}`}>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;