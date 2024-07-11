import { Navbar } from "@/components/NavBar";
import { Outlet } from "react-router-dom";

const AuthenticatedLayout = () => {
    return(
        <>
        <Navbar/>
        <Outlet/>
        </>
    )
}

export default AuthenticatedLayout ;