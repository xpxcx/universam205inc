import { useGetCartQuery, useRemoveFromCartMutation } from '../../redux/apiSlice';
import styles from './styles.module.scss';

export const Cart = () => {
    const { data: cartItem } = useGetCartQuery(1);
    const [removeFromCart] = useRemoveFromCartMutation();
    const onClickDelelte = (productId:number) => (
        removeFromCart(productId)
    );
    const totalCountProduct = () => {
        return cartItem?.Products.reduce((sum, item) => sum + item.CartItem.quantity, 0);
    };
    const totalPriceInCart = () => {
        return cartItem?.Products?.reduce((sum, item) => sum + (item.price*item.CartItem.quantity), 0);
    }
    return (
        <div className={styles.cart}>
                {cartItem?.Products?.map((obj) => (
                <>
            <div className={styles.item}>

                <div className={styles.itemimg}>
                    <img src={obj.imageUrl} alt="items-img" />
                </div>
                <div className={styles.productInfo}>
                    <h2 className={styles.title}>{obj.title}</h2>
                    <p className={styles.pricetext}>Цена за 1 шт:</p>
                    <p className={styles.price}>{obj.price} ₽</p>
                </div>
                <p className={styles.sizeItem}>{obj.size}{obj.unit}</p>

                <div className={styles.countItem}>
                    <p className={styles.plus}>+</p>
                    <p className={styles.count}>{obj.CartItem.quantity}</p>
                    <p className={styles.minus}>-</p>
                </div>
                <p className={styles.totalPrice}>{Math.round(cartItem.totalPrice)} ₽</p>
                <img className={styles.trash} src='/img/trash.svg' width={17} height={17} onClick={() => onClickDelelte(obj.id)}/>
            </div>
                
                </>
            ))}
            <p>Общая сумма: {totalPriceInCart()}</p>
        </div>
        
    );
};
