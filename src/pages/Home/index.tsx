import { Search } from "../../components/Search/index";
import { Product } from "../../components/Product";
import { Categories } from "../../components/Categories/index";
import {  useAppSelector } from "../../redux/hooks";
import styles from './styles.module.scss';
import { useGetProductsQuery } from "../../redux/apiSlice";

export const Home = () => {
    const { categoryID, searchValue } = useAppSelector((state) => state.filter);
    const { data: products } = useGetProductsQuery({categoryID: categoryID, search: searchValue});



    return (
        <div className={styles.containerHome}>
            <div className="content">
                <Search/>
                <Categories/>
                <div className={styles.items}>
                    {products?.map((obj:any) => 
                        <Product
                        key={obj.id}
                        {...obj}
                        details={obj.type === 'food' ? `${obj.weight}` : `${obj.volume}`}
                        products={products}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};