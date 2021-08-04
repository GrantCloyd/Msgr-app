import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, Popper } from "@material-ui/core"
import TextsmsTwoToneIcon from "@material-ui/icons/TextsmsTwoTone"
import InfoTwoToneIcon from "@material-ui/icons/InfoTwoTone"
import FontDownloadTwoToneIcon from "@material-ui/icons/FontDownloadTwoTone"
import ChildCareTwoToneIcon from "@material-ui/icons/ChildCareTwoTone"
import SupervisorAccountTwoToneIcon from "@material-ui/icons/SupervisorAccountTwoTone"

export default function ChatLi({ id, title, admin, location, description, age_group, userId }) {
   const anchorEl = useRef()
   const [openState, setOpenState] = useState(false)

   return (
      <div className="divider">
         <Card>
            <li>
               {age_group === "Adult" ? (
                  <Button className="floatLeftButton">
                     {" "}
                     <FontDownloadTwoToneIcon />{" "}
                  </Button>
               ) : (
                  <Button className="floatLeftButton">
                     {" "}
                     <ChildCareTwoToneIcon />{" "}
                  </Button>
               )}
               {admin.id === userId ? (
                  <Button className="floatLeftButton">
                     <SupervisorAccountTwoToneIcon />{" "}
                  </Button>
               ) : null}
               <Button
                  onClick={() => setOpenState(!openState)}
                  ref={anchorEl}
                  className="floatButton"
                  type="submit"
                  variant="contained">
                  <Link>
                     {" "}
                     <InfoTwoToneIcon />
                  </Link>
               </Button>
               <Popper anchorEl={anchorEl.current} placement="top" open={openState}>
                  {" "}
                  <Card className="divider">
                     <p>Location: {location}</p>

                     <p>Description: {description}</p>
                     <p>Admin: {admin.name}</p>
                  </Card>
               </Popper>
               <Button className="floatButton" type="submit" variant="contained">
                  <Link to={`/chat/${title}/${id}`}>
                     {" "}
                     <TextsmsTwoToneIcon />
                  </Link>
               </Button>
               <span> Title: {title.length > 30 ? `${title.slice(0, 30)}...` : title} </span>
            </li>
         </Card>
      </div>
   )
}
