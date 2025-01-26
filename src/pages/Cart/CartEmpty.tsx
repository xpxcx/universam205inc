import { Link } from "react-router";
import styles from './styles.module.scss';
export const CartEmpty: React.FC = () => {
    return (
        <div className={styles.clearCart}>
            <img className={styles.clearCartImg} width={95} height={95}src="/img/clear-cart.svg" alt="" />
            <h2 className={styles.title}>Корзина пуста</h2>
            <p className={styles.descr}>Добавьте что нибудь и всё появится!</p>
            <Link to='/'>
                <button>Вернуться к товарам</button>
            </Link>
        </div>
    );
}