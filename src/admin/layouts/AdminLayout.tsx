import { Outlet } from "react-router"

export const AdminLayout = () => {

    return (
        <div className="bg-amber-900">
            <Outlet />
        </div>

    )
}