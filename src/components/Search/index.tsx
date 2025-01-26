import styles from './styles.module.scss';
export const Search = () => {
    return (
        <div className={styles.search}>
            <input type="text" placeholder="Поиск..."/>
        </div>
    );
};