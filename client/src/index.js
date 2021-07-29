import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { API_WS_ROOT } from "./constants"

import { BrowserRouter } from "react-router-dom"
import { ActionCableProvider } from "react-actioncable-provider"
import reportWebVitals from "./reportWebVitals"

ReactDOM.render(
   <React.StrictMode>
      <ActionCableProvider url={API_WS_ROOT}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </ActionCableProvider>
   </React.StrictMode>,
   document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
