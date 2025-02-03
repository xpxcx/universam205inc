import { useAddOnFavoriteMutation, useAddToCartMutation, useGetFavoriteQuery, useRemoveFromFavoriteMutation } from '../../redux/apiSlice';
import styles from './styles.module.scss';
type CartItemProps = {
    id: number,
    title: string,
    price: number,
    imageUrl: string,
    size: number,
    unit: string,
    inStock: number,
}


export const Product: React.FC<CartItemProps> = ({ id, title, price, imageUrl, size, unit, inStock}) => {
    const [addToFavorite] = useAddOnFavoriteMutation();
    const [addToCart] = useAddToCartMutation();
    const [removeFromFavorite] = useRemoveFromFavoriteMutation();
    const { data: favorites } = useGetFavoriteQuery();
    const addToCartBtn = (productId: number) => {
        if (!localStorage.getItem('token')) {
            alert('Сначала авторизируйтесь');
        }
        else{
            addToCart({
                productId, 
                quantity: 1,
            })
        }
        
       
    };
    const onClickUnFavorite = (productId: number) => {
        addToFavorite({ productId })
    };  

    const onClickFavorite = (productId: number) => {
        removeFromFavorite(productId)
    }

    const checkInFavorite = (productId: number) => {
        return favorites?.Products?.some((product) => product.id === productId) ?? false;
    };

    return (
            
            <div className={styles.item}>
                
                {checkInFavorite(id) ?  
                <img className={styles.favorite} src="/img/liked.svg" alt="liked" width={15} height={15} onClick={() => onClickFavorite(id)} /> 
                : 
                <img className={styles.favorite} src="/img/unLiked.svg" alt="unLiked" width={15} height={15} onClick={() => onClickUnFavorite(id)} />
                }
                <div className={styles.itemimg}>
                    <img src={imageUrl} alt="items-img" />
                </div>
                <h2 className={styles.title}>{title}</h2>   
                <p className={styles.pricetext}>Цена за 1 шт:</p>
                <p className={styles.price}>{Math.round(price)} ₽</p>
                <div className={styles.sizeItem}>
                    <p>{size}{unit}</p>
                </div>
                <div className={styles.instockBlock}>
                    <p>Наличие: </p>
                    <h2>{inStock > 0 ? inStock : "Товар закончился"}</h2>
                </div>
                
                <img className={styles.addCartButton} src="/img/add-cart.svg" alt="plus" onClick={() => addToCartBtn(id)}/>
            </div>
    );
};