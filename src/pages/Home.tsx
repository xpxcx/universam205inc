import React from "react";
import '../index.scss'
import { Search } from "../components/Search";
import { CartItem } from "../components/CartItem";
import { Categories } from "../components/Categories";
import { fetchItems, setItem } from "../redux/items/slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
export const Home = () => {
    const dispatch = useAppDispatch(); 
    React.useEffect(() => {
        const fetchData = () => {
           dispatch(fetchItems());
        };
        fetchData();
    }, []);
    const items = useAppSelector((state: RootState )=> state.item.items);
    return (
        <div className="container-home">
            <div className="content">
                <Categories/>
                <Search/>
                <div>
                    {items.map((obj:any) => 
                        <CartItem
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