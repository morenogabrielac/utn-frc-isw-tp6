import React, {useState} from 'react';
import CheckoutForm from './CheckoutForm';
import {Cart, Trash} from 'react-bootstrap-icons';
import {Product, ProductDetailProps} from '../types/interfaces';

const CART: Product[] = [
  {
    id: 1,
    img_url:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80',
    name: 'Hamburguesa XXL',
    price: 3200,
    quantity: 1,
  },
  {
    id: 2,
    img_url:
      'https://images.unsplash.com/photo-1534260164206-2a3a4a72891d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    name: 'Gaseosa Coca-Cola',
    price: 520,
    quantity: 2,
  },
];

export default function Checkout() {
  const [cartItems, setCartItems] = useState(CART);

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="container px-4 px-lg-5 mt-5">
          <h4 className="text-center mb-3">
            Tu Carrito <Cart />
          </h4>
          {cartItems.map((product, index) => (
            <ProductDetail
              key={index}
              product={product}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          ))}
        </div>
      ) : (
        <div className="container px-4 px-lg-5 mt-5 text-center">
          <h4>No tienes productos en tu carrito</h4>
        </div>
      )}

      <CheckoutForm cart={cartItems} />
    </>
  );
}

function ProductDetail({
  product: {id, img_url, name, price, quantity},
  cartItems,
  setCartItems,
}: ProductDetailProps) {
  const onClickHandler = (event: any) => {
    const newCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(newCartItems);
  };

  return (
    <div className="container mt-1 p-3">
      <div className="row">
        <div className="row">
          <div className="col">
            <img className="" src={img_url} width="40" />
          </div>
          <div className="col">
            <p>{name}</p>
          </div>
          <div className="col">
            <p>
              {quantity} {quantity > 1 ? 'Unidades' : 'Unidad'}
            </p>
          </div>
          <div className="col">
            <p>$ {price}</p>
          </div>
          <div className="col">
            <button className="btn btn-outline-danger" onClick={onClickHandler}>
              Eliminar Producto <Trash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
