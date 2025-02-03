import styles from './styles.module.scss'
import { OrderResponse, useGetOrderQuery, useOrderEditRoomMutation } from '../../redux/orderApiSlice';
import React from 'react';
import { useForm } from 'react-hook-form';
type Order = {
    orderResponse: OrderResponse | null,
}
type FormInput = {
    room: string
}
export const Order: React.FC<Order> = ({ orderResponse }) => {

    const [isDelivery, setIsDelivery] = React.useState(false);
    const [isRoomApprove, setIsRoomAprove] = React.useState(true);
    const [changeRoom] = useOrderEditRoomMutation();

    const { data: order } = useGetOrderQuery({id: orderResponse?.id})
     const {
            register,
            handleSubmit
        } = useForm<FormInput>();
    const onChangeRoom = async(data: FormInput) => {
        if(orderResponse) {
            changeRoom({
                room: data.room, 
                orderId: orderResponse.id
            });
        }
        setIsRoomAprove(true);
        
    }
    
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
                        <p className={isDelivery ? styles.activeP : ''}onClick={() => setIsDelivery(true)}>Да</p>
                        <p className={isDelivery ? '' : styles.activeP}onClick={() => setIsDelivery(false)}>Нет</p>
                    </div>
                    {isDelivery ? 
                    <form onSubmit={handleSubmit(onChangeRoom)}>
                    <div className={styles.question2}>

                        <h2>Ваша Комната</h2> 
                        {isRoomApprove ? 
                        <div className={styles.RoomAprove}>
                            <h2 className={styles.room}> {order?.deliveryRoom}?</h2>
                            <p className={isRoomApprove ? styles.activeP : ''}onClick={() => setIsRoomAprove(true)}>Да</p>
                            <p className={isRoomApprove ? '' : styles.activeP}onClick={() => setIsRoomAprove(false)}>Нет</p>
                        </div>
                         : 
                        <div className={styles.changeRoom}>
                                <input 
                            {...register('room', 
                                {
                                    required: 'Это обязательное поле'
                                }
                            )}
                            defaultValue={orderResponse?.deliveryRoom !== null ?  orderResponse?.deliveryRoom : ''}                        
                            ></input>
                            <button className={styles.onApproveRoom}onClick={() => onChangeRoom}>
                            <img src="/img/check-mark.svg" width={15} height={15}alt="" />

                            </button>
                            <img src="/img/cross.svg" width={11} height={11}alt="" onClick={() => setIsRoomAprove(true)}/>

                        </div>
                        }
                        
                        
                    </div>
                    </form>
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