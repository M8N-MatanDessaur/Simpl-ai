import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { BeatLoader } from 'react-spinners';

import simpl from "../logo.png";

// Functional Component
export default function ChatBot() {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([{ by: null, text: null }]);
  const lastMessageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const introduction = 'your name is "simpl" (s,i,m,p,l) and you are an ai assistant designed to answer the user\'s questions. Introduce yourself in 128 characters max';
    fetchAiData(introduction);
  }, []);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  }, [conversation]);

  const fetchAiData = async (inputData, historyData) => {
    setLoading(true);

    const endpoint = `.netlify/functions/aichat?input=${inputData}${historyData ? `&history=${encodeURIComponent(historyData)}` : ''}`;

    try {
      const { data } = await axios.get(endpoint);
      const message = data && data.output ? data.output : '🫢 Something happened, try again';
      addMessageToConversation('ai', message);
    } catch (error) {
      console.error("Error:", error);
      addMessageToConversation('ai', "🫢 Something happened, try again");
    } finally {
      setLoading(false);
    }
  };

  const addMessageToConversation = (by, text) => {
    setConversation(prevConversation => [...prevConversation, { by, text }]);
  };

  const handleSend = (event) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    addMessageToConversation('user', userInput);
    const conversationHistory = conversation.map(message => `${message.by === 'ai' ? 'AI' : 'User'}: ${message.text}`).join('\n');
    fetchAiData(userInput, conversationHistory);
    setUserInput('');
  };

  return (
    <ChatContainer>
      <TextView>
        {conversation.map((message, index) => (
          <MessageRef key={`${message.by}-${index}`} ref={index === conversation.length - 1 ? lastMessageRef : null}>
            {message.by === 'ai' && message.text && <AiText><SimplImg src={simpl} alt="simpl" /><p>{message.text}</p></AiText>}
            {message.by === 'user' && <UserText><p>{message.text}</p></UserText>}
          </MessageRef>
        ))}
        {loading && <BeatLoader color={"#442f70"} loading={loading} size={8} />}
      </TextView>
      <UserInput onSubmit={handleSend}>
        <UserInputText value={userInput} onChange={e => setUserInput(e.target.value)} />
        <SendButton type="submit">
          <svg fill="none" stroke="#FFFFFFF0" height="100%" width="100%" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.912 12H4L2.023 4.135A.662.662 0 0 1 2 3.995c-.022-.721.772-1.221 1.46-.891L22 12 3.46 20.896c-.68.327-1.464-.159-1.46-.867a.66.66 0 0 1 .033-.186L3.5 15"></path>
          </svg>
        </SendButton>
      </UserInput>
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 2px solid #d331e0;
  box-shadow: 0 0 50px #d331e080;
  border-radius: 10px;
  padding: 5px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media (max-width: 480px) {
    border-radius: 0;
    box-shadow: none;
    border: none;
  }
 
`;

const TextView = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #FFFFFF10;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #FFFFFF30;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #FFFFFF50;
  }
`;

const UserInput = styled.form`
  position: static;
  width: 100%;
  height: 60px;
  margin: 10px;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const UserInputText = styled.input`
  width: 80%;
  height: inherit;
  border: none;
  border-radius: 12px;
  padding: 0 10px;
  background-color: #44297080;
  color: #FFFFFF;
  font-size: 1.2rem;
  font-weight: 500;
  outline: none;

  &::placeholder {
    color: #FFFFFF80;
  }

  &:focus {
    background-color: #442970;
  }
`;

const SendButton = styled.button`
  width: 20%;
  height: inherit;
  border: none;
  border-radius: 12px;
  background-color: #44297080;
  color: #FFFFFF;
  font-size: 1.2rem;
  font-weight: 500;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;

  &:hover {
    background-color: #442970;

    & svg {
      stroke: #FFFFFF;
      transition: stroke 0.5s ease-in-out;
      transform: scale(1.1);
    }
  }

  &:active {
    background-color: #FFFFFF80;
  }
`;

const MessageRef = styled.div`
width: 100%	;
height: max-content;
display: flex;
flex-direction: column;
align-items: center;
`;

const typing = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const AiText = styled.div`
  width: 100%;
  max-width: 80%;
  color: #FFFFFF;
  font-size: 1.2rem;
  font-weight: 500;
  outline: none;
  align-self: flex-start;
  display: flex;

  & p {
    background-color: #6c41c380;
    padding: 5px 10px;
    border-radius: 10px;
    opacity: 0;
    margin: 0 auto 0 0;
    animation: 
      ${typing} 2s forwards;
  }
`;

const SimplImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid #d331e0;
`;


const UserText = styled.div`
width: max-content;
max-width: 80%;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #FFFFFF20;
  color: #FFFFFF;
  font-size: 1.2rem;
  font-weight: 500;
  outline: none;
  align-self: flex-end;
`;
