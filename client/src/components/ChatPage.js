import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { API_ROOT } from "../constants"

export default function ChatPage() {
   const { title, id } = useParams()
   const initialState = {
      admin: { name: "" },
   }
   const [roomInfo, setRoomInfo] = useState(initialState)

   useEffect(() => {
      async function getData() {
         const res = await fetch(`${API_ROOT}/chats/${id}`)
         const data = await res.json()
         setRoomInfo(data)
         console.log(data)
      }
      getData()
   }, [])

   console.log(title)

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
            <p>
               <span>👨🏽‍🎤 user_1: </span> Hi, this is a message from user 1{" "}
               <span>
                  <button>React</button>
               </span>
            </p>
            <p>
               <span>🧛🏼‍♀️ user_2:</span> Hi, user 1, this is a message from user 2{" "}
               <span>
                  <button>React</button>
               </span>
            </p>
            <p>
               <span>👨🏽‍🎤 user_1: </span> Hi, user 2, this is a message from user 1 yet again!{" "}
               <span>
                  <button>React</button>
               </span>
            </p>
         </div>
         <form>
            <input type="textarea" placeholder="Type something" />
            <button>Send</button>
         </form>
      </div>
   )
}
