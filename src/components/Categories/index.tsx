import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { setCategory } from "../../redux/filter/slice";
import styles from './styles.module.scss';

const categories:string[] = ['Все', 'Сладкое', 'Быстрое приготовление', 'Вода', 'Энергетики', 'Чипсы'];

export const Categories = () => {
    const dispatch = useAppDispatch();
    const { categoryID } = useAppSelector((state: RootState) => state.filter);
    const setCategoryID = (i: number) => {
        dispatch(setCategory(i));
    }
    return (
        <div className={styles.categories}>
            {categories.map((category, i) => (
                <li
                    key={i}
                    className={categoryID === i ? styles.active : ''}
                    onClick={() => setCategoryID(i)}>
                    {category}
                </li>
            ))}
        </div>
    );
};