import React, { useRef, useState } from "react"
import { API_ROOT, HEADERS, handleCreate } from "../constants"
import { Popper } from "@material-ui/core"

export default function Message({ cable, userId }) {
   const reactionEl = useRef()
   const [openState, setOpenState] = useState()

   async function handleDelete() {
      const res = await fetch(`${API_ROOT}/messages/${cable.id}`, {
         method: "DELETE",
         headers: HEADERS,
      })
   }

   const handleErrors = e => console.log(e)
   const handleSucess = e => console.log(e)

   const handleReaction = e => {
      const newReact = {
         message_id: cable.id,
         user_id: userId,
         reaction_type: e.target.value,
      }
      handleCreate(newReact, "reactions", handleErrors, handleSucess)
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
                  <>
                     <button
                        onClick={() => setOpenState(!openState)}
                        ref={reactionEl}
                        id={`${cable.id}Reaction`}>
                        ❗️React
                     </button>
                     <Popper
                        id={`${cable.id}Reaction`}
                        anchorEl={reactionEl.current}
                        placement="right"
                        open={openState}>
                        {" "}
                        <button onClick={handleReaction} value={"Happy"}>
                           😃
                        </button>
                        <button onClick={handleReaction} value={"Sad"}>
                           😢
                        </button>{" "}
                        <button onClick={handleReaction} value={"Love"}>
                           🥰
                        </button>{" "}
                        <button onClick={handleReaction} value={"Angry"}>
                           😡
                        </button>{" "}
                     </Popper>
                  </>
               )}
               <hr />
            </p>
         </div>
      </>
   )
}
