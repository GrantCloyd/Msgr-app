import "./App.css"
import LogInPage from "./components/logInPage"
import SignUpPage from "./components/SignUpPage"
import CreateChat from "./components/CreateChat"
import ChatPage from "./components/ChatPage"
import NavBar from "./components/NavBar"
import ProfilePage from "./components/ProfilePage"
import ChatList from "./components/ChatList"

function App() {
   return (
      <div className="App">
         <h1>MSGR APP</h1>
         <NavBar />
         <hr />
         <LogInPage />
         <hr />
         <SignUpPage />
         <hr />
         <CreateChat />
         <hr />
         <ChatList />
         <ChatPage />
         <hr />
         <ProfilePage />
      </div>
   )
}

export default App
