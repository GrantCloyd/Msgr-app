import React, { useEffect, useState, useRef } from "react"
import { useParams, useHistory } from "react-router-dom"
import { API_ROOT, handleCreate, HEADERS, handleUpdate, colorOptions } from "../constants"
import { ActionCable } from "react-actioncable-provider"

import Message from "./Message"

export default function ChatPage({ userId, userName }) {
   const { id } = useParams()
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

   const [newMessage, setNewMessage] = useState(initialMessage)
   const [cables, setCables] = useState([])
   const [deleted, setDeleted] = useState(false)
   const [togglePreviousMessages, setTogglePreviousMessages] = useState(false)
   const [toggleEdit, setToggleEdit] = useState(false)
   const [updateChat, setUpdateChat] = useState(null)

   //autoscroll feature
   const messageContainer = useRef()

   const scrollToBottom = () => {
      messageContainer.current.scrollIntoView({
         behavior: "smooth",
         block: "end",
         inline: "nearest",
      })
   }

   useEffect(() => {
      scrollToBottom()
   }, [cables])

   //set chat data and handle if not logged in
   useEffect(() => {
      if (userName === "Guest") return history.push("/")
      async function getData() {
         const res = await fetch(`${API_ROOT}/chats/${id}`)
         const data = await res.json()
         setRoomInfo(data)
         setUpdateChat(data)
      }
      getData()
   }, [history, userName, id])

   const handleErrors = e => console.log(e)
   const handleSuccess = e => e

   const handleSuccessChatUpdate = data => {
      setToggleEdit(!toggleEdit)
   }
   const handleChange = e => setNewMessage({ ...newMessage, content: e.target.value })
   const handleChatEdit = e => setUpdateChat({ ...updateChat, [e.target.name]: e.target.value })

   const handleMessageSubmit = e => {
      e.preventDefault()
      setErrors(null)
      handleCreate(newMessage, "messages", setErrors, handleSuccess)
      setNewMessage(initialMessage)
   }

   //message cable/switch handler
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
         let update = cables.map(cable => {
            if (
               cable.id === message.message_id &&
               !cable.reactions.map(r => r.user).includes(message.user)
            ) {
               return { ...cable, reactions: [...cable.reactions, message] }
            } else {
               return cable
            }
         })

         setCables([...update])
         return
      }

      if (message.delete_reaction) {
         let update = cables.map(c => {
            if (c.id === message.message_id) {
               return { ...c, reactions: c.reactions.filter(r => r.id !== message.id) }
            } else {
               return c
            }
         })

         setCables(update)
         return
      }

      if (message.patch_chat) {
         setRoomInfo({
            ...roomInfo,
            text_color: message.text_color,
            room_color: message.room_color,
            description: message.description,
            location: message.location,
         })
         return
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

   const submitChatUpdate = e => {
      e.preventDefault()
      console.log(updateChat)
      handleUpdate(updateChat, "chats", id, handleErrors, handleSuccessChatUpdate)
   }

   let cablesMap = cables.map(cable => <Message cable={cable} key={cable.id} userId={userId} />)

   return (
      <div style={{ backgroundColor: roomInfo.room_color, color: roomInfo.text_color }}>
         {toggleEdit ? (
            <>
               <h2>Update Profile</h2>
               <form onSubmit={submitChatUpdate}>
                  <label htmlFor="room_color">Room Color: </label>
                  <select name="room_color" value={updateChat.room_color} onChange={handleChatEdit}>
                     {colorOptions}
                  </select>
                  <label htmlFor="text_color">Text Color: </label>
                  <select name="text_color" value={updateChat.text_color} onChange={handleChatEdit}>
                     {colorOptions}
                  </select>
                  <label htmlFor="description">Description: </label>
                  <input
                     onChange={handleChatEdit}
                     name="description"
                     type="text"
                     value={updateChat.description}
                  />
                  <label htmlFor="location">Location: </label>
                  <input
                     onChange={handleChatEdit}
                     name="location"
                     type="textarea"
                     value={updateChat.location}
                  />

                  <br />
                  <button> Save Changes</button>
               </form>
            </>
         ) : (
            <>
               <h2>Welcome to - {roomInfo.title} Chat Room - </h2>
               <p>Description: {roomInfo.description}</p>
               <h3>Location: This channel is based in {roomInfo.location} </h3>
               <h3>
                  For further questions please reach out to channel admin: {roomInfo.admin.name} at{" "}
                  <a href={`mailto:${roomInfo.admin.email}`}>{roomInfo.admin.email}</a>
               </h3>
            </>
         )}
         {userId === roomInfo.admin.id ? (
            <>
               <button onClick={() => setToggleEdit(!toggleEdit)}>Edit Room Settings</button>{" "}
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
            {/* <button onClick={() => setTogglePreviousMessages(!togglePreviousMessages)}>
               View Previous messages?
            </button>
            {togglePreviousMessages ? { previousMessagesMap } : null} */}
            <>
               <form className="messageText" onSubmit={handleMessageSubmit}>
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
