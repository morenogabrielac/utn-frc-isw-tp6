import React from 'react';
import {CartFill} from 'react-bootstrap-icons';

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="#!">
          DeliverEat!
        </a>
        <div>

          <form className="d-flex">
            <button className="btn btn-outline-dark" type="submit">
              <CartFill />
              <span className="badge bg-dark text-white ms-1 rounded-pill">
                0
              </span>
            </button>
          </form>
          
        </div>
      </div>
    </nav>
  );
}
