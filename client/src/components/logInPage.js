import React, { useState } from "react"
import { Link } from "react-router-dom"
import { handleCreate } from "../constants"

export default function LogInPage() {
   const initialUserState = {
      name: "Guest",
      id: "",
      image_url: "",
   }
   const initialLogInState = {
      email: "",
      password: "",
   }

   const [user, setUser] = useState(initialUserState)
   const [errors, setErrors] = useState(null)
   const [newLogin, setNewLogin] = useState(initialLogInState)

   const handleUpdate = e => setNewLogin({ ...newLogin, [e.target.name]: e.target.value })

   const handleSubmit = e => {
      e.preventDefault()
      handleCreate(newLogin, "log_in", setErrors, setUser)
   }

   return (
      <div>
         <h2>Welcome to localHost - please sign-in!</h2>
         <h2>Log In!</h2>
         {errors ? <p>{errors}</p> : null}
         {user.name !== "Guest" ? (
            <div>
               <img src={user.image_url} />
               <p>Welcome {user.name}</p>
               <p>You're free to start chatting!</p>
            </div>
         ) : (
            <>
               <form onSubmit={handleSubmit}>
                  <label htmlFor="email">Email</label>
                  <input
                     value={newLogin.email}
                     onChange={handleUpdate}
                     type="text"
                     name="email"
                     placeholder="Email Address"
                  />
                  <label htmlFor="password">Password</label>
                  <input
                     value={newLogin.password}
                     onChange={handleUpdate}
                     type="password"
                     name="password"
                     placeholder="Password"
                  />
                  <button>Submit</button>
               </form>
               <p>
                  Don't have a log-in? <Link to="/signup">Sign-Up here!</Link>
               </p>
            </>
         )}
      </div>
   )
}
