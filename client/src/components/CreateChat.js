import React, { useState, useEffect } from "react"
import { handleCreate } from "../constants"
import { useHistory } from "react-router-dom"
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone"
import { Button, Card } from "@material-ui/core"

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
   }, [userName, history])

   return (
      <div>
         <Card className="divider">
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
               <br />
               <label htmlFor="description">Description: </label>
               <input
                  value={newChat.description}
                  onChange={handleUpdate}
                  type="textarea"
                  name="description"
                  placeholder="Enter Description"
               />
               <br />
               <label htmlFor="location">Location: </label>
               <input
                  value={newChat.location}
                  onChange={handleUpdate}
                  type="text"
                  name="location"
                  placeholder="Enter Location"
               />
               <br />
               <label htmlFor="age_group">Select Age Group: </label>
               <select value={newChat.age_group} onChange={handleUpdate} name="age_group">
                  <option>--select one--</option>
                  {userAgeGroup === "Adult" ? <option value="Adult">Adult</option> : null}
                  <option value="Family">Family</option>
               </select>
               <br />

               <Button className="floatButton" type="submit" variant="contained">
                  <AddCircleTwoToneIcon />{" "}
               </Button>
            </form>
         </Card>
      </div>
   )
}
