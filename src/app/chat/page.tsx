'use client';

import { socket } from "@/lib/socketClient";
import { FormEvent, useEffect,useState } from "react";
import ChatForm from "../components/ChatForm";

interface ChatMessage{
    username:string,
    message:string
}

export default function Chat(){
    const [messages,setMessages]=useState<ChatMessage[]>([])
    const [username,setUsername]=useState('')
    const [receiver,setReciver]=useState('')

    useEffect(()=>{

     const handleMessage = (data:ChatMessage) => {
            console.log("Received message on client:",data);
            setMessages((prevMessage) => [...prevMessage,data]);
        };
        socket.on("message", handleMessage);

        return () => {
            socket.off("message", handleMessage);
        };
    },[]);

    const handleJoinRoom = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !receiver) return;

        socket.emit("private_chat", { sender: username, receiver });
    }

    const handleMsgSend=(message:string)=>{
        socket.emit("message",{sender:username,receiver,message})

    }
    
    return(
        <div className="w-full max-w-xl mx-auto p-4">
              <form onSubmit={handleJoinRoom} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your username..."
                    className="flex-1 px-4 border-2 py-2 rounded-lg focus:outline-none text-sm"
                />
                <input
                    type="text"
                    value={receiver}
                    onChange={(e) => setReciver(e.target.value)}
                    placeholder="Chatting with..."
                    className="flex-1 px-4 border-2 py-2 rounded-lg focus:outline-none text-sm"
                />
                <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm">
                    Join Chat
                </button>
            </form>
          
          

           <div className="h-96 overflow-y-auto p-4 mb-4 bg-gray-100 border-2 rounded-lg flex flex-col gap-2">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <div className="text-xs font-bold text-gray-600 mb-1">
                            {msg.username}
                        </div>
                        <div className="bg-white p-3 rounded-lg border shadow-sm w-fit max-w-md text-sm text-gray-800">
                            {msg.message}
                        </div>
                    </div>
                ))}
            </div>

            <ChatForm onSend={handleMsgSend} />
        </div>
    )
}