import React, { useRef, useState } from "react"
import { API_ROOT, HEADERS, handleCreate } from "../constants"
import { Popper, Card, Button } from "@material-ui/core"
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone"
import EmojiEmotionsTwoToneIcon from "@material-ui/icons/EmojiEmotionsTwoTone"

export default function Message({ chatAG, cable, userId, setViewUser }) {
   const reactionEl = useRef()
   const [openState, setOpenState] = useState(false)
   const fontSize = { fontSize: 20 }

   async function handleDeleteMessage() {
      const res = await fetch(`${API_ROOT}/messages/${cable.id}`, {
         method: "DELETE",
         headers: HEADERS,
      })

      const data = await res.json()
      if (data.error) {
         console.log(data.error)
      }
   }

   async function handleDeleteReaction(id) {
      const res = await fetch(`${API_ROOT}/reactions/${id}`, {
         method: "DELETE",
         headers: HEADERS,
      })

      const data = await res.json()
      if (data.error) {
         console.log(data.error)
      }
   }

   const handleErrors = e => console.log(e)
   const handleSucess = e => e

   const handleReaction = e => {
      const newReact = {
         message_id: cable.id,
         user_id: userId,
         reaction_type: e.target.value,
      }
      handleCreate(newReact, "reactions", handleErrors, handleSucess)
   }

   const reactMap = cable.reactions.map(r => (
      <p
         className="reactions"
         onClick={r.user_id === userId ? () => handleDeleteReaction(r.id) : null}
         key={r.id}>
         <button style={fontSize} className="reactBtn">
            {r.reaction === "Sad"
               ? "😢"
               : r.reaction === "Happy"
               ? "😀"
               : r.reaction === "Love"
               ? "🥰"
               : r.reaction === "Angry"
               ? "😡"
               : r.reaction === "Gross"
               ? "🤢"
               : null}{" "}
         </button>
         from <img alt="reaction" className="msgImg" src={r.user_image} />
      </p>
   ))

   async function handleViewUser(id) {
      let res = await fetch(`${API_ROOT}/users/${id}`)
      let data = await res.json()
      if (data.id) {
         setViewUser(data)
      } else {
         alert(`Status ${data.status} : ${data.error}`)
      }
   }

   return (
      <Card variant="outlined" style={{ borderRadius: "20%" }} className="divider">
         <div
            className="padding"
            style={{ backgroundColor: cable.user.app_color, color: cable.user.text_color }}
            key={cable.id}>
            <p>
               <img
                  onClick={userId !== cable.user.id ? () => handleViewUser(cable.user.id) : null}
                  className="msgImg"
                  alt={`${cable.user.name}`}
                  src={cable.user.image_url}
               />{" "}
               {cable.user.name}
            </p>{" "}
            <p>{cable.content} </p> {cable.reactions.length > 0 ? reactMap : null}
            <p className="font-small">@ {new Date(cable.created_at).toLocaleString()} </p>
            {userId === cable.user.id ? (
               <Button
                  // className="floatLeftButton"
                  type="submit"
                  variant="contained"
                  onClick={handleDeleteMessage}>
                  <DeleteTwoToneIcon />{" "}
               </Button>
            ) : (
               <>
                  <Button
                     // className="floatButton"
                     type="submit"
                     variant="contained"
                     onClick={() => setOpenState(!openState)}
                     ref={reactionEl}
                     id={`${cable.id}Reaction`}>
                     <EmojiEmotionsTwoToneIcon />
                  </Button>
                  <Popper
                     id={`${cable.id}Reaction`}
                     anchorEl={reactionEl.current}
                     placement="right-start"
                     open={openState}>
                     <span className="reactWrapper">
                        <button
                           style={fontSize}
                           className="reactBtn"
                           onClick={handleReaction}
                           value={"Happy"}>
                           😃
                        </button>
                        <button
                           style={fontSize}
                           className="reactBtn"
                           onClick={handleReaction}
                           value={"Sad"}>
                           😢
                        </button>
                        <button
                           style={fontSize}
                           className="reactBtn"
                           onClick={handleReaction}
                           value={"Love"}>
                           🥰
                        </button>
                        <button
                           style={fontSize}
                           className="reactBtn"
                           onClick={handleReaction}
                           value={"Angry"}>
                           😡
                        </button>
                        <button
                           style={fontSize}
                           className="reactBtn"
                           onClick={handleReaction}
                           value={"Gross"}>
                           🤢
                        </button>
                     </span>
                  </Popper>
               </>
            )}
         </div>
      </Card>
   )
}
