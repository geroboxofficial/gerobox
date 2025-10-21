import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'Penjual A', content: 'Hai! Produk ini masih ada?', timestamp: '10:00 AM' },
    { id: '2', sender: 'Anda', content: 'Ya, masih ada. Berminat?', timestamp: '10:05 AM' },
    { id: '3', sender: 'Penjual A', content: 'Berapa harga terbaik boleh bagi?', timestamp: '10:10 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [currentChatPartner, setCurrentChatPartner] = useState('Penjual A'); // Example

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: String(messages.length + 1),
        sender: 'Anda', // This would be dynamic in a real app
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Chat</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Chat List (Placeholder) */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Perbualan Anda
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-md hover:bg-accent cursor-pointer bg-accent">
                <img src="https://via.placeholder.com/40x40?text=PA" alt="Penjual A" className="h-10 w-10 rounded-full" />
                <div>
                  <h4 className="font-medium">{currentChatPartner}</h4>
                  <p className="text-sm text-muted-foreground truncate">Berapa harga terbaik boleh bagi?</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-md hover:bg-accent cursor-pointer">
                <img src="https://via.placeholder.com/40x40?text=PB" alt="Pembeli B" className="h-10 w-10 rounded-full" />
                <div>
                  <h4 className="font-medium">Pembeli B</h4>
                  <p className="text-sm text-muted-foreground truncate">Produk masih ada?</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="md:col-span-2 flex flex-col h-[600px]">
            <CardHeader className="border-b">
              <CardTitle className="text-xl">{currentChatPartner}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'Anda' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          msg.sender === 'Anda'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <span className="text-xs opacity-70 mt-1 block text-right">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex items-center gap-2 mt-4 border-t pt-4">
                <Input
                  placeholder="Taip mesej anda..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Hantar</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatPage;