import React, { useState, useEffect } from "react"
import { API_ROOT, HEADERS, handleUpdate } from "../constants"
import { useHistory } from "react-router-dom"

export default function ProfilePage({ user, setUser, guestState }) {
   //const params = useParams().id
   let { name, id, age_group, email, bio, image_url } = user
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
   const handleSucess = data => {
      setUser(data)
      setToggleEdit(!toggleEdit)
   }

   const submitUpdate = e => {
      e.preventDefault()
      handleUpdate(updateProfile, "users", id, handleErrors, handleSucess)
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
                  <>
                     <h2>Update Profile</h2>
                     <form onSubmit={submitUpdate}>
                        <label htmlFor="name">Name: </label>
                        <input
                           onChange={handleProfileUpdate}
                           name="name"
                           type="text"
                           value={updateProfile.name}
                        />
                        <label htmlFor="email">Email: </label>
                        <input
                           onChange={handleProfileUpdate}
                           name="email"
                           type="text"
                           value={updateProfile.email}
                        />
                        <label htmlFor="bio">Bio: </label>
                        <input
                           onChange={handleProfileUpdate}
                           name="bio"
                           type="textarea"
                           value={updateProfile.bio}
                        />
                        <label htmlFor="image_url">Avatar: </label>
                        <input
                           onChange={handleProfileUpdate}
                           name="image_url"
                           type="textarea"
                           value={updateProfile.image_url}
                        />
                        <br />
                        <button> Save Changes</button>
                     </form>
                  </>
               ) : (
                  <>
                     <h2>User Profile for {name}</h2>
                     <ul>
                        <li>
                           <img alt="Avatar" src={image_url} />{" "}
                        </li>{" "}
                        <li>Email:{email}</li> <li>Bio: {bio}</li> <li>Age Group: {age_group} </li>
                     </ul>
                  </>
               )}
               <button onClick={() => setToggleEdit(!toggleEdit)}>Update information!</button>
               <button onClick={handleDelete}>Delete Account</button>
            </>
         )}
      </div>
   )
}
