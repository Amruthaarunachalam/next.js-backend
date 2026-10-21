import { useState,FormEvent } from "react";

interface ChatProps{
    onSend:(message:string)=>void
}
export default function ChatForm({onSend}:ChatProps){
    const [message,setMessage]=useState('')

    const handleSubmit=(e:FormEvent)=>{
        e.preventDefault()
        if(message.trim()!==''){
            onSend(message)
            setMessage("")
        }
    }
    return(
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <input
            type="text"
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 px-4 border-2 py-2 rounded-lg focus:outline-none"
            />
            <button
             type="submit"
            className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold">
             Send
            </button>
        </form>
    )
}