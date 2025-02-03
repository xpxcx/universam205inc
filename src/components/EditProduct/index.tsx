import styles from './styles.module.scss';
import { Search } from '../AdminSearch';
import { useAppSelector } from '../../redux/hooks';
import { useDeleteProductMutation, useGetProductsQuery, useUpdateInStockMutation } from '../../redux/apiSlice';
import React from 'react';
import { AdminEditColumnProduct } from '../AdminEditColumnProduct';
import { Modal } from '../Modal';
type Product = {
        id: number;
        title: string;
        price: number;
        imageUrl: string;
        category: string;
        size: number;
        unit: string;
        type: string;
        inStock: number;
}

export const EditProduct = () => {
    const [product, setProduct] = React.useState<Product | null >(null);
    const [removeProduct] = useDeleteProductMutation();
    const onClickDelelte = (id:number) => { 
        removeProduct({id});
    };
    const { adminCategoryID, adminSearchValue } = useAppSelector(state => state.filter)
    const { data: products } = useGetProductsQuery({ categoryId: adminCategoryID, search: adminSearchValue });
    const [updateCountProduct] = useUpdateInStockMutation();
    const onClickPlus = async (id: number) => {
        await updateCountProduct({
            amount: 1,
            id: id
        })

    }
    const onClickMinus = async(id: number) => {
        await updateCountProduct({
            amount: -1,
            id: id
        })
    }   
    return (
        (<div className={styles.cart}>
            <Search/>
                {products?.map((obj) => (
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
                    <button className={styles.plus} onClick={() => onClickPlus(obj.id)}>+</button>
                    <p className={styles.count}>{obj.inStock}</p>
                    <button className={styles.minus} onClick={() => onClickMinus(obj.id)} disabled={obj.inStock === 0}>-</button>
                </div>
                <div className={styles.trashEdit}>
                <img className={styles.editBtn} src="/img/edit-button.svg" alt="" onClick={() => setProduct(obj)}/>

                <img className={styles.trash} src='/img/trash.svg' onClick={() => onClickDelelte(obj.id)}/>
                </div>
                
            </div>   
            ))}
            {product && <Modal 
                    onClose={() => setProduct(null)}
                    stylesModal={'editProduct'}>
                    <AdminEditColumnProduct
                    {...product}
                    />
                </Modal>
            }
        </div>)
    );
};
