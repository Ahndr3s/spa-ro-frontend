import { Route, Routes } from "react-router-dom"
import { PrivateRoutes } from "./PrivateRoutes"
import { PublicPages } from "../pages/routes/PublicPages"

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/*" element={<PublicPages><PrivateRoutes/></PublicPages>}/>
        </Routes>
    </>
  )
}
