import React from "react"

export default function LogInPage() {
   return (
      <div>
         <h2>Log In!</h2>
         <form>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Email Address" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" />
            <button>Submit</button>
         </form>
         <p>Don't have a log-in? Sign-Up here!</p>
      </div>
   )
}
