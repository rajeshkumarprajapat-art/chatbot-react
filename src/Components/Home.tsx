import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import logo from '../assets/Logo.svg'

interface Message {
  id: number
  text: string
  isUser: boolean
  questionNumber?: number
  isTyping?: boolean
}

export function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [questionCounter, setQuestionCounter] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [typingText, setTypingText] = useState('')
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleCopy = async (messageId: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
  
    const newMessage: Message = {
      id: Date.now(),
      text: input,
      isUser: true,
      questionNumber: questionCounter + 1
    }

    setMessages(prev => [...prev, newMessage])
    setQuestionCounter(prev => prev + 1)
    const userInput = input
    setInput('')
    setIsLoading(true)

    try {
      const response = await axios.post('http://localhost:3000/api/chat', {
        question: userInput
      })

      console.log('Resp -- ' + JSON.stringify(response));
      
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: '',
        isUser: false,
        isTyping: true
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
      
      // Typewriter effect
      const fullText = response.data.answer || "Sorry, I couldn't process your request."
      let currentIndex = 0
      
      const typeInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === aiResponse.id 
                ? { ...msg, text: fullText.substring(0, currentIndex + 1) }
                : msg
            )
          )
          currentIndex++
        } else {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === aiResponse.id 
                ? { ...msg, isTyping: false }
                : msg
            )
          )
          clearInterval(typeInterval)
        }
      }, 30)
    } catch (error) {
      console.error('API Error:', error)
      const errorResponse: Message = {
        id: Date.now() + 1,
        text: "Sorry, there was an error connecting to the server.",
        isUser: false
      }
      setMessages(prev => [...prev, errorResponse])
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50 fixed inset-0">

      <div className="w-64 from-gray-900 to-gray-800 flex flex-col shadow-xl">

        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ChatBot AI" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="flex-1 px-3 pb-3">
          {/* <div className="text-xs text-gray-400 mb-2 px-3 font-medium">Recent</div>
          <div className="space-y-1">

          </div> */}
        </div>
      </div>

      <div className="w-8"></div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-center items-center p-4 border-b border-gray-200">
          <nav className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border border-gray-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium text-gray-700" style={{padding: '10px'}}>About</button>
            <button className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border border-gray-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium text-gray-700" style={{padding: '10px'}}>Features</button>
            <button className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border border-gray-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium text-gray-700" style={{padding: '10px'}}>Learn</button>
            <button className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border border-gray-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium text-gray-700" style={{padding: '10px'}}>Business</button>
            <button className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border border-gray-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium text-gray-700" style={{padding: '10px'}}>Pricing</button>
          </nav>
          <div className="absolute right-4 flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md">
             <img src={logo} alt="ChatBot AI" className="w-full h-full object-contain" style={{width: '100px'}}/>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">How can I help you today?</h1>
              <p className="text-gray-500 text-lg">Start a conversation and explore AI possibilities</p>
              <div className="grid grid-cols-2 gap-3 mt-8 max-w-sm mx-auto">
                <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100">
                  <div className="text-2xl mb-2">💡</div>
                  <div className="text-sm font-medium text-gray-700">Creative Ideas</div>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100">
                  <div className="text-2xl mb-2">🔍</div>
                  <div className="text-sm font-medium text-gray-700">Research Help</div>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100">
                  <div className="text-2xl mb-2">📝</div>
                  <div className="text-sm font-medium text-gray-700">Writing</div>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-sm font-medium text-gray-700">Problem Solving</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto bg-white">
            <div className="max-w-4xl mx-auto px-6">
              {messages.map((message) => (
                <div key={message.id} className="py-12 border-b border-gray-100 last:border-b-0">
                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm">
                      {message.isUser ? (
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                          {message.questionNumber}
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className={`flex-1 leading-relaxed text-lg text-left ${
                      message.isUser ? 'text-gray-800 font-bold' : 'text-gray-800'
                    }`}>
                      <div className="group relative">
                        {message.text}
                        {message.isTyping && <span className="animate-pulse">|</span>}
                        {!message.isUser && !message.isTyping && (
                          <button 
                            onClick={() => handleCopy(message.id, message.text)}
                            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
                            title="Copy response"
                          >
                            {copiedMessageId === message.id ? (
                              <span className="text-xs text-green-600 font-medium">Copied!</span>
                            ) : (
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="py-12 border-b border-gray-100">
                  <div className="flex gap-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div className="flex-1 leading-relaxed text-lg text-left text-gray-800">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                        <div className="animate-pulse">Thinking...</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        <div className="p-6 border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="relative flex items-center bg-white border-2 border-gray-200 rounded-3xl shadow-lg focus-within:border-blue-400 focus-within:shadow-xl transition-all duration-300" style={{ marginBottom: '20px', marginTop: '10px' }}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder="Type your message here..."
                rows={1}
                className="flex-1 resize-none px-6 bg-transparent focus:outline-none placeholder-gray-400 max-h-32 overflow-y-auto text-lg text-left"
                style={{ minHeight: '95px', lineHeight: '56px', paddingTop: '0', paddingBottom: '0', marginLeft: '10px' }}
              />

              <button className="absolute bottom-1 left-4 flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border border-gray-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md" style={{padding: '10px'}}>
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Attach</span>
              </button>

              <button className="absolute bottom-1 left-32 flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border border-gray-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md" style={{padding: '10px'}}>
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Search</span>
              </button>

              <button className="absolute bottom-1 left-60 flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border border-gray-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md" style={{padding: '10px'}}>
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 10v1a7 7 0 0 1-14 0v-1" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 22h8" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Voice</span>
              </button>

              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className={`m-3 p-3 rounded-2xl mr-2 transition-all duration-200 ${
                  input.trim() 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              style={{marginRight: '10px'}}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2 mb-4" style={{paddingBottom: '10px'}}>Coregenx AI can make mistakes. Please verify important information.</p>
          </div>
        </div>
      </div>
    </div>
  )
}