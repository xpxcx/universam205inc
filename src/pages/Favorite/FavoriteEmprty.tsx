import { Link } from "react-router";
import styles from './styles.module.scss';
export const FavoriteEmpty = () => {
    return (
        <div className={styles.clearCart}>
            <img className={styles.clearCartImg} width={95} height={95}src="/img/unLiked.svg" alt="" />
            <h2 className={styles.title}>В избранном ничего нет...</h2>
            <p className={styles.descr}>Сохраните что-нибудь и всё появится!</p>
            <Link to='/'>
                <button>Вернуться к товарам</button>
            </Link>
        </div>
    );
}