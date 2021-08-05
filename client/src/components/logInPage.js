import React, { useState } from "react"
import LoggedInPage from "./LoggedInPage"
import { Link } from "react-router-dom"
import { handleCreate } from "../constants"
import { Card, Button } from "@material-ui/core"

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
         {name !== "Guest" ? (
            <LoggedInPage name={name} />
         ) : (
            <>
               <Card className="signUpLogIn">
                  <img alt="logo" src="https://i.imgur.com/k47edoR.png" />
                  <h2>Log In to start chatting</h2>
                  {errors ? <p>{errors}</p> : null}
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
                     <div className="inner-divider">
                        <label htmlFor="password">Password: </label>
                        <input
                           value={newLogin.password}
                           onChange={handleUpdate}
                           type="password"
                           name="password"
                           placeholder="Password"
                        />
                     </div>
                     <br />
                     <Button type="submit" color="primary" variant="contained">
                        Submit
                     </Button>
                  </form>
                  <p>
                     Don't have a log-in? <Link to="/signup">Sign-Up here!</Link>
                  </p>
               </Card>
            </>
         )}
      </div>
   )
}
