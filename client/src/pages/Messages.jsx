import { useState } from 'react';
import { FiSend, FiUser } from 'react-icons/fi';

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [reply, setReply] = useState('');

  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'John Smith',
      company: 'Acme Inc',
      messages: [
        {
          sender: 'client',
          text: 'Hi, I would like pricing information.'
        },
        {
          sender: 'me',
          text: 'Sure, what package are you interested in?'
        }
      ]
    },
    {
      id: 2,
      name: 'Sarah Jones',
      company: 'Stripe',
      messages: [
        {
          sender: 'client',
          text: 'Can we schedule a demo?'
        }
      ]
    },
    {
      id: 3,
      name: 'Michael Brown',
      company: 'Microsoft',
      messages: [
        {
          sender: 'client',
          text: 'We are interested in your CRM solution.'
        }
      ]
    }
  ]);

  const sendReply = () => {
    if (!reply.trim()) return;

    const updated = [...conversations];

    updated[selectedChat].messages.push({
      sender: 'me',
      text: reply
    });

    setConversations(updated);
    setReply('');
  };

  return (
    <div className="h-[80vh] grid grid-cols-12 gap-4">

      {/* Left Sidebar */}
      <div className="col-span-3 glass overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h1 className="text-2xl font-bold">
            Messages
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Customer Conversations
          </p>
        </div>

        <div className="overflow-y-auto h-full">

          {conversations.map((chat, index) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(index)}
              className={`w-full text-left p-4 border-b border-white/5 transition ${
                selectedChat === index
                  ? 'bg-purple-500/10 border-l-4 border-l-purple-500'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <FiUser />
                </div>

                <div>
                  <p className="font-medium">
                    {chat.name}
                  </p>

                  <p className="text-xs text-gray-400">
                    {chat.company}
                  </p>
                </div>

              </div>
            </button>
          ))}

        </div>
      </div>

      {/* Right Chat Area */}
      <div className="col-span-9 glass flex flex-col">

        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <h2 className="font-semibold text-lg">
            {conversations[selectedChat].name}
          </h2>

          <p className="text-sm text-gray-400">
            {conversations[selectedChat].company}
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {conversations[selectedChat].messages.map(
            (message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'me'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === 'me'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            )
          )}

        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10">

          <div className="flex gap-3">

            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendReply();
                }
              }}
              placeholder="Type a message..."
              className="
                flex-1
                bg-white/5
                border
                border-white/10
                rounded-xl
                px-4
                py-3
                outline-none
              "
            />

            <button
              onClick={sendReply}
              className="
                px-5
                py-3
                bg-gradient-blue-purple
                rounded-xl
                hover:opacity-90
                transition
              "
            >
              <FiSend size={18} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}