import { Link } from 'react-router';
import styles from './styles.module.scss';

export const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <Link to='/' className={styles.linkHome}>
                <h1 className={styles.title}>Универсам 205</h1>
                </Link>
                    <Link to='/cart' className={styles.linkCart}>
                    <div className={styles.cart}>
                        <img className={styles.cartLogo}src="/img/cart-logo.svg" alt="" />
                        <p className={styles.totalPrice}>0</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};