import React from "react"
import { Card } from "@material-ui/core"

export default function LoggedInPage({ name }) {
   return (
      <Card className="lower">
         <h2>Welcome {name}!</h2>
         <p>You're free to start chatting!</p>
      </Card>
   )
}
