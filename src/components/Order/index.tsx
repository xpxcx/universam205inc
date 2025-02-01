import { useCreateOrderMutation } from '../../redux/orderApiSlice';
import styles from './styles.module.scss'
import { OrderResponse } from '../../redux/orderApiSlice';
import { useGetCurrentUserQuery } from '../../redux/userApiSlice';
import React from 'react';
type Order = {
    orderResponse: OrderResponse | null,
}
export const Order: React.FC<Order> = ({ orderResponse }) => {
    const [delivery, setDelivery] = React.useState(false);
    const [roomApprove, setRoomAprove] = React.useState(true);
    const { data: currentUser} = useGetCurrentUserQuery();
    return (
        <div className={styles.order}>
            <div className={styles.container}>
                <div className={styles.infoForClient}>
                <div className={styles.infoText}>
                    <h2 className={styles.thanks}>Спасибо за заказ!</h2>
                    <p>Для получения заказа сделайте скриншот этого окна и пришлите его одному из Нас:</p>
                </div>
                <div className={styles.connection}>
                    <a href="https://t.me/tg_dodopizza" className={styles.linkTG}>Сосед 1</a>
                    <a href="https://t.me/Minimixrey" className={styles.linkTG}>Сосед 2</a>
                </div>
                <div className={styles.pay}>
                    <p>Оплата:</p>
                    <img src="/img/payment.jpg" alt="" width={135} height={135}/>
                    <p>Или</p>
                    <p>8 (922) 775-90-02    (СберБанк)</p>
                </div>
                </div>
                <div className={styles.delivery}>
                    <div className={styles.question}>
                        <h2>Доставка: </h2>
                        <p className={delivery ? styles.activeP : ''}onClick={() => setDelivery(true)}>Да</p>
                        <p className={delivery ? '' : styles.activeP}onClick={() => setDelivery(false)}>Нет</p>
                    </div>
                    {delivery ? 
                    <div className={styles.question2}>
                        <h2>Ваша Комната {currentUser?.room}?</h2> 
                        <p className={roomApprove ? styles.activeP : ''}onClick={() => setRoomAprove(true)}>Да</p>
                        <p className={roomApprove ? '' : styles.activeP}onClick={() => setRoomAprove(false)}>Нет</p>
                    </div>
                    : null}
                    
                </div>
                <div className={styles.orderBlock}>
                <h2>Заказ:</h2>
                {orderResponse?.OrderItems.map((obj) => (
                    <div key={obj.id}className={styles.items}>
                    <h2 className={styles.title}>{obj.Product.title}</h2>
                    <div className={styles.a}>
                    <p className={styles.quantity}>{obj.quantity}</p>
                    <p className={styles.totalPrice}>{obj.quantity * obj.Product.price}₽</p>
                    </div>
                    
                </div>
                ))}
                
                <h3 className={styles.orderTotalPrice}>Итого: {orderResponse?.totalPrice}₽</h3>
                </div>


            </div>


        </div>
    );


}