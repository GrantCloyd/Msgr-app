import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { handleCreate } from "../constants"

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

   console.log(newSignUp.age_group)
   const handleUpdate = e => setNewSignUp({ ...newSignUp, [e.target.name]: e.target.value })

   const handleSubmit = e => {
      e.preventDefault()
      console.log(newSignUp)
      setErorrs(null)
      if (newSignUp.password === newSignUp.confirmPassword) {
         handleCreate(newSignUp, "users", setErorrs, successHandle)
         setNewSignUp(initialState)
      } else {
         setErorrs("These passwords do not match")
      }
   }

   return (
      <div>
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
            <label htmlFor="email">Email: </label>
            <input
               onChange={handleUpdate}
               value={newSignUp.email}
               autocomplete="email"
               type="text"
               name="email"
               placeholder="Email Address"
            />
            <label htmlFor="password">Password: </label>
            <input
               value={newSignUp.password}
               onChange={handleUpdate}
               type="password"
               name="password"
               placeholder="Password"
            />
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
               value={newSignUp.confirmPassword}
               onChange={handleUpdate}
               autocomplete="password"
               type="password"
               name="confirmPassword"
               placeholder="Re-enter your password"
            />
            <label htmlFor="age_group">Select Age Group: </label>
            <select value={newSignUp.age_group} onChange={handleUpdate} name="age_group">
               Age Group
               <option>--select one--</option>
               <option value="Family">Family</option>
               <option value="Adult">Adult</option>
            </select>
            <button>Submit</button>
         </form>
         <p>*Note: Age group will determine chatrooms that you can access</p>
      </div>
   )
}
