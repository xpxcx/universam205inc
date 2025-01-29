import { useAddToCartMutation, useGetFavoriteQuery, useRemoveAllFavoriteMutation, useRemoveFromFavoriteMutation } from '../../redux/apiSlice';
import { FavoriteEmpty } from './FavoriteEmprty';
import styles from './styles.module.scss';

export const Favorite = () => {
    const { data: favoriteItem } = useGetFavoriteQuery();
    const [removeFromFavorite] = useRemoveFromFavoriteMutation();
    const [addToCart] = useAddToCartMutation();
    const onClickDelelte = (productId: number) => (
        removeFromFavorite(productId)
    );
    const addToCartBtn = (productId: number) => {
        addToCart({
            productId, 
            quantity: 1
        })
    };
    const [removeAllFavorite] = useRemoveAllFavoriteMutation();
    return (
        favoriteItem?.Products?.length === 0 ? 
        <FavoriteEmpty /> 
        :
        (<div className={styles.cart}>
            <button className={styles.clearCartButton} onClick={() => removeAllFavorite()}>Очистить избранное</button>
                {favoriteItem?.Products.map((obj) => (
                
                
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
                <img className={styles.liked} src='/img/liked.svg' width={17} height={17} onClick={() => onClickDelelte(obj.id)}/>
                <img className={styles.addCartButton} src="/img/add-cart.svg" alt="plus" onClick={() => addToCartBtn(obj.id)}/>
                
            </div>
            ))}
        </div>)
        
    );
};
