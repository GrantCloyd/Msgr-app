import React from "react"
import { Link } from "react-router-dom"

export default function ChatLi({ id, title, admin, location, description, age_group }) {
   return (
      <div>
         <li>
            <span> Title: {title.length > 30 ? `${title.slice(0, 30)}...` : title} </span>||
            <span>
               {" "}
               Location: {location.length > 20 ? `${location.slice(0, 20)}...` : location}{" "}
            </span>
            ||
            <span>
               {" "}
               Description:{" "}
               {description.length > 50 ? `${description.slice(0, 50)}...` : description}{" "}
            </span>
            || {age_group} || Admin: {admin.name} ||
            <Link to={`/chat/${title}/${id}`}> Start Chatting </Link>
         </li>
      </div>
   )
}
