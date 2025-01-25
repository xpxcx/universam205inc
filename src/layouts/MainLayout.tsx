import { Outlet } from "react-router";
import { Header } from "../components/Header";

export const MainLayout: React.FC = () => {
    return (
        <div className="wrapper">
            <Header/>
            <Outlet/>
        </div>
    );
};