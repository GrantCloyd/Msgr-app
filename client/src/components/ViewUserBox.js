import React from "react"

export default function ViewUserBox({
   viewUser: { name, created_at, email, image_url, text_color, app_color, bio },
}) {
   return (
      <>
         <div style={{ backgroundColor: app_color, color: text_color }}>
            <p>User: {name} </p>

            <img alt={name} src={image_url} />
            <p>Bio: {bio}</p>
            <p> Member Since: {new Date(created_at).toDateString().slice(4)}</p>
         </div>
      </>
   )
}
