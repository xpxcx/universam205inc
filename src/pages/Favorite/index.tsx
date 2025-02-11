import { Link } from 'react-router';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import { useAddToCartMutation, useGetFavoriteQuery, useRemoveAllFavoriteMutation, useRemoveFromFavoriteMutation } from '../../redux/apiSlice';
import { FavoriteEmpty } from './FavoriteEmprty';
import styles from './styles.module.scss';

export const Favorite = () => {
    const { data: favoriteItem, isLoading } = useGetFavoriteQuery();
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
    if (!localStorage.getItem('token')) {
        return <div className={styles.unAuth}>
            <h3>Похоже, Вы ещё не авторизованы</h3>
            <Link to='/authorization'>
            <p>Авторизация</p>
            </Link>
        </div>
    }
    return (
        isLoading ? 
            <div className={styles.loadingWindow}>
            <Flex align="center" gap="middle">
            <Spin indicator={<LoadingOutlined style={{fontSize: 65}}spin />} size="large"  className={styles.spinner}/>
            </Flex> 
            </div> 
            :  
        <>
        {favoriteItem?.Products?.length === 0 ? 
        <FavoriteEmpty /> 
        :
        (<div className={styles.cart}>
            <button className={styles.clearCartButton} onClick={() => removeAllFavorite()}>Очистить избранное</button>
            <div className={styles.items}> 

                {favoriteItem?.Products.map((obj) => (
                
                <div key={obj.id} className={styles.item}>

                <div className={styles.itemimg}>
                    <img src={obj.imageUrl} alt="items-img" />
                </div>
                <div className={styles.productInfo}>
                    <h2 className={styles.title}>{obj.title}, <span className={styles.sizeItem}>{obj.size}{obj.unit}</span></h2>
                    <p className={styles.pricetext}>Цена за 1 шт:</p>
                    <p className={styles.price}>{obj.price} ₽</p>
                </div>
                <div className={styles.likedCart}>
                    <img className={styles.liked} src='/img/liked.svg'onClick={() => onClickDelelte(obj.id)}/>
                    <img className={styles.addCartButton} src="/img/add-cart.svg" alt="plus" onClick={() => addToCartBtn(obj.id)}/>

                </div>
            </div>
            ))}
        </div>
        </div>)
        }
        </>
    );
};
