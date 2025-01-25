import { Link } from 'react-router';
import '../index.scss'
export const Header = () => {
    return (
        <div className="header">
            <div className="container">
                <Link to='/'>
                <h1>Универсам 205</h1>
                </Link>
                    <Link to='/cart'>
                    <div className="cart">
                        <img className="cart-logo"src="/img/cart-logo.svg" alt="" />
                        <p>0</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};