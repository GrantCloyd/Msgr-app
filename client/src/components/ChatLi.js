import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, Popper } from "@material-ui/core"
import TextsmsTwoToneIcon from "@material-ui/icons/TextsmsTwoTone"
import InfoTwoToneIcon from "@material-ui/icons/InfoTwoTone"

export default function ChatLi({ id, title, admin, location, description, age_group }) {
   const anchorEl = useRef()
   const [openState, setOpenState] = useState(false)

   return (
      <div className="divider">
         <Card>
            <li>
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
                  </Card>
               </Popper>
               <Button className="floatButton" type="submit" variant="contained">
                  <Link to={`/chat/${title}/${id}`}>
                     {" "}
                     <TextsmsTwoToneIcon />
                  </Link>
               </Button>
               <span> Title: {title.length > 30 ? `${title.slice(0, 30)}...` : title} </span>
               <span>
                  || {age_group} || Admin: {admin.name}{" "}
               </span>
            </li>
         </Card>
      </div>
   )
}
