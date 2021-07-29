import React from "react"
import { useParams } from "react-router-dom"

export default function ProfilePage({ name, id, age_group, email, bio, image_url }) {
   //const params = useParams().id

   return (
      <div>
         <h2>User Profile for {name}</h2>
         <ul>
            <li>
               <img alt="Avatar" src={image_url} />{" "}
            </li>{" "}
            <li>Email:{email}</li> <li>Bio: {bio}</li> <li>Age Group: {age_group} </li>
         </ul>
         <button>Update information!</button>
         <button>Delete Account</button>
      </div>
   )
}
