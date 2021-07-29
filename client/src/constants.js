export const API_ROOT = "http://localhost:3000"
export const API_WS_ROOT = "ws://localhost:3000/cable"
export const HEADERS = {
   "Content-Type": "application/json",
   Accept: "application/json",
}

export async function handleCreate(newObj, path, errorHandler, successHandler) {
   const res = await fetch(`${API_ROOT}/${path}`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(newObj),
   })

   const data = await res.json()
   if (data.id) {
      successHandler(data)
   } else {
      console.log(data.error)
      errorHandler(data.error)
   }
}
