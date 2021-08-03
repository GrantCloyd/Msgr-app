import React from "react"
import { NavLink, Link, useHistory } from "react-router-dom"

export default function NavBar({ userId, setUser, guestState, userImage }) {
   const history = useHistory()

   const handleLogOut = () => {
      setUser(guestState)
      history.push("/")
   }
   return (
      <nav>
         {" "}
         Links
         <ul>
            <NavLink to="/">Home</NavLink>
            || <NavLink to={`/profile/${userId}`}>Profile</NavLink> ||
            <NavLink to="/find">Find Chat Room</NavLink> ||
            <NavLink to="/createchat">Create Chat Room</NavLink> ||
            <Link onClick={handleLogOut}>Log-Out</Link>
         </ul>
         <img src={userImage} />
         <hr />
      </nav>
   )
}
