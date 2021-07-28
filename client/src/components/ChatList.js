import React from "react"
import { Link } from "react-router-dom"

export default function ChatList() {
   return (
      <div>
         {" "}
         Available Chat Rooms :
         <ul>
            <li>
               Chat Title #1 || Chat Location || First 30 chars description ||{" "}
               <Link to="/chat/coffee"> Click here </Link>
            </li>
            <li>
               Chat Title #2 || Chat Location || First 30 chars description || click to open chat
               room
            </li>
            <li>
               Chat Title #3 || Chat Location || First 30 chars description || click to open chat
               room
            </li>
            <li>
               Chat Title #4 || Chat Location || First 30 chars description || click to open chat
               room
            </li>
         </ul>
      </div>
   )
}
