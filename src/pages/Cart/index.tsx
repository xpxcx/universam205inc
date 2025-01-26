import { useGetCartQuery, useRemoveAllCartMutation, useRemoveFromCartMutation, useUpdateCountProductMutation } from '../../redux/apiSlice';
import { CartEmpty } from './CartEmpty';
import styles from './styles.module.scss';

export const Cart = () => {
    const { data: cartItem } = useGetCartQuery(1);
    const [removeFromCart] = useRemoveFromCartMutation();
    const onClickDelelte = (productId:number) => (
        removeFromCart(productId)
    );
    const [removeAllCart] = useRemoveAllCartMutation();
    const [updateCountProduct] = useUpdateCountProductMutation();
    
    const onClickPlus = async (productId: number, quantity: number) => {
        await updateCountProduct({
            productId,
            quantity: quantity + 1,
        })
    }
    const onClickMinus = async(productId: number, quantity: number) => {
        await updateCountProduct({
            productId,
            quantity: quantity - 1,
        })
    }
    return (
        cartItem?.totalCount === 0 ?
        <CartEmpty/> 
        :
        (<div className={styles.cart}>
            <button className={styles.clearCartButton} onClick={() => removeAllCart()}>Очистить корзину</button>
                {cartItem?.Products?.map((obj) => (
                
                
                <div key={obj.id} className={styles.item}>

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
                    <button className={styles.plus} onClick={() => onClickPlus(obj.id, obj.CartItem.quantity)}>+</button>
                    <p className={styles.count}>{obj.CartItem.quantity}</p>
                    <button className={styles.minus} onClick={() => onClickMinus(obj.id, obj.CartItem.quantity)} disabled={obj.CartItem.quantity === 1}>-</button>
                </div>
                <p className={styles.totalPrice}>{Math.round(cartItem.totalPrice)} ₽</p>
                <img className={styles.trash} src='/img/trash.svg' width={17} height={17} onClick={() => onClickDelelte(obj.id)}/>
            </div>
                
                
            ))}
            <p>Общая сумма: {Math.round(cartItem?.totalPrice ?? 0)}</p>
            <button className={styles.buttonOrder}>Оформить заказ</button>
        </div>)
        
    );
};
