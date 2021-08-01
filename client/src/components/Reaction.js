import React, { useState } from "react"

export default function Reaction({ reaction, id, user }) {
   const [displayReaction, setDisplayReaction] = useState("")

   switch (reaction) {
      case "Happy":
         setDisplayReaction("😀")
         break
      case "Sad":
         setDisplayReaction("😢")
         break
      case "Love":
         setDisplayReaction("🥰")
         break
      case "Angry":
         setDisplayReaction("😡")
         break
   }

   return (
      <span>
         <button>{displayReaction}</button> from {user}
      </span>
   )
}
