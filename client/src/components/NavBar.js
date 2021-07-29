import React from "react"
import { NavLink, Link } from "react-router-dom"

export default function NavBar({ userId }) {
   return (
      <nav>
         {" "}
         Links
         <ul>
            <NavLink to="/">Home</NavLink> ||
            <NavLink to={`/profile/${userId}`}>Profile</NavLink> ||
            <NavLink to="/find">Find Chat Room</NavLink> ||
            <NavLink to="/createchat">Create Chat Room</NavLink> ||
            <Link>Log-Out</Link>
         </ul>
      </nav>
   )
}
