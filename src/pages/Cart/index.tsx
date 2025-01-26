import { useGetCartQuery } from '../../redux/apiSlice';
import styles from './styles.module.scss';
export const Cart = () => {
    const { data: cartItem } = useGetCartQuery(1);
    return (
        <div className={styles.cart}>
            <div className={styles.item}>
                {cartItem?.Products?.map((obj) => (
                <>
                <div className={styles.itemimg}>
                    <img src={obj.imageUrl} alt="items-img" />
                </div>
                <h2 className={styles.title}>{obj.title}</h2>
                <p className={styles.sizeItem}>{obj.size}{obj.unit}</p>
                <p className={styles.pricetext}>Цена за 1 шт:</p>
                <p className={styles.price}>{obj.price} ₽</p>
                <div className={styles.countItem}>
                    <p className={styles.plus}>+</p>
                    <p className={styles.count}>1</p>
                    <p className={styles.minus}>-</p>
                </div>
                <p className={styles.totalPrice}>{obj.price} ₽</p>
                <img className={styles.trash} src='/img/trash.svg' width={17} height={17}/>
                
                </>
            ))}
            </div>
        </div>
    );
};