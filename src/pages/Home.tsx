import React from "react";
import '../index.scss'
import { Search } from "../components/Search";
import { CartItem } from "../components/CartItem";
import { Categories } from "../components/Categories";
export const Home = () => {
    return (
        <div className="container-home">
            <div className="content">
                <Categories/>
                <Search/>
                <div>
                    <CartItem/>
                </div>
            </div>
        </div>
    );
};