import "./App.css"

import { Switch, Route } from "react-router-dom"
import { useState } from "react"
import Header from "./components/Header"
import LogInPage from "./components/logInPage"
import SignUpPage from "./components/SignUpPage"
import CreateChat from "./components/CreateChat"
import ChatPage from "./components/ChatPage"
import NavBar from "./components/NavBar"
import ProfilePage from "./components/ProfilePage"
import ChatList from "./components/ChatList"
import Footer from "./components/Footer"

function App() {
   const initialUserState = {
      name: "Guest",
      id: "",
      image_url: "",
      bio: "",
      age_group: "",
      app_color: "",
      text_color: "",
   }
   const [user, setUser] = useState(initialUserState)
   const styleObj = { backgroundColor: user.app_color, color: user.text_color }

   if (user.name === "Guest")
      return (
         <Switch>
            <Route exact path="/" component={() => <LogInPage user={user} setUser={setUser} />} />
            <Route path="/signup" component={SignUpPage} />
         </Switch>
      )

   return (
      <Switch>
         <div style={styleObj} className="App">
            <Header />
            <div className="content">
               <NavBar
                  userId={user.id}
                  userImage={user.image_url}
                  setUser={setUser}
                  guestState={initialUserState}
                  styleObj={styleObj}
               />

               <Route
                  exact
                  path="/"
                  component={() => <LogInPage user={user} setUser={setUser} />}
               />

               <Route
                  path="/createchat"
                  component={() => (
                     <CreateChat
                        userAgeGroup={user.age_group}
                        userName={user.name}
                        userId={user.id}
                     />
                  )}
               />

               <Route
                  path="/find"
                  component={() => (
                     <ChatList
                        userId={user.id}
                        userAgeGroup={user.age_group}
                        userName={user.name}
                     />
                  )}
               />
               <Route
                  path="/chat/:title/:id"
                  component={() => (
                     <ChatPage
                        userName={user.name}
                        userId={user.id}
                        userAppColor={user.app_color}
                        userTextColor={user.text_color}
                     />
                  )}
               />

               <Route
                  path="/profile/:id"
                  component={() => (
                     <ProfilePage user={user} setUser={setUser} guestState={initialUserState} />
                  )}
               />
            </div>
            <Footer />
         </div>
      </Switch>
   )
}

export default App
