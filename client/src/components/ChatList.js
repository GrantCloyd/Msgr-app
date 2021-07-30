import React, { useEffect, useState } from "react"
import { API_ROOT } from "../constants"
import ChatLi from "./ChatLi"
import { Link, useHistory } from "react-router-dom"

export default function ChatList({ userAgeGroup, userName }) {
   const [loading, setLoading] = useState(null)
   const history = useHistory()

   useEffect(() => {
      if (userName === "Guest") return history.push("/")
      async function getData() {
         setLoading("loading")
         const res = await fetch(`${API_ROOT}/chats`)
         const data = await res.json()
         setChatRooms(data)
         console.log(data)
         setLoading(null)
      }
      getData()
   }, [])

   const [chatRooms, setChatRooms] = useState([])

   const allRoomList = chatRooms.map(chat => <ChatLi {...chat} key={chat.id} />)
   const noAdultRoomList = chatRooms
      .filter(chat => chat.age_group === "Family")
      .map(chat => <ChatLi {...chat} key={chat.id} />)

   return (
      <div>
         <h2>Available Chat Rooms : </h2>
         {loading ? <p>Loading ...</p> : null}
         {userAgeGroup === "Family" ? <h4>Only Showing Family friendly chat-rooms</h4> : null}
         <ul>{userAgeGroup === "Family" ? noAdultRoomList : allRoomList}</ul>
      </div>
   )
}
