import React from 'react';
import { Modal} from '../../components/Modal';
import { Order } from '../../components/Order/index';
import { useGetCartQuery, useRemoveAllCartMutation, useRemoveFromCartMutation, useUpdateCountProductMutation } from '../../redux/apiSlice';
import { CartEmpty } from './CartEmpty';
import styles from './styles.module.scss';
import { useCreateOrderMutation } from '../../redux/orderApiSlice';
import { OrderResponse } from '../../redux/orderApiSlice';
import { Link } from 'react-router';
import { debounce } from 'lodash';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
interface CartQuantityState {
    productId: number;
    quantity: number;
}
export const Cart = () => {
    const [isOrderModalOpened, setIsOrderModalOpened] = React.useState(false);
    const [orderResponse, setOrderResponse] = React.useState<OrderResponse | null>(null);
    const { data: cartItem, isLoading } = useGetCartQuery();
    const [removeFromCart] = useRemoveFromCartMutation();
    const [removeAllCart] = useRemoveAllCartMutation();
    const [updateCountProduct] = useUpdateCountProductMutation();
    const [createOrder] = useCreateOrderMutation();
    const [cartQuantity, setCartQuantity] = React.useState<CartQuantityState[]>([]);
    const { refetch: refetchCart } = useGetCartQuery();
    const onClickDelelte = (productId:number) => (
        removeFromCart(productId)
    );
    const updateQuantity = (productId: number, quantity: number, quantityEdit: number) => {
        setCartQuantity(prev => {
            const currentQuantity = prev.find(item => item.productId === productId)?.quantity ?? quantity;
            const newQuantity = currentQuantity + quantityEdit;
            
            const existingIndex = prev.findIndex(item => item.productId === productId);
            return existingIndex === -1
                ? [...prev, { productId, quantity: newQuantity }]
                : prev.map(item => 
                    item.productId === productId 
                        ? { ...item, quantity: newQuantity }
                        : item
                );
        });
    }
    const onClickPlus = (productId: number, quantity: number) => {
        updateQuantity(productId, quantity, +1);
    }
    const onClickMinus = async(productId: number, quantity: number) => {
        updateQuantity(productId, quantity, -1);
    }
    React.useEffect(() => {
        if (cartQuantity.length === 0) return;

        const debouncedUpdate = debounce(() => {
            cartQuantity.forEach(item => {
                updateCountProduct({
                    productId: item.productId,
                    quantity: item.quantity
                });
            });
        }, 1000);
        debouncedUpdate();
        return () => debouncedUpdate.cancel();
    }, [cartQuantity, updateCountProduct]);
    const onClickOrder = async() => {
        const response = await createOrder().unwrap();
        setOrderResponse(response);
        setIsOrderModalOpened(true);
        
    }   
    if (!localStorage.getItem('token')) {
        return <div className={styles.unAuth}>
            <h3>Похоже, Вы ещё не авторизованы</h3>
            <Link to='/authorization'>
            <p>Авторизация</p>
            </Link>
        </div>
    }
    const onClickClose = () => {
        setIsOrderModalOpened(false);
        refetchCart();
    } 
    return (
        isLoading ? 
            <div className={styles.loadingWindow}>
            <Flex align="center" gap="middle">
            <Spin indicator={<LoadingOutlined style={{fontSize: 65}}spin />} size="large"  className={styles.spinner}/>
            </Flex> 
            </div> 
            :  
       ( cartItem?.totalCount === 0 || !localStorage.getItem('token')) ?
        <CartEmpty/> 
        :
        (<div className={styles.cart}>
            <button className={styles.clearCartButton} onClick={() => removeAllCart()}>Очистить корзину</button>
            <div className={styles.items}>
                {cartItem?.Products?.map((obj) => (
                
                
                <div key={obj.id} className={styles.item}>

                <div className={styles.itemimg}>
                    <img src={obj.imageUrl} alt="items-img" />
                </div>
                <div className={styles.productInfo}>
                    <h2 className={styles.title}>{obj.title}, <span className={styles.size}>{obj.size}{obj.unit}</span></h2>
                    <p className={styles.pricetext}>Цена за 1 шт:</p>
                    <p className={styles.price}>{obj.price} ₽</p>
                    <p className={styles.totalItemPrice}>{obj.CartItem.quantity} * {obj.price} ₽ = <span >{Math.round(obj.price * obj.CartItem.quantity)}₽</span></p>
                </div>
                

                <div className={styles.countItem}>
                    <button className={styles.plus} onClick={() => onClickPlus(obj.id, obj.CartItem.quantity)} disabled={obj.inStock <= (cartQuantity.find(item => item.productId === obj.id)?.quantity ?? obj.CartItem?.quantity)}>+</button>
                    <p className={styles.count}>{cartQuantity.find(item => item.productId === obj.id)?.quantity ?? obj.CartItem.quantity}</p>
                    <button className={styles.minus} onClick={() => onClickMinus(obj.id, obj.CartItem.quantity)} disabled={obj.CartItem.quantity === 1}>-</button>
                </div>
                    <img className={styles.trash} src='/img/trash.svg' width={17} height={17} onClick={() => onClickDelelte(obj.id)}/>
            </div>
                
                
            ))}
            </div>
            <div className={styles.priceAndOrder}>
            <p className={styles.totalPrice}>Общая сумма: {Math.round(cartItem?.totalPrice ?? 0)}</p>
            <button className={styles.buttonOrder} onClick={onClickOrder}>Оформить заказ</button>
            {isOrderModalOpened && <Modal
            onClose={() => onClickClose()}
            stylesModal={'order'}>
                <Order
                orderResponse={orderResponse}
                />
            </Modal>}
            </div>
        </div>)

    );
};


