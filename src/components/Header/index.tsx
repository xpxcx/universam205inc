import { Link } from 'react-router';
import styles from './styles.module.scss';
import { useGetCartQuery } from '../../redux/apiSlice';

export const Header = () => {
    const { data: cartItem} = useGetCartQuery(1);
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <Link to='/' className={styles.linkHome}>
                <h1 className={styles.title}>Универсам 205</h1>
                </Link>
                    <Link to='/cart' className={styles.linkCart}>
                    <div className={cartItem?.totalPrice === 0 ? styles.cartEmpty : styles.cart}>
                        <img className={styles.cartLogo} src="/img/cart-logo.svg" alt="" />
                        {cartItem?.totalPrice === 0 ? null : 
                            <p className={styles.totalPrice}>{Math.round(cartItem?.totalPrice ?? 0)} ₽</p>
                        }
                        
                    </div>
                </Link>
            </div>
        </div>
    );
};