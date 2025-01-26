import { Outlet } from "react-router";
import { Header } from "../../components/Header/index";
import { Futer } from "../../components/Futer";
import styles from './styles.module.scss';
export const MainLayout: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <Header/>
            <Outlet/>
            <Futer/>
        </div>
    );

    
};