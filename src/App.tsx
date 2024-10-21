import React, { useState, useRef, useEffect } from 'react';
import { Upload, Send, Image as ImageIcon } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import ImagePreview from './components/ImagePreview';
import { recognizeImage } from './utils/imageRecognition';

function App() {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' && !image) return;

    const newMessages = [...messages, { text: input, isUser: true }];
    setMessages(newMessages);
    setInput('');

    if (image) {
      setIsProcessing(true);
      try {
        const recognition = await recognizeImage(image);
        setMessages([...newMessages, { text: recognition, isUser: false }]);
      } catch (error) {
        setMessages([...newMessages, { text: 'Sorry, I couldn\'t process that image.', isUser: false }]);
      }
      setIsProcessing(false);
      setImage(null);
    } else {
      // Simple chatbot response (replace with more sophisticated logic if needed)
      setTimeout(() => {
        setMessages([...newMessages, { text: 'I\'m an image recognition bot. Please upload an image for me to analyze!', isUser: false }]);
      }, 500);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Image Recognition Chatbot</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} text={message.text} isUser={message.isUser} />
        ))}
        {image && <ImagePreview src={image} />}
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <label htmlFor="imageUpload" className="cursor-pointer">
            <Upload className="w-6 h-6 text-blue-600" />
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isProcessing}
            />
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isProcessing}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            disabled={isProcessing}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;