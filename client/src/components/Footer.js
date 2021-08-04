import React from "react"
import { Card } from "@material-ui/core"

export default function Footer() {
   return (
      <footer className="footer">
         <br />
         <Card className="divider">
            <img alt="logo" className="logo" src="https://i.imgur.com/k47edoR.png" />
            <ul>
               <li>est. 2021</li>
               <li>created by: Grant Cloyd </li>
               <li>
                  {" "}
                  <a href="mailto:dgcloyd@gmail.com"> dgcloyd@gmail.com </a>
               </li>

               <li>//Flatiron Phase 4 </li>
               <li></li>
            </ul>
         </Card>
      </footer>
   )
}
