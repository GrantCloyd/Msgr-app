import React, { useState, useEffect } from "react"
import { API_ROOT, HEADERS } from "../constants"
import { useHistory } from "react-router-dom"

export default function ProfilePage({ user, setUser, guestState }) {
   //const params = useParams().id
   const { name, id, age_group, email, bio, image_url } = user
   const [deleted, setDeleted] = useState(false)
   const history = useHistory()

   async function handleDelete() {
      const res = await fetch(`${API_ROOT}/users/${id}`, {
         method: "DELETE",
         headers: HEADERS,
      })

      setDeleted(!deleted)
      setTimeout(() => {
         setUser(guestState)
         history.push("/")
      }, 1000)
   }

   useEffect(() => {
      if (name === "Guest") return history.push("/")
   }, [])

   return (
      <div>
         {deleted ? (
            <p>We're sorry to see you go!</p>
         ) : (
            <>
               <h2>User Profile for {name}</h2>
               <ul>
                  <li>
                     <img alt="Avatar" src={image_url} />{" "}
                  </li>{" "}
                  <li>Email:{email}</li> <li>Bio: {bio}</li> <li>Age Group: {age_group} </li>
               </ul>
               <button>Update information!</button>
               <button onClick={handleDelete}>Delete Account</button>
            </>
         )}
      </div>
   )
}
