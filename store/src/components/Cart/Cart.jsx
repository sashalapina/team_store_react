import { useNavigate } from 'react-router-dom';
import './Cart.css'

function Cart() {
    const isEmpty = false; 

    const navigate = useNavigate();

    const goToCatalogButton = () => {
        navigate('/');
    }
    
    return (
        <>
        <h1 className="cart-title">Cart</h1>
        {isEmpty ? (<button className='cart-checkout'>Checkout</button>) :
        (<>
        <p className='cart-empty-text'>Your cart is empty. Visit the catalog to start shopping.</p>
        <button className='cart-catalog-button' onClick={goToCatalogButton}>Shop now</button>
        </>)
        }
        </>
    )
}

export default Cart;