import React from 'react';
import "./Header.css";
import { NavLink } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const { items } = useCart();

  return (
	<header className="header">
		<div className="header__logo">
			<NavLink to="/" className="header__logo-link">
				<img src="/images/website_logo.avif" alt="Logo" className="header__logo-image" />
				<h1 className="header__title">Magret</h1>
			</NavLink>
		</div>

		<div className="header__nav">
			<NavLink to="/" className="header__link">Products</NavLink>
			<NavLink to="/about" className="header__link">About</NavLink>
			<NavLink to="/contact" className="header__link">Contact</NavLink>
		</div>

		<div className="header__cart">
			<NavLink to="/cart" className="header__cart-link">
				<span className="header__cart-icon">
					<AiOutlineShoppingCart className='header__cart-icons'/>
				</span>

				{/* Display the number of items in the cart */}
				<span className="header__cart-count">{items.length}</span>
			</NavLink>
		</div>
	</header>
  )
}

export default Header;