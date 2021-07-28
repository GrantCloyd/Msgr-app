import "./App.css"

import { Switch, Route } from "react-router-dom"

import LogInPage from "./components/logInPage"
import SignUpPage from "./components/SignUpPage"
import CreateChat from "./components/CreateChat"
import ChatPage from "./components/ChatPage"
import NavBar from "./components/NavBar"
import ProfilePage from "./components/ProfilePage"
import ChatList from "./components/ChatList"

function App() {
   return (
      <Switch>
         <div className="App">
            <h1>MSGR APP</h1>
            <NavBar />
            <hr />
            <Route exact path="/" component={LogInPage} />
            <hr />
            <Route path="/signup" component={SignUpPage} />
            <hr />
            <Route path="/createchat" component={CreateChat} />
            <hr />
            <Route path="/find" component={ChatList} />
            <Route path="/chat/:title" component={ChatPage} />
            <hr />
            <Route path="/profile/:id" component={ProfilePage} />
         </div>
      </Switch>
   )
}

export default App
