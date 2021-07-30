import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { API_ROOT, handleCreate, HEADERS } from "../constants"
import { ActionCable, ActionCableProvider } from "react-actioncable-provider"

export default function ChatPage({ userId, userName }) {
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

   useEffect(() => {
      async function getData() {
         const res = await fetch(`${API_ROOT}/chats/${id}`)
         const data = await res.json()
         setRoomInfo(data)
         setMessages(data.messages)
      }
      getData()
   }, [])

   const handleSuccess = e => {
      setMessages([...messages, e])
      setNewMessage(initialMessage)
   }

   const handleChange = e => setNewMessage({ ...newMessage, content: e.target.value })

   const handleSubmit = e => {
      e.preventDefault()
      setErrors(null)
      handleCreate(newMessage, "messages", setErrors, handleSuccess)
   }

   const handleReceivedChat = response => {
      const { message } = response
      console.log(response.message)
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

   const cablesMap = cables.map(cable => (
      <div key={cable.id}>
         <hr />
         <p>
            <img className="msgImg" alt={`${cable.user.name}`} src={cable.user.image_url} />{" "}
            {cable.user.name} : {cable.content}{" "}
         </p>{" "}
         <p>@: {new Date(cable.created_at).toLocaleString()}</p>
         <hr />
      </div>
   ))

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
