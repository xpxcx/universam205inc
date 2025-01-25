type CartItemProps = {
    title: string,
    price: number,
    imageUrl: string,
    size: number,
    unit: string,
}
export const CartItem: React.FC<CartItemProps> = ({ title, price, imageUrl, size, unit}) => {
    return (
        <div className="items">
            <div className="item">
                <div className="item-img">
                    <img src={imageUrl} alt="items-img" />
                </div>
                <h2>{title}</h2>   
                <p className="price-text">Цена за 1 шт:</p>
                <p className="price">{price} ₽</p>
                <p className="size-item"></p>
                <div className="size-item">
                    <p>{size}{unit}</p>
                </div>
                <img className='add-cart-button'src="/img/add-cart.svg" alt="plus" />
            </div>
           

        </div>
    );
};