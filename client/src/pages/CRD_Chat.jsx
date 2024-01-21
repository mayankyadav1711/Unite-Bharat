
import React, { useState, useRef, useEffect } from 'react';
import PollContainer from './CRD_Poll.jsx';




const CRD_Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [showPoll, setShowPoll] = useState(false); 
  const [selectedFileName, setSelectedFileName] = useState(""); // New state to track the selected file name
  
  const [pollData, setPollData] = useState(null);
 
  const [messages, setMessages] = useState([
    { sender: "A", text: "Hey team, let's discuss our web development project!" },
    { sender: "B", text: "Sure! I've been working on the frontend design. Check out the latest mockups." },
    { sender: "A", text: "Looks great! Let's also discuss the backend implementation." },
    { sender: "B", text: "Absolutely! I've started working on setting up the database and API endpoints." },
  ]);

  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handlePollIconClick = () => {
    setShowPoll(!showPoll);
  };

  const handlePollSubmit = (pollData) => {
    const newMessageObj = { sender: "You", type: "poll", text: "", poll: pollData };
    setMessages([...messages, newMessageObj]);
    setShowPoll(false);
    setPollData(pollData);
  };

  
  const handleSendMessage = () => {
    if (newMessage.trim() !== "" || attachment) {
      const newMessageObj = { sender: "You", text: newMessage };

      if (attachment) {
        newMessageObj.attachment = {
          name: attachment.name,
          size: attachment.size,
          type: attachment.type,
        };
        setSelectedFileName("");
      }

      if (pollData) {
        newMessageObj.poll = pollData;
        setPollData(null);
      }

      setMessages([...messages, newMessageObj]);
      setNewMessage("");
      setAttachment(null);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
    setSelectedFileName(file.name);
  };

  return (
    <>
    <div className="flex h-screen antialiased text-gray-800">
    <div className="flex flex-row h-full w-full overflow-x-hidden">
    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-orange-50 flex-shrink-0">
      <div className="flex flex-row items-center justify-center h-12 w-full">
        <div
          className="flex items-center justify-center rounded-2xl text-orange-700 bg-orange-100 h-10 w-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            ></path>
          </svg>
        </div>
        <div className="ml-2 font-bold text-2xl"></div>
      </div>
      <div
        className="flex flex-col items-center bg-orange-100 border border-orange-200 mt-4 w-full py-6 px-4 rounded-lg"
      >
        <div className="h-20 w-20 rounded-full border overflow-hidden">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/studymate-c44e8.appspot.com/o/Asset%201.svg?alt=media&token=34b9cc2f-888a-4590-83c5-72fbc1abc179"
            alt="Avatar"
            className="h-full w-full"
          />
        </div>
        <div className="text-sm font-semibold mt-2">Sankalp</div>
        <div className="text-xs text-gray-500">Web Development</div>
        <div className="flex flex-row items-center mt-3">
          <div
            className="flex flex-col justify-center h-4 w-8 bg-orange-500 rounded-full"
          >
            <div className="h-3 w-3 bg-orange-50 rounded-full self-end mr-1"></div>
          </div>
          <div className="leading-none ml-1 text-xs">In Progress</div>
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Team Members</span>
          <span
            className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
          >
            8
          </span>
        </div>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
          {["Mayank Yadav", "Darshit Sojitra", "Vihar Talaviya", "Harsh Sonaiya", "Divya Kaurani", "Aastha Suthar", "Gaurav Tiwari", "Mit Patel"].map((member, index) => (
            <button
              key={index}
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            >
              <div
                className="flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full"
              >
                {member.charAt(0)}
              </div>
              <div className="ml-2 text-sm font-semibold">{member}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col flex-auto h-full p-6">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-orange-100 h-full p-4">
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-12 gap-y-2">
                {messages.map((message, index) => (
                  <div key={index} className={`col-start-1 col-end-13 p-3`}>
                    <div className={`flex ${message.sender === "You" ? "flex-row-reverse" : "flex-row"} items-center`}>
                      <div className={`flex items-center justify-center h-10 w-10 rounded-full bg-orange-500 flex-shrink-0`}>
                        {message.sender}
                      </div>
                      <div className={`relative ${message.sender === "You" ? "mr-3" : "ml-3"} text-sm bg-${message.sender === "You" ? "indigo-100" : "white"} py-2 px-4 shadow rounded-xl`}>
                        {message.text && <div>{message.text}</div>}
                        {message.attachment && (
                          <div>
                            <div>{message.attachment.name}</div>
                            <div>{message.attachment.size} bytes</div>
                            <div>Type: {message.attachment.type}</div>
                          </div>
                        )}
                        {message.type === "poll" && (
                          <div>
                            <div>Poll Question: {message.poll.question}</div>
                            <div>Options:</div>
                            <ul>
                              {message.poll.options.map((option, optionIndex) => (
                                <li key={optionIndex}>{option}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef}></div>
              </div>
            </div>
          </div>
           
          <div className="chatbox-input" style={{backgroundColor:'#fff7ed',borderBottomRightRadius:'20px',borderTopRightRadius:'20px',borderRadius:'none'}}>
      <i className="fa-regular fa-face-grin" onClick={handlePollIconClick}></i>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
          <i className="fa-sharp fa-solid fa-paperclip" style={{ fontSize: '24px', color: '#333' }}></i>
        </label>
        {selectedFileName && <span style={{ marginLeft: '8px', fontSize: '14px', color: '#333' }}>{selectedFileName}</span>}
        <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileInputChange} />
      </div>
      <input type="text" placeholder="Type a message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button style={{ marginLeft: '8px', background: '#f97316', color: '#fff', padding: '20px 12px', width:'100px', borderTopRightRadius:'20px',borderBottomRightRadius:'20px', cursor: 'pointer' }} onClick={handleSendMessage}>Send</button>
    </div>
    {showPoll && <PollContainer onSubmit={handlePollSubmit} />}
  
  
  

          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CRD_Chat;
