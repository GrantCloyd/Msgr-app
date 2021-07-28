import React from "react"

export default function SignUpPage() {
   return (
      <div>
         <h2>Sign Up!</h2>
         <form>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Email Address" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder="Re-enter your password" />
            <label htmlFor="ageGroup">Select Age Group</label>
            <select name="ageGroup">
               Age Group
               <option>--select one--</option>
               <option value="family">Family</option>
               <option value="adult">Adult</option>
            </select>
            <button>Submit</button>
         </form>
         <p>*Note: Age group will determine chatrooms that you can access</p>
      </div>
   )
}
