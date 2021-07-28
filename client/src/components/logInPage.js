import React from "react"
import { Link } from "react-router-dom"

export default function LogInPage() {
   return (
      <div>
         <h2>Welcome to localHost - please sign-in!</h2>
         <h2>Log In!</h2>
         <form>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Email Address" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" />
            <button>Submit</button>
         </form>
         <p>
            Don't have a log-in? <Link to="/signup">Sign-Up here!</Link>
         </p>
      </div>
   )
}
