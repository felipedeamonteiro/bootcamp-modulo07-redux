import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';

import logo from '../../assets/images/logo.svg';

function Header({ cartItemAmount }) {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartItemAmount} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  cartItemAmount: state.cart.reduce((total, product) => {
    return total + product.amount;
  }, 0),
});

export default connect(mapStateToProps)(Header);
