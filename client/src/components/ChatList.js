import React, { useEffect, useState } from "react"
import { API_ROOT } from "../constants"
import ChatLi from "./ChatLi"
import { useHistory } from "react-router-dom"
import { Card, Button } from "@material-ui/core"
import RefreshTwoToneIcon from "@material-ui/icons/RefreshTwoTone"

export default function ChatList({ userAgeGroup, userName }) {
   const [loading, setLoading] = useState(null)
   const history = useHistory()

   async function getData() {
      setLoading("loading")
      const res = await fetch(`${API_ROOT}/chats`)
      const data = await res.json()
      setChatRooms(data)

      setLoading(null)
   }

   useEffect(() => {
      if (userName === "Guest") return history.push("/")
      getData()
   }, [userName, history])

   const [chatRooms, setChatRooms] = useState([])

   const allRoomList = chatRooms.map(chat => <ChatLi {...chat} key={chat.id} />)
   const noAdultRoomList = chatRooms
      .filter(chat => chat.age_group === "Family")
      .map(chat => <ChatLi {...chat} key={chat.id} />)

   return (
      <div>
         <h2>Available Chat Rooms : </h2>
         <Card>
            <Button className="floatButton" type="submit" variant="contained" onClick={getData}>
               <RefreshTwoToneIcon />
            </Button>
            {loading ? <p>Loading ...</p> : null}
            {userAgeGroup === "Family" ? <h4>Only Showing Family friendly chat-rooms</h4> : null}
            <ul>{userAgeGroup === "Family" ? noAdultRoomList : allRoomList}</ul>
         </Card>
      </div>
   )
}
