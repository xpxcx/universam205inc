import { Search } from "../../components/Search/index";
import { Product } from "../../components/Product";
import { Categories } from "../../components/Categories/index";
import {  useAppSelector } from "../../redux/hooks";
import styles from './styles.module.scss';
import { useGetProductsQuery } from "../../redux/apiSlice";

export const Home = () => {
    const { categoryID } = useAppSelector((state) => state.filter)
    const { data: products } = useGetProductsQuery(categoryID);

    return (
        <div className={styles.containerHome}>
            <div className="content">
                <Categories/>
                <Search/>
                <div className={styles.items}>
                    {products?.map((obj:any) => 
                        <Product
                        key={obj.id}
                        {...obj}
                        details={obj.type === 'food' ? `${obj.weight}` : `${obj.volume}`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};