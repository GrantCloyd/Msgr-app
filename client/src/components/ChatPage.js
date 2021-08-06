import React, { useEffect, useState, useRef } from "react"
import { useParams, useHistory } from "react-router-dom"
import { API_ROOT, handleCreate, HEADERS, handleUpdate } from "../constants"
import { ActionCable } from "react-actioncable-provider"
import { Card, Button, TextField } from "@material-ui/core"
import ViewUserBox from "./ViewUserBox"
import Message from "./Message"
import CloseTwoToneIcon from "@material-ui/icons/CloseTwoTone"
import KeyboardBackspaceTwoToneIcon from "@material-ui/icons/KeyboardBackspaceTwoTone"
import AssistantTwoToneIcon from "@material-ui/icons/AssistantTwoTone"
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone"
import SaveTwoToneIcon from "@material-ui/icons/SaveTwoTone"
import AnnouncementIcon from "@material-ui/icons/Announcement"

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

   const initialUserView = {
      name: "",
      email: "",
      image_url: "",
      text_color: "",
      app_color: "",
      bio: "",
   }

   const [errors, setErrors] = useState(null)
   const [roomInfo, setRoomInfo] = useState(initialState)

   const [newMessage, setNewMessage] = useState(initialMessage)
   const [cables, setCables] = useState([])
   const [deleted, setDeleted] = useState(false)

   const [toggleEdit, setToggleEdit] = useState(false)
   const [updateChat, setUpdateChat] = useState(null)

   const [viewUser, setViewUser] = useState(initialUserView)

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
      if (roomInfo.age_group === "Family") {
         const bannedWords = [/s+h+i+t+/gi, /f+u+c+k+/gi, /b+i+t+c+h+/gi]
         bannedWords.forEach(word => {
            if (newMessage.content.toLowerCase().match(word)) {
               console.log("in here")

               let update = newMessage.content.replaceAll(word, "****")
               newMessage.content = update
            }
         })
      }
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

      // if (message.user_in_room && !usersInRoom.includes(message.user)) {
      //    setUsersInRoom([...usersInRoom, message.user])
      //    return
      // }

      // if (message.user_exit_room) {
      //    console.log(message.user)
      //    return
      // }

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

      handleUpdate(updateChat, "chats", id, handleErrors, handleSuccessChatUpdate)
   }

   const handleBack = () => history.goBack()

   //let usersMap = usersInRoom.map(user => <p key={user}>{user}</p>)
   let cablesMap = cables.map(cable => (
      <div className={userId === cable.user.id ? "msg-right" : "msg-left"}>
         <Message
            chatAG={roomInfo.age_group}
            cable={cable}
            setViewUser={setViewUser}
            key={cable.id}
            userId={userId}
         />
      </div>
   ))

   return (
      <Card
         className="chatPage"
         style={{ backgroundColor: roomInfo.room_color, color: roomInfo.text_color }}>
         {toggleEdit ? (
            <Card>
               <h2>Update Profile</h2>
               <form onSubmit={submitChatUpdate}>
                  <div className="shift-right">
                     <label htmlFor="description">Description: </label>
                     <input
                        onChange={handleChatEdit}
                        name="description"
                        type="text"
                        value={updateChat.description}
                     />
                     <br />
                     <label htmlFor="location">Location: </label>
                     <input
                        onChange={handleChatEdit}
                        name="location"
                        type="textarea"
                        value={updateChat.location}
                     />
                  </div>
                  <label htmlFor="room_color">Room Color: </label>
                  <input
                     type="color"
                     name="room_color"
                     value={updateChat.room_color}
                     onChange={handleChatEdit}></input>
                  <br />
                  <label htmlFor="text_color">Text & Box Color: </label>
                  <input
                     type="color"
                     name="text_color"
                     value={updateChat.text_color}
                     onChange={handleChatEdit}></input>
                  <br />
                  <Button type="submit" variant="contained">
                     <SaveTwoToneIcon />
                  </Button>
               </form>
            </Card>
         ) : (
            <Card className="divider">
               {userId === roomInfo.admin.id ? (
                  <>
                     <Button
                        type="submit"
                        className="floatButton"
                        variant="contained"
                        onClick={handleDeleteChat}>
                        {" "}
                        <DeleteTwoToneIcon />{" "}
                     </Button>{" "}
                     <Button
                        type="submit"
                        className="floatButton"
                        variant="contained"
                        onClick={() => setToggleEdit(!toggleEdit)}>
                        {" "}
                        <AssistantTwoToneIcon />
                     </Button>{" "}
                  </>
               ) : null}
               <Button
                  className="floatButton"
                  onClick={handleBack}
                  type="submit"
                  variant="contained">
                  {" "}
                  <KeyboardBackspaceTwoToneIcon />{" "}
               </Button>
               <br />
               <br />
               <h2>Welcome to {roomInfo.title} </h2>
               <h5>Description: {roomInfo.description}</h5>
               <h3>Location: {roomInfo.location} </h3>
               <h3>
                  For further questions please reach out to channel admin: {roomInfo.admin.name} at{" "}
                  <a href={`mailto:${roomInfo.admin.email}`}>{roomInfo.admin.email}</a>
               </h3>
            </Card>
         )}

         <h3>
            {roomInfo.age_group === "Family"
               ? "This room is intended for all ages"
               : "This room is not intended for young children"}
         </h3>
         {viewUser.name !== "" ? (
            <div className="viewerBox">
               <Card>
                  <Button
                     type="submit"
                     variant="contained"
                     className="floatButton"
                     onClick={() => setViewUser(initialUserView)}>
                     <CloseTwoToneIcon />
                  </Button>
                  <ViewUserBox
                     reset={initialUserView}
                     setViewUser={setViewUser}
                     viewUser={viewUser}
                  />
               </Card>
            </div>
         ) : null}
         <div>
            <h3>Messages</h3>
            <div ref={messageContainer} className="messageContainer">
               <Card
                  style={{
                     backgroundColor: roomInfo.text_color,
                  }}
                  className="inner-divider">
                  <ActionCable
                     channel={{
                        channel: `ChatsChannel`,
                        room_title: roomInfo.title,
                        user: userName,
                     }}
                     onReceived={handleReceivedChat}>
                     <br />
                     {cablesMap}
                  </ActionCable>
               </Card>
               <form className="messageText" onSubmit={handleMessageSubmit}>
                  <Card>
                     <TextField
                        className="expander"
                        multiline
                        rows={3}
                        variant="outlined"
                        value={newMessage.content}
                        onChange={handleChange}
                        name="messageText"
                        type="textarea"
                        placeholder="Send .."
                     />
                     <Button className="expander" type="submit" variant="contained">
                        <AnnouncementIcon />{" "}
                     </Button>
                     {errors ? <p>{errors}</p> : null}
                  </Card>
               </form>
            </div>
         </div>
      </Card>
   )
}
