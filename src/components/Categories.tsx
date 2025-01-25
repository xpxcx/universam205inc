import React from "react";
import { Item } from "../redux/items/slice";
const categories:string[] = ['Сладкое', 'Быстрое приготовление', 'Вода', 'Энергетики', 'Чипсы'];

export const Categories = () => {
    const [chooseCategories, setChooseCategories] = React.useState(0);
    return (
        <div className="categories">
            {categories.map((obj, i) => (
                <li
                    key={i}
                    className={chooseCategories === i ? 'active' : ''}
                    onClick={() => setChooseCategories(i)}>
                    {obj}
                </li>
            ))}
        </div>
    );
};