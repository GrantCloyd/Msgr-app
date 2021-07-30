import React from "react"
import { API_ROOT, HEADERS } from "../constants"

export default function Message({ cable, userId }) {
   console.log(cable)

   async function handleDelete() {
      const res = await fetch(`${API_ROOT}/messages/${cable.id}`, {
         method: "DELETE",
         headers: HEADERS,
      })
   }

   return (
      <>
         <div key={cable.id}>
            <hr />
            <p>
               <img className="msgImg" alt={`${cable.user.name}`} src={cable.user.image_url} />{" "}
               {cable.user.name} : {cable.content}{" "}
            </p>{" "}
            <p>
               @ {new Date(cable.created_at).toLocaleString()}{" "}
               {userId === cable.user.id ? (
                  <button onClick={handleDelete}>❌ Delete</button>
               ) : (
                  <button>❗️React</button>
               )}
               <hr />
            </p>
         </div>
      </>
   )
}
