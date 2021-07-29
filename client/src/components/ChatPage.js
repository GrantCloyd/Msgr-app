import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { API_ROOT, handleCreate } from "../constants"
import { ActionCable, ActionCableProvider } from "react-actioncable-provider"

export default function ChatPage({ userId }) {
   const { title, id } = useParams()
   const initialState = {
      admin: { name: "", email: "" },
   }
   const initialMessage = {
      content: "",
      user_id: userId,
      chat_id: id,
   }
   const [errors, setErrors] = useState(null)
   const [roomInfo, setRoomInfo] = useState(initialState)
   const [messages, setMessages] = useState([])
   const [newMessage, setNewMessage] = useState(initialMessage)
   const [cables, setCables] = useState([])

   useEffect(() => {
      async function getData() {
         const res = await fetch(`${API_ROOT}/chats/${id}`)
         const data = await res.json()
         setRoomInfo(data)
         setMessages(data.messages)
      }
      getData()
   }, [])

   const handleSuccess = e => setMessages([...messages, e])

   const handleChange = e => setNewMessage({ ...newMessage, content: e.target.value })

   const handleSubmit = e => {
      e.preventDefault()

      handleCreate(newMessage, "messages", setErrors, handleSuccess)
   }

   const handleReceivedChat = response => {
      console.log(response)
      if (!cables.map(cable => cable.id).includes(response.id)) {
         setCables([...cables, response])
         console.log(cables)
      }
   }

   const cablesMap = cables.map(cable => <p key={cable.id}>{cable.content}</p>)

   //const messageMap = messages.map(message => <p key={message.id}>{message.content}</p>)

   return (
      <div>
         <h2>Welcome to - {roomInfo.title} Chat Room - </h2>
         <p>Description: {roomInfo.description}</p>
         <h3>Location: This channel is based in {roomInfo.location} </h3>
         <h3>
            For further questions please reach out to channel admin: {roomInfo.admin.name} at{" "}
            <a href={`mailto:${roomInfo.admin.email}`}>{roomInfo.admin.email}</a>
         </h3>
         <h3>
            {roomInfo.age_group === "Family"
               ? "This room is intended for all ages"
               : "This room is not intended for young children"}
         </h3>
         <ul>
            {" "}
            Users In Chatroom Now:
            <li>user_1</li>
            <li>user_2</li>
         </ul>
         <div>
            <h3>Main text box</h3>
            <p>Standard messages</p>
            {/* {messageMap} */}
            <ActionCable
               channel={{ channel: `ChatsChannel` }}
               onReceived={handleReceivedChat}></ActionCable>
            <p>Live time messages</p>
            {cablesMap}

            <p>
               <span>👨🏽‍🎤 user_1: </span> Hi, user 2, this is a message from user 1 yet again!{" "}
               <span>
                  <button>React</button>
               </span>
            </p>
         </div>
         <form onSubmit={handleSubmit}>
            <input
               value={newMessage.content}
               onChange={handleChange}
               type="textarea"
               placeholder="Type something"
            />
            <button>Send</button>
         </form>
         {errors ? <p>{errors}</p> : null}
      </div>
   )
}
