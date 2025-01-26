import styles from './styles.module.scss';
type CartItemProps = {
    title: string,
    price: number,
    imageUrl: string,
    size: number,
    unit: string,
    inStock: number,
}

export const Product: React.FC<CartItemProps> = ({ title, price, imageUrl, size, unit, inStock}) => {
    return (
            <div className={styles.item}>
                <div className={styles.itemimg}>
                    <img src={imageUrl} alt="items-img" />
                </div>
                <h2>{title}</h2>   
                <p className={styles.pricetext}>Цена за 1 шт:</p>
                <p className={styles.price}>{price} ₽</p>
                <div className={styles.sizeItem}>
                    <p>{size}{unit}</p>
                </div>
                <div className={styles.instockBlock}>
                    <p>Наличие: </p>
                    <h2>{inStock > 0 ? inStock : "Товар закончился"}</h2>
                </div>
                
                <img className={styles.addCartButton}src="/img/add-cart.svg" alt="plus" />
            </div>
    );
};