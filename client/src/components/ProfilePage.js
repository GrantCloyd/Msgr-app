import React, { useState, useEffect } from "react"
import { API_ROOT, HEADERS, handleUpdate } from "../constants"
import { useHistory } from "react-router-dom"
import { Card, Button } from "@material-ui/core"
import SaveTwoToneIcon from "@material-ui/icons/SaveTwoTone"
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone"
import AssistantTwoToneIcon from "@material-ui/icons/AssistantTwoTone"

export default function ProfilePage({ user, setUser, guestState }) {
   //const params = useParams().id
   let { name, id, age_group, email, bio, image_url, app_color, text_color } = user
   const [deleted, setDeleted] = useState(false)
   const [toggleEdit, setToggleEdit] = useState(false)
   const [updateProfile, setUpdateProfile] = useState(user)
   const history = useHistory()

   async function handleDelete() {
      const res = await fetch(`${API_ROOT}/users/${id}`, {
         method: "DELETE",
         headers: HEADERS,
      })
      const data = await res.json()
      if (data.error) {
         alert(data.error)
      } else {
         setDeleted(!deleted)
         setTimeout(() => {
            setUser(guestState)
            history.push("/")
         }, 1000)
      }
   }

   function handleProfileUpdate(e) {
      console.log(e.target.value)
      setUpdateProfile({ ...updateProfile, [e.target.name]: e.target.value })
   }

   const handleErrors = e => console.log(e)
   const handleSuccess = data => {
      setUser(data)
      setToggleEdit(!toggleEdit)
   }

   const submitProfileUpdate = e => {
      e.preventDefault()
      handleUpdate(updateProfile, "users", id, handleErrors, handleSuccess)
   }

   useEffect(() => {
      if (name === "Guest") return history.push("/")
   }, [name, history])

   return (
      <div>
         {deleted ? (
            <p>We're sorry to see you go!</p>
         ) : (
            <>
               {toggleEdit ? (
                  <Card variant="outlined" className="divider">
                     <h2>Update Profile</h2>
                     <form onSubmit={submitProfileUpdate}>
                        <label htmlFor="name">Name: </label>
                        <input
                           onChange={handleProfileUpdate}
                           name="name"
                           type="text"
                           value={updateProfile.name}
                        />
                        <br />
                        <label htmlFor="email">Email: </label>
                        <input
                           onChange={handleProfileUpdate}
                           name="email"
                           type="text"
                           value={updateProfile.email}
                        />
                        <br />
                        <div className="shift-right">
                           <label htmlFor="bio">Bio: </label>
                           <input
                              onChange={handleProfileUpdate}
                              name="bio"
                              type="textarea"
                              value={updateProfile.bio}
                           />
                        </div>

                        <label htmlFor="image_url">Avatar: </label>
                        <input
                           onChange={handleProfileUpdate}
                           name="image_url"
                           type="textarea"
                           value={updateProfile.image_url}
                        />
                        <div className="shift-left">
                           <label htmlFor="app_color">App Color: </label>

                           <input
                              type="color"
                              name="app_color"
                              value={updateProfile.app_color}
                              onChange={handleProfileUpdate}></input>
                           <br />
                           <label htmlFor="text_color">Text Color: </label>
                           <input
                              type="color"
                              name="text_color"
                              value={updateProfile.text_color}
                              onChange={handleProfileUpdate}></input>
                        </div>
                        <Button type="submit" variant="contained" className="floatButton">
                           {" "}
                           <SaveTwoToneIcon />
                        </Button>
                     </form>
                  </Card>
               ) : (
                  <div className="divider">
                     <h2>User Profile for {name}</h2>

                     <ul>
                        <li>Email:{email}</li> <br /> <li>Bio: {bio}</li> <br />
                        <li>Age Group: {age_group}</li>
                     </ul>
                  </div>
               )}
               <Button type="submit" variant="contained" onClick={() => setToggleEdit(!toggleEdit)}>
                  <AssistantTwoToneIcon />
               </Button>
               <Button type="submit" variant="contained" onClick={handleDelete}>
                  <DeleteTwoToneIcon />
               </Button>
            </>
         )}
      </div>
   )
}
