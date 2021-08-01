import "./App.css"

import { Switch, Route } from "react-router-dom"
import { useState } from "react"

import LogInPage from "./components/logInPage"
import SignUpPage from "./components/SignUpPage"
import CreateChat from "./components/CreateChat"
import ChatPage from "./components/ChatPage"
import NavBar from "./components/NavBar"
import ProfilePage from "./components/ProfilePage"
import ChatList from "./components/ChatList"

function App() {
   const initialUserState = {
      name: "Guest",
      id: "",
      image_url: "",
      bio: "",
      age_group: "",
   }
   const [user, setUser] = useState(initialUserState)
   if (user.name === "Guest")
      return <Route exact path="/" component={() => <LogInPage user={user} setUser={setUser} />} />

   return (
      <Switch>
         <div className="App">
            <h1>MSGR APP</h1>
            <NavBar userId={user.id} setUser={setUser} guestState={initialUserState} />
            <hr />
            <Route exact path="/" component={() => <LogInPage user={user} setUser={setUser} />} />
            <hr />
            <Route path="/signup" component={SignUpPage} />
            <hr />
            <Route
               path="/createchat"
               component={() => (
                  <CreateChat userAgeGroup={user.age_group} userName={user.name} userId={user.id} />
               )}
            />
            <hr />
            <Route
               path="/find"
               component={() => <ChatList userAgeGroup={user.age_group} userName={user.name} />}
            />
            <Route
               path="/chat/:title/:id"
               component={() => <ChatPage userName={user.name} userId={user.id} />}
            />
            <hr />
            <Route
               path="/profile/:id"
               component={() => (
                  <ProfilePage user={user} setUser={setUser} guestState={initialUserState} />
               )}
            />
         </div>
      </Switch>
   )
}

export default App
