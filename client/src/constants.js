export const API_ROOT = "https://infinite-cove-97966.herokuapp.com"
export const API_WS_ROOT = "wss://infinite-cove-97966.herokuapp.com/cable"
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

export async function handleUpdate(newObj, path, id, errorHandler, successHandler) {
   const res = await fetch(`${API_ROOT}/${path}/{${id}}`, {
      method: "PATCH",
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

export const colorOptions = (
   <>
      {" "}
      <option value="#3D3B8E">Dark Slate</option>
      <option value="#1446A0">Cobalt</option>
      <option value="#DE8F6E">Copper</option>
      <option value="#904C77">Plum</option>
      <option value="#14B82A">Lime</option>
      <option value="#D4B2D8">Lavender</option>
      <option value="#92140C">Ruby</option>
      <option value="#166088">Sapphire</option>
      <option value="#F7B32B">Honey</option>
      <option value="#00916E">Emerald</option>
      <option value="#000">Black</option>
      <option value="#ccc">Silver</option>
      <option value="#46351D">Coffee</option>
      <option value="#F3E9D2">Champagne</option>
      <option value="white">White</option>
   </>
)
