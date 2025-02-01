import React from 'react';
import { ModalOrder } from '../../components/ModalOrder';
import { Order } from '../../components/Order/index';
import { useGetCartQuery, useRemoveAllCartMutation, useRemoveFromCartMutation, useUpdateCountProductMutation } from '../../redux/apiSlice';
import { CartEmpty } from './CartEmpty';
import styles from './styles.module.scss';
import { useCreateOrderMutation } from '../../redux/orderApiSlice';
import { OrderResponse } from '../../redux/orderApiSlice';
export const Cart = () => {
    const [orderModalOpened, setOrderModalOpened] = React.useState(false);
    const [orderResponse, setOrderResponse] = React.useState<OrderResponse | null>(null);
    const { data: cartItem } = useGetCartQuery();
    const [removeFromCart] = useRemoveFromCartMutation();
    const onClickDelelte = (productId:number) => (
        removeFromCart(productId)
    );
    const [removeAllCart] = useRemoveAllCartMutation();
    const [updateCountProduct] = useUpdateCountProductMutation();
    const [createOrder] = useCreateOrderMutation();

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
    const onClickOrder = async() => {
        const response = await createOrder().unwrap();
        setOrderResponse(response);
        setOrderModalOpened(true);
        
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
                    <button className={styles.plus} onClick={() => onClickPlus(obj.id, obj.CartItem.quantity)} disabled={obj.inStock <= obj.CartItem?.quantity}>+</button>
                    <p className={styles.count}>{obj.CartItem.quantity}</p>
                    <button className={styles.minus} onClick={() => onClickMinus(obj.id, obj.CartItem.quantity)} disabled={obj.CartItem.quantity === 1}>-</button>
                </div>
                <p className={styles.totalPrice}>{Math.round(obj.price * obj.CartItem.quantity)} ₽</p>
                <img className={styles.trash} src='/img/trash.svg' width={17} height={17} onClick={() => onClickDelelte(obj.id)}/>
            </div>
                
                
            ))}
            <p>Общая сумма: {Math.round(cartItem?.totalPrice ?? 0)}</p>
            <button className={styles.buttonOrder} onClick={onClickOrder}>Оформить заказ</button>
            {orderModalOpened && <ModalOrder
            onClose={() => setOrderModalOpened(false)}>
                <Order
                orderResponse={orderResponse}
                />
            </ModalOrder>}
        </div>)
        
    );
};
