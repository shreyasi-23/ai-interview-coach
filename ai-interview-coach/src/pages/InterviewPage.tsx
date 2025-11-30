import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import type { Message } from '../../../shared/types/message';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

const InterviewPage: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [improvements, setImprovements] = useState<string[]>([]);
  const [isInterviewEnded, setIsInterviewEnded] = useState(false);
  const secondsRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isInterviewEnded) return; // Stop timer when interview ends

    const timerId = setInterval(() => {
      setSeconds((s) => {
        const newValue = s + 1;
        secondsRef.current = newValue;
        return newValue;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [isInterviewEnded]);

  // Fetch initial welcome message
  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const result = await axios.post(`${BACKEND_URL}/coach/generate-response`, {
          message: 'Start the interview',
          history: []
        });
        setMessages([{ id: 1, role: 'coach', text: result.data.response, time: '00:00' }]);
      } catch (error) {
        console.error('Error fetching welcome message:', error);
      }
    };
    fetchWelcomeMessage();
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

  const handleSubmit = async () => {
    if (!input.trim() || isLoading || isInterviewEnded) return;

    const userText = input.trim();
    const history = messages; // stores history before adding new message

    setMessages((m) => [...m, { id: m.length + 1, role: "user", text: userText, time: formatTime(secondsRef.current) }]);
    setInput('');
    setIsLoading(true);

    try {
      // Call backend API with message and conversation history
      const result = await axios.post(`${BACKEND_URL}/coach/generate-response`, {
        message: userText,
        history
      });

      setMessages((m) => [...m, { id: m.length + 1, role: "coach", text: result.data.response, time: formatTime(secondsRef.current) }]);
      setImprovements(result.data.improvements || []);

      // Check if coach decided to end the interview
      if (result.data.shouldEnd) {
        // Delay showing results to let user see the final message
        setTimeout(() => {
          setIsInterviewEnded(true);
        }, 5000); // 5 second delay
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((m) => [...m, { id: m.length + 1, role: 'coach', text: 'Sorry, I encountered an error. Please try again.', time: formatTime(seconds) }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndInterview = async () => {
    setIsLoading(true);
    try {
      // Request final feedback from the coach
      const result = await axios.post(`${BACKEND_URL}/coach/generate-response`, {
        message: 'End the interview and provide final feedback',
        history: messages
      });

      // Update improvements with final feedback
      setImprovements(result.data.improvements || []);

      // Add final coach message if provided
      if (result.data.response) {
        setMessages((m) => [...m, { id: m.length + 1, role: "coach", text: result.data.response, time: formatTime(secondsRef.current) }]);
      }

      // Delay showing results to let user see the final message
      setTimeout(() => {
        setIsInterviewEnded(true);
      }, 3000);
    } catch (error) {
      console.error('Error getting final feedback:', error);
      // End interview even if feedback fails
      setIsInterviewEnded(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Show results screen when interview ends
  if (isInterviewEnded) {
    const userMessageCount = messages.filter(m => m.role === 'user').length;

    return (
      <div className="h-screen flex items-center justify-center bg-white pt-16">
        <div className="max-w-6xl w-full p-8 bg-[#E8D9CD] rounded-lg text-[#523D35]">
          <h1 className="text-3xl font-bold mb-6">Interview Complete!</h1>

          <div className="space-y-4 mb-6">
            <div>
              <p className="font-semibold">Total Time:</p>
              <p className="text-2xl font-mono">{formatTime(seconds)}</p>
            </div>

            <div>
              <p className="font-semibold">Questions Answered:</p>
              <p className="text-2xl">{userMessageCount}</p>
            </div>

            <div>
              <p className="font-semibold mb-2">Feedback:</p>
              <p className="text-base leading-relaxed bg-white p-4 rounded">{improvements[0]}</p>
            </div>

            <div>
              <p className="font-semibold">Key Improvements:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {improvements.length > 1 ? (
                  improvements.slice(1).map((improvement, index) => (
                    <li key={index}>{improvement}</li>
                  ))
                ) : (
                  <li>Keep practicing!</li>
                )}
              </ul>
            </div>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full mt-3 text-white border-2 border-black py-3 rounded bg-[#BBA58F] hover:bg-[#523D35] transition-colors"
          >
            Start New Interview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-white pt-16 overflow-hidden">
      {/* Left side panel */}
      <div className="fixed top-16 bottom-0 left-0 h-[calc(100vh-64px)] w-[300px] bg-[#E8D9CD] text-[#523D35] p-6 flex flex-col">
        <p>timer</p>
        <p className="font-mono mt-1">{formatTime(seconds)}</p>

        <hr className="my-4 border-[#523D35]" />

        <p>potential improvements</p>
        <ul className="list-disc list-inside mt-2 flex-1 overflow-y-auto">
          {improvements.length > 0 ? (
            improvements.map((improvement, index) => (
              <li key={index}>{improvement}</li>
            ))
          ) : (
            <li className="opacity-60">Start answering to see tips</li>
          )}
        </ul>

        <button
          onClick={handleEndInterview}
          className="w-full mt-3 text-white border-2 border-black py-3 bg-[#BBA58F] rounded hover:bg-[#523D35] transition-colors"
        >
          End Interview
        </button>
      </div>

      {/* Main interview area */}
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
            disabled={isLoading}
            className="w-full mt-3 text-white border-2 border-black py-3 rounded transition-colors"
            style={{ cursor: isLoading ? 'not-allowed' : 'pointer', backgroundColor: isLoading ? '#888' : '#BBA58F' }}
            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#523D35')}
            onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#BBA58F')}
          >
            {isLoading ? 'Coach is thinking...' : 'SUBMIT ANSWER!'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;