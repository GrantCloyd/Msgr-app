import React, { useState } from "react"
import { Link } from "react-router-dom"
import { handleCreate } from "../constants"

export default function LogInPage({ user, setUser }) {
   //move user and userState into App to set state of user throughout app and not just at this level
   const { name, image_url, id } = user
   const initialLogInState = {
      email: "",
      password: "",
   }
   const [errors, setErrors] = useState(null)
   const [newLogin, setNewLogin] = useState(initialLogInState)

   const handleUpdate = e => setNewLogin({ ...newLogin, [e.target.name]: e.target.value })

   const handleSubmit = e => {
      e.preventDefault()
      handleCreate(newLogin, "log_in", setErrors, setUser)
   }

   return (
      <div>
         {errors ? <p>{errors}</p> : null}
         {name !== "Guest" ? (
            <div>
               <h2>Welcome to localHost {name}!</h2>

               <p>You're free to start chatting!</p>
            </div>
         ) : (
            <>
               <h2>Log In to start chatting</h2>
               <form onSubmit={handleSubmit}>
                  <label htmlFor="email">Email: </label>
                  <input
                     value={newLogin.email}
                     onChange={handleUpdate}
                     type="text"
                     name="email"
                     placeholder="Email Address"
                  />
                  <br />
                  <label htmlFor="password">Password: </label>
                  <input
                     value={newLogin.password}
                     onChange={handleUpdate}
                     type="password"
                     name="password"
                     placeholder="Password"
                  />
                  <br />
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
