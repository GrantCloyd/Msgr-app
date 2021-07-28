import React from "react"

export default function ChatPage() {
   return (
      <div>
         <h2>Welcome to -Title of CHATROOM-</h2>
         <h3>Description: This channel is about -description of chat-</h3>
         <h3>Location: This channel is based in -location-</h3>
         <h3>For further questions please reach out to channel admin: -useradmin-</h3>
         <h3>This channel is for Adult/Family</h3>
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
