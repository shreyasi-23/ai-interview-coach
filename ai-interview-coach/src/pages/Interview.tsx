import { useEffect, useRef, useState } from 'react';

type Message = {
  id: number;
  role: 'coach' | 'user';
  text: string;
  time?: string;
};

const Interview: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'coach', text: 'Welcome — tell me about a challenging bug you fixed.', time: '00:00' },
    { id: 2, role: 'user', text: 'I fixed a race condition in our deployment pipeline.', time: '00:12' },
    { id: 3, role: 'coach', text: 'Great. How did you identify the root cause?', time: '00:25' },
  ]);

  const [seconds, setSeconds] = useState(0);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timerId = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    // scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (s: number) => {
    const mm = Math.floor(s / 60)
      .toString()
      .padStart(2, '0');
    const ss = (s % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const handleSubmit = () => {
    if (!input.trim()) return; // ignore empty input
    const id = messages.length + 1;
    const newMsg: Message = { id, role: 'user', text: input.trim(), time: formatTime(seconds) };
    setMessages((m) => [...m, newMsg]);
    setInput('');

    // simulated coach reply after 2000 ms
    setTimeout(() => {
      setMessages((m) => [...m, { id: m.length + 1, role: 'coach', text: 'Thanks — can you expand on that?', time: formatTime(seconds + 2) }]);
    }, 2000);
  };

  return (
    <div className="h-screen flex bg-white pt-16 overflow-hidden">
      {/* Left side panel */}
      <div className="fixed top-16 bottom-0 left-0 h-[calc(100vh-64px)] w-[300px] bg-[#E8D9CD] text-[#523D35] p-6 flex flex-col">
        <p>timer</p>
        <p className="font-mono mt-1">{formatTime(seconds)}</p>

        <hr className="my-4 border-[#523D35]" />

        <p>potential improvements</p>
        <ul className="list-disc list-inside mt-2">
          <li>Be concise</li>
          <li>Show trade-offs</li>
          <li>Discuss alternatives</li>
        </ul>
      </div>

      {/* Main interview area (accounting for sidebar) */}
      <div className="ml-72 flex flex-col flex-1">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 text-[#523D35]">
          {messages.map((m) => (
            <div key={m.id} className="mb-4">
              <div className="text-xs opacity-80">{m.role === 'coach' ? 'Coach' : 'You'} • {m.time}</div>
              <div className="mt-2">{m.text}</div>
            </div>
          ))}
        </div>

        {/* Input area fixed at bottom of the main column */}
        <div className="p-6 border-t border-gray-300">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // blocks default behaviour (adding a newline)
                handleSubmit();
              }
            }}
            placeholder="Type your answer..."
            className="w-full min-h-[80px] border-2 border-black p-3 rounded"
          />

          <button
            onClick={handleSubmit}
            className="w-full mt-3 text-white border-2 border-black py-3 rounded transition-colors"
            style={{ cursor: 'pointer', backgroundColor: '#BBA58F' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#523D35')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#BBA58F')}
          >
            SUBMIT ANSWER!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interview;