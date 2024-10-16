import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from '../../api/fakeStoreApi';
import Login from "../SignIn/Login";
import './Header.css'

function Header() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

  const goToCartButton = () => {
    navigate('/cart');
  };

  const categoryCatalogOpen = (category) => {
    const link_category = category.replace(/ /g, '_');
    navigate(`/products/${link_category}`);
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (err) {
                setError(err.message);
            }
        }
        getCategories();
    },[])

    return (
        <>
        <header className="header">
            <div className="header__container">
                <a className="header__link" href="/">
                    <img className="header__link-img" src="/logo.png" alt="Fake Store Logo" />
                    Fake Store
                </a>
                {categories.map((category) => (
                    <>
                        <ul className="categories-list">
                            <li className="categories-list-item" key={category.key}>
                                <a className="categories-list-item-link" href="" onClick={() => categoryCatalogOpen(category)}>{category}</a></li>
                        </ul>
                    </>
                ))}
                <div className="header__buttons_group">
                    <button className="header__button-user-profile" onClick={openModal}>
                        <svg width="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="6" r="4" stroke-width="1.5"/>
                            <path d="M19.9975 18C20 17.8358 20 17.669 20 17.5C20 15.0147 16.4183 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C14.231 22 15.8398 21.8433 17 21.5634" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <button className="header__button" onClick={goToCartButton}>
                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.86376 16.4552C3.00581 13.0234 2.57684 11.3075 3.47767 10.1538C4.3785 9 6.14721 9 9.68462 9H14.3153C17.8527 9 19.6214 9 20.5222 10.1538C21.4231 11.3075 20.9941 13.0234 20.1362 16.4552C19.5905 18.6379 19.3176 19.7292 18.5039 20.3646C17.6901 21 16.5652 21 14.3153 21H9.68462C7.43476 21 6.30983 21 5.49605 20.3646C4.68227 19.7292 4.40943 18.6379 3.86376 16.4552Z" stroke-width="1.5"/>
                            <path d="M19.5 9.5L18.7896 6.89465C18.5157 5.89005 18.3787 5.38775 18.0978 5.00946C17.818 4.63273 17.4378 4.34234 17.0008 4.17152C16.5619 4 16.0413 4 15 4M4.5 9.5L5.2104 6.89465C5.48432 5.89005 5.62128 5.38775 5.90221 5.00946C6.18199 4.63273 6.56216 4.34234 6.99922 4.17152C7.43808 4 7.95872 4 9 4" stroke-width="1.5"/>
                            <path d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4Z" stroke-width="1.5"/>
                            <path d="M4.5 18L12 9M19.5 18L12.5 9.5M4.5 10L12 21L19.5 10" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
        <Login isOpen={isModalOpen} closeModal={closeModal} />
        </>
    )
}

export default Header;
