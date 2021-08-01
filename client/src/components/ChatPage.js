import React, { useEffect, useState, useRef } from "react"
import { useParams, useHistory } from "react-router-dom"
import { API_ROOT, handleCreate, HEADERS } from "../constants"
import { ActionCable, ActionCableProvider } from "react-actioncable-provider"
import Message from "./Message"

export default function ChatPage({ userId, userName }) {
   const messageContainer = useRef()

   const scrollToBottom = () => {
      messageContainer.current.scrollIntoView({
         behavior: "smooth",
         block: "end",
         inline: "nearest",
      })
   }

   const { title, id } = useParams()
   const history = useHistory()
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
   const [deleted, setDeleted] = useState(false)

   useEffect(() => {
      scrollToBottom()
   }, [cables])

   useEffect(() => {
      if (userName === "Guest") return history.push("/")
      async function getData() {
         const res = await fetch(`${API_ROOT}/chats/${id}`)
         const data = await res.json()
         setRoomInfo(data)
         setMessages(data.messages)
      }
      getData()
   }, [])

   const handleSuccess = e => e

   const handleChange = e => setNewMessage({ ...newMessage, content: e.target.value })

   const handleSubmit = e => {
      e.preventDefault()
      setErrors(null)
      handleCreate(newMessage, "messages", setErrors, handleSuccess)
      setNewMessage(initialMessage)
   }

   const handleReceivedChat = response => {
      const { message } = response
      if (message.delete) {
         let update = cables.filter(cable => cable.id !== message.id)
         setCables(update)
         return
      }
      if (message.delete_channel) {
         setDeleted(!deleted)
         return history.push("/find")
      }

      if (message.reaction) {
         console.log(message)
      }

      if (!cables.map(cable => cable.id).includes(message.id)) {
         setCables([...cables, message])
      }
   }

   async function handleDeleteChat() {
      const res = await fetch(`${API_ROOT}/chats/${id}`, {
         method: "DELETE",
         headers: HEADERS,
      })
      setTimeout(() => history.push("/find"), 1000)
      // const data = await res.json()
   }

   const cablesMap = cables.map(cable => <Message cable={cable} key={cable.id} userId={userId} />)

   // const messageMap = messages.map(message => <p key={message.id}>{message.content}</p>)

   return (
      <div>
         <h2>Welcome to - {roomInfo.title} Chat Room - </h2>
         <p>Description: {roomInfo.description}</p>
         <h3>Location: This channel is based in {roomInfo.location} </h3>
         <h3>
            For further questions please reach out to channel admin: {roomInfo.admin.name} at{" "}
            <a href={`mailto:${roomInfo.admin.email}`}>{roomInfo.admin.email}</a>
         </h3>
         {userName === roomInfo.admin.name ? (
            <>
               <button>Edit Room Settings</button>{" "}
               <button onClick={handleDeleteChat}>Delete Room</button>{" "}
            </>
         ) : null}
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
            <>
               <form className="messageText" onSubmit={handleSubmit}>
                  <label htmlFor="messageText">Message: </label>
                  <input
                     value={newMessage.content}
                     onChange={handleChange}
                     name="messageText"
                     type="textarea"
                     placeholder="Send .."
                  />
                  <button>Send</button>
                  {errors ? <p>{errors}</p> : null}
               </form>
            </>
            <ActionCable
               channel={{ channel: `ChatsChannel`, params: roomInfo.title }}
               onReceived={handleReceivedChat}>
               <br />
               <div ref={messageContainer} className="messageContainer">
                  {cablesMap}
               </div>
            </ActionCable>
         </div>
      </div>
   )
}
