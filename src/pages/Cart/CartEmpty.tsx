import { Link } from "react-router";

export const CartEmpty: React.FC = () => {
    return (
        <div className="clear-cart">
            <img width={95} height={95}src="/img/clear-cart.svg" alt="" />
            <h2>Корзина пуста</h2>
            <p>Добавьте что нибудь и всё появится!</p>
            <Link to='/'>
                <button>Вернуться к товарам</button>
            </Link>
        </div>
    );
}