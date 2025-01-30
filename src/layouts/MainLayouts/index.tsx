import { Outlet } from "react-router";
import { Header } from "../../components/Header/index";
import { Footer } from "../../components/Footer";
import styles from './styles.module.scss';
export const MainLayout: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );

    
};