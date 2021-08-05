import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { handleCreate } from "../constants"
import { Card, Button } from "@material-ui/core"

export default function SignUpPage() {
   const initialState = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      age_group: "--select one--",
   }

   const history = useHistory()

   const successHandle = e => history.push("/")

   const [newSignUp, setNewSignUp] = useState(initialState)
   const [errors, setErorrs] = useState(null)

   const handleUpdate = e => setNewSignUp({ ...newSignUp, [e.target.name]: e.target.value })

   const handleSubmit = e => {
      e.preventDefault()
      setErorrs(null)
      if (newSignUp.password === newSignUp.confirmPassword) {
         handleCreate(newSignUp, "users", setErorrs, successHandle).then(() => {
            if (errors === null) {
               setNewSignUp(initialState)
            }
         })
      } else {
         setErorrs("These passwords do not match")
      }
   }

   return (
      <div>
         <Card className="signUpLogIn">
            <img alt="logo" src="https://i.imgur.com/k47edoR.png" />
            <h2>Sign Up!</h2>
            {errors ? <p>{errors}</p> : null}
            <form onSubmit={handleSubmit}>
               <label htmlFor="name">Name: </label>
               <input
                  onChange={handleUpdate}
                  autocomplete="name"
                  type="text"
                  value={newSignUp.name}
                  name="name"
                  placeholder="Name"
               />
               <br />
               <label htmlFor="email">Email: </label>
               <input
                  onChange={handleUpdate}
                  value={newSignUp.email}
                  autocomplete="email"
                  type="text"
                  name="email"
                  placeholder="Email Address"
               />
               <br />
               <div className="inner-divider">
                  <label htmlFor="password">Password: </label>
                  <input
                     value={newSignUp.password}
                     onChange={handleUpdate}
                     type="password"
                     name="password"
                     placeholder="Password"
                  />
                  <br />
                  <div className="shift-left">
                     <label htmlFor="confirmPassword">Confirm Password: </label>
                     <input
                        value={newSignUp.confirmPassword}
                        onChange={handleUpdate}
                        autocomplete="password"
                        type="password"
                        name="confirmPassword"
                        placeholder="Re-enter your password"
                     />

                     <br />
                     <label htmlFor="age_group">Select Age Group: </label>
                     <select value={newSignUp.age_group} onChange={handleUpdate} name="age_group">
                        Age Group
                        <option>--select one--</option>
                        <option value="Family">Family</option>
                        <option value="Adult">Adult</option>
                     </select>
                  </div>
               </div>
               <br />
               <Button type="submit" color="primary" variant="contained">
                  Submit
               </Button>
            </form>
            <p>*Note: Age group will determine which chatrooms you can access</p>
         </Card>
      </div>
   )
}
