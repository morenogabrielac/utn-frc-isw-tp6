import React, {useState} from 'react';
import {showError, showSuccess} from '../utils/swal';

interface CheckoutForm {
  street: string;
  street_number: number;
  city: string;
  payment_method: PaymentMethod;
  pay_amount?: number;
  card_due_date?: string;
  card_number?: number;
  card_owner: string;
  cvc_number: number;
  delivery_method: DeliveryMethod;
  custom_delivery_date?: Date;
  custom_delivery_time?: string;
}

enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
}

enum DeliveryMethod {
  ASAP = 'ASAP',
  CUSTOM = 'CUSTOM',
}

export default function Checkout() {
  const [formData, setFormData] = useState<CheckoutForm>({
    city: 'jesus_maria',
    payment_method: PaymentMethod.CASH,
    delivery_method: DeliveryMethod.ASAP,
  } as CheckoutForm);

  const {
    street,
    street_number,
    city,
    payment_method,
    pay_amount,
    delivery_method,
    card_number,
    card_owner,
    card_due_date,
    cvc_number,
    custom_delivery_date,
  } = formData as CheckoutForm;

  const onChangeHandler = (event: any) => {
    setFormData({
      ...formData!,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler = (event: any) => {
    event.preventDefault();

    if (!street || !street_number) {
      showError('tu direccion');
      return;
    }

    switch (payment_method) {
      case PaymentMethod.CASH: {
        if (!pay_amount || pay_amount < 0) {
          showError('un monto a pagar valido');
          return;
        } else break;
      }

      case PaymentMethod.CARD: {
        const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
        if (!card_number || !visaRegex.test(card_number!.toString())) {
          showError('un numero de tarjeta valida');
          return;
        }

        const dateRegex = /^(0[1-9]|1[0-2])\/[0-9]{4}$/;
        if (!card_due_date || !dateRegex.test(card_due_date!)) {
          showError('una fecha de vencimiento valida');
          return;
        }

        break;
      }

      default:
        break;
    }

    showSuccess();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="container px-4 px-lg-5 mt-5">
        <div className="form-group row mb-2">
          <label className="col-4 col-form-label" htmlFor="street">
            Calle
          </label>
          <div className="col-8">
            <input
              id="street"
              name="street"
              placeholder="Av. Velez Sarfiel "
              type="text"
              className="form-control"
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <div className="form-group row mb-2">
          <label htmlFor="street_number" className="col-4 col-form-label">
            Numero
          </label>
          <div className="col-8">
            <input
              id="street_number"
              name="street_number"
              placeholder="1381"
              type="text"
              className="form-control"
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <div className="form-group row mb-2">
          <label htmlFor="city" className="col-4 col-form-label">
            Ciudad
          </label>
          <div className="col-8">
            <select
              id="city"
              name="city"
              className="form-control"
              onChange={onChangeHandler}
            >
              <option key="jesus_maria" value="jesus_maria">
                Jesus Maria
              </option>
              <option key="jesus_maria" value="mina_clavero">
                Mina Clavero
              </option>
              <option key="jesus_maria" value="alta_gracia">
                Alta Gracia
              </option>
            </select>
          </div>
        </div>

        <div className="form-group row mb-2">
          <label htmlFor="payment_method" className="col-4 col-form-label">
            Metodo de Pago
          </label>
          <div className="col-8">
            <select
              id="payment_method"
              name="payment_method"
              className="form-control"
              onChange={onChangeHandler}
            >
              <option selected key="cash" value={PaymentMethod.CASH}>
                Efectivo
              </option>
              <option key="cash" value={PaymentMethod.CARD}>
                Tarjeta de Débito/Crédito
              </option>
            </select>
          </div>
        </div>

        {payment_method === PaymentMethod.CASH ? (
          <div className="form-group row mb-2">
            <label htmlFor="pay_amount" className="col-4 col-form-label">
              Monto a Pagar
            </label>
            <div className="col-8">
              <input
                id="pay_amount"
                name="pay_amount"
                placeholder="2500"
                type="text"
                className="form-control"
                onChange={onChangeHandler}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="form-group row mb-2">
              <label htmlFor="card_number" className="col-4 col-form-label">
                Numero de la tarjeta
              </label>
              <div className="col-8">
                <input
                  id="card_number"
                  name="card_number"
                  placeholder="8976556734326734"
                  type="text"
                  className="form-control"
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div className="form-group row mb-2">
              <label htmlFor="card_owner" className="col-4 col-form-label">
                Nombre y Apellido del Titular
              </label>
              <div className="col-8">
                <input
                  id="card_owner"
                  name="card_owner"
                  type="text"
                  className="form-control"
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div className="form-group row mb-2">
              <label htmlFor="card_due_date" className="col-4 col-form-label">
                Fecha de vencimiento
              </label>
              <div className="col-8">
                <input
                  id="card_due_date"
                  name="card_due_date"
                  placeholder="02/2027"
                  type="text"
                  className="form-control"
                  aria-describedby="card_due_dateHelpBlock"
                  onChange={onChangeHandler}
                />
                <span
                  id="card_due_dateHelpBlock"
                  className="form-text text-muted"
                >
                  Debe tener el siguiente formato MM/AAAA
                </span>
              </div>
            </div>

            <div className="form-group row mb-2">
              <label htmlFor="cvc_number" className="col-4 col-form-label">
                CVC
              </label>
              <div className="col-8">
                <input
                  id="cvc_number"
                  name="cvc_number"
                  placeholder="112"
                  type="text"
                  className="form-control"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </>
        )}

        <div className="form-group row mb-2">
          <label htmlFor="delivery_method" className="col-4 col-form-label">
            Metodo de Entrega
          </label>
          <div className="col-8">
            <select
              id="delivery_method"
              name="delivery_method"
              className="form-control"
              onChange={onChangeHandler}
            >
              <option key="asap" value={DeliveryMethod.ASAP}>
                Lo antes posible
              </option>
              <option key="custom" value={DeliveryMethod.CUSTOM}>
                Personalizado
              </option>
            </select>
          </div>
        </div>

        {delivery_method === DeliveryMethod.CUSTOM && (
          <>
            <div className="form-group row mb-2">
              <label
                className="col-4 col-form-label"
                htmlFor="custom_delivery_date"
              >
                Fecha de Recepcion
              </label>
              <div className="col-8">
                <input
                  id="custom_delivery_date"
                  name="custom_delivery_date"
                  type="date"
                  className="form-control"
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div className="form-group row mb-2">
              <label
                className="col-4 col-form-label"
                htmlFor="custom_delivery_time"
              >
                Hora de Recepcion
              </label>
              <div className="col-8">
                <input
                  id="custom_delivery_time"
                  name="custom_delivery_time"
                  type="time"
                  className="form-control"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </>
        )}

        <div className="form-group row mb-2">
          <div className="offset-4 col-8">
            <button name="submit" type="submit" className="btn btn-primary">
              Realizar Pedido
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
