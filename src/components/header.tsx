import React from 'react';

export default function Header() {
  return (
    <header className="bg-custom-green py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
          <h1 className="display-4 fw-bolder">Buenas Burgers.</h1>
          <p className="lead fw-normal text-white-50 mb-0">
            Un comercio adherido de <b>DeliverEat!</b>
          </p>
        </div>
      </div>
    </header>
  );
}
