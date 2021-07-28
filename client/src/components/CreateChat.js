import React from "react"

export default function CreateChat() {
   return (
      <div>
         <div>
            <h2>Create Chat Room!</h2>
            <form>
               <label htmlFor="title">Title: </label>
               <input type="text" name="title" placeholder="Enter Title" />
               <label htmlFor="description">Description: </label>
               <input type="textarea" name="description" placeholder="Enter Description" />
               <label htmlFor="location">Location: </label>
               <input type="text" name="location" placeholder="Enter Location" />
               <label htmlFor="ageGroup">Select Age Group: </label>
               <select name="ageGroup">
                  <option>--select one--</option>
                  <option value="family">Family</option>
                  <option value="adult">Adult</option>
               </select>
               <button>Create</button>
            </form>
            <p>*Note: Age group will determine who can access your chatroom</p>
         </div>
      </div>
   )
}
