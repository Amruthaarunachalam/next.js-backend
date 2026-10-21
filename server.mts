import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev =process.env.NODE_ENV !=='production'
const hostname=process.env.HOSTNAME || "localhost"
const port =parseInt(process.env.PORT ||"3000",10);

const app=next({dev,hostname,port});
const handle=app.getRequestHandler();

app.prepare().then(()=>{
   const httpServer=createServer(handle);
   const io=new Server(httpServer);

   io.on("connection",(socket)=>{
    console.log(`User connected:${socket.id}`)

 socket.on("private_chat", ({ sender, receiver }) => {
         const sortUser = [sender, receiver].sort()
         const privateRoomId = `user${sortUser[0]}_and_user${sortUser[1]}`
         socket.join(privateRoomId)
         console.log(`${sender} joined ${privateRoomId}`)
      })

     
      socket.on("message", ({ sender, receiver, message }) => {
         const sortUser = [sender, receiver].sort()
         const privateRoomId = `user${sortUser[0]}_and_user${sortUser[1]}` 
         
         console.log(`${sender} sent Message: ${message}`)
         console.log(`${receiver} received ${message}`)
         
         io.to(privateRoomId).emit("message", { username: sender, message })
      })

    socket.on("disconnect",()=>{
    console.log(`User disconnected ${socket.id}`)
   })
   });

   
   

   httpServer.listen(port,()=>{
    console.log(`server running on http://${hostname}:${port}`)
   });

});
