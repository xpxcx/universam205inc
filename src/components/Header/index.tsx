import { Link } from 'react-router';
import styles from './styles.module.scss';
import { useGetCartQuery } from '../../redux/apiSlice';
import { useGetCurrentUserQuery } from '../../redux/userApiSlice';

export const Header = () => {
    const { data: cartItem} = useGetCartQuery();
    const { data: user } = useGetCurrentUserQuery();
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <Link to='/' className={styles.linkHome}>
                <h1 className={styles.title}>Универсам 205</h1>
                </Link>
                <div className={styles.headerElem}>
                    {user?.role === 'admin' && 
                    <Link to='/admin'>
                        <img className={cartItem?.totalPrice === 0 ? styles.adminCartEmpty : styles.admin} src="/img/adminPanel.svg" alt="" />
                    </Link>
                    }
                    
                    <Link to='/profile'><img className={cartItem?.totalPrice === 0 ? styles.profileCartEmpty : styles.profile} src="img/profile.svg" alt="profilcde" width={35} height={35}/></Link>
                    <Link to='/favorite'>
                            <img className={cartItem?.totalPrice === 0 ? styles.favoriteCartEmpty : styles.favorite} src="/img/liked.svg" alt=""/>
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
        </div>
    );
};