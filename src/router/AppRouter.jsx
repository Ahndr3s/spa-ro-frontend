import { Route, Routes } from "react-router-dom"
import { PrivateRoutes } from "./PrivateRoutes"
import { PublicPages } from "../pages/routes/PublicPages"
import { Login } from "../pages/Login"

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/*" element={<PublicPages><PrivateRoutes/></PublicPages>}/>
            <Route path="login" element={<Login/>}/>
        </Routes>
    </>
  )
}
