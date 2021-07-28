import React from "react"

export default function ProfilePage() {
   return (
      <div>
         <h2>User Profile!</h2>
         <ul>
            <li>Avatar: image_url </li> <li>Name: Name!</li> <li>Email: email@adress.com</li>{" "}
            <li>Bio: Info about me from bio</li> <li>Age Group: Family or Adult</li>
         </ul>
         <button>Update information!</button>
      </div>
   )
}
