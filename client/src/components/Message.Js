import React from "react"
import { ActionCable } from "react-actioncable-provider"

export default function Message() {
   return (
      <>
         <p>
            <span>👨🏽‍🎤 user_1: </span> Hi, this is a message from user 1{" "}
            <span>
               <button>React</button>
            </span>
         </p>
         <ActionCable
            key={message.id}
            channel={{ channel: "chat_channel", chat: chat.id }}
            onReceived={handleReceivedMessage}
         />
      </>
   )
}
