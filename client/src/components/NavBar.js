import React from "react"
import { NavLink, Link, useHistory } from "react-router-dom"
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone"
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone"
import ForumTwoToneIcon from "@material-ui/icons/ForumTwoTone"
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone"
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone"
import { Button, Card } from "@material-ui/core"

export default function NavBar({ userId, setUser, guestState, userImage, styleObj }) {
   const history = useHistory()

   const handleLogOut = () => {
      setUser(guestState)
      history.push("/")
   }
   return (
      <nav>
         <Card style={styleObj}>
            {" "}
            <Button type="submit" variant="contained">
               <NavLink to="/">
                  {" "}
                  <HomeTwoToneIcon />
               </NavLink>
            </Button>{" "}
            |{" "}
            <Button type="submit" variant="contained">
               <NavLink to={`/profile/${userId}`}>
                  <AccountCircleTwoToneIcon />{" "}
               </NavLink>
            </Button>{" "}
            |{" "}
            <Button type="submit" variant="contained">
               <NavLink to="/find">
                  {" "}
                  <ForumTwoToneIcon />{" "}
               </NavLink>{" "}
            </Button>{" "}
            |{" "}
            <Button type="submit" variant="contained">
               <NavLink to="/createchat">
                  <AddCircleTwoToneIcon />
               </NavLink>
            </Button>{" "}
            |{" "}
            <Button type="submit" variant="contained">
               <Link onClick={handleLogOut}>
                  <ExitToAppTwoToneIcon />
               </Link>
            </Button>
            <br />
            <br />
            <img src={userImage} />
         </Card>
      </nav>
   )
}
