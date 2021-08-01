import React, { useState, useEffect } from "react"
import { handleCreate } from "../constants"
import { useHistory } from "react-router-dom"

export default function CreateChat({ userAgeGroup, userId, userName }) {
   const initialFormState = {
      title: "",
      description: "",
      location: "",
      age_group: "--select one--",
      admin_id: userId,
   }

   const history = useHistory()
   const [newChat, setNewChat] = useState(initialFormState)
   const [errors, setErrors] = useState(null)
   const handleUpdate = e => setNewChat({ ...newChat, [e.target.name]: e.target.value })

   const successHandle = e => history.push("/find")

   const handleSubmit = e => {
      e.preventDefault()
      handleCreate(newChat, "chats", setErrors, successHandle)
   }

   useEffect(() => {
      if (userName === "Guest") return history.push("/")
   }, [])

   return (
      <div>
         <div>
            <h2>Create Chat Room!</h2>
            {errors ? <p>{errors}</p> : null}
            <form onSubmit={handleSubmit}>
               <label htmlFor="title">Title: </label>
               <input
                  value={newChat.title}
                  onChange={handleUpdate}
                  type="text"
                  name="title"
                  placeholder="Enter Title"
               />
               <label htmlFor="description">Description: </label>
               <input
                  value={newChat.description}
                  onChange={handleUpdate}
                  type="textarea"
                  name="description"
                  placeholder="Enter Description"
               />
               <label htmlFor="location">Location: </label>
               <input
                  value={newChat.location}
                  onChange={handleUpdate}
                  type="text"
                  name="location"
                  placeholder="Enter Location"
               />
               <label htmlFor="age_group">Select Age Group: </label>
               <select value={newChat.age_group} onChange={handleUpdate} name="age_group">
                  <option>--select one--</option>
                  {userAgeGroup === "Adult" ? <option value="Adult">Adult</option> : null}
                  <option value="Family">Family</option>
               </select>
               <button>Create</button>
            </form>
            <p>*Note: Age group will determine who can access your chatroom</p>
         </div>
      </div>
   )
}
