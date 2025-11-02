import { useGetAllOrderQuery } from "../../redux/orderApiSlice";

export const MyOrders = () => {
    const { data: orders } = useGetAllOrderQuery();
    return (
        <div>
            <h1>Мои Заказы</h1>
            {orders?.map((i,order) => (
                <div key={order.id}>
                    <p>Номер Заказа: {i}</p>
                    <p>Сумма: {order.totalPrice}</p>
                </div>
            ))}
        </div>
    );
};


