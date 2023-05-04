import React, {useState, ChangeEvent} from 'react';
import {Receipt} from 'react-bootstrap-icons';
import {showError, showSuccess} from '../utils/swal';
import {DeliveryMethod, PaymentMethod} from '../types/enums';
import {CheckoutForm, CheckoutFormProps} from '../types/interfaces';
import {onlyNumbers, formatInputExpiryDate} from '../utils/toolsPagesForm';

export default function CheckoutForm({cart}: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutForm>({
    city: 'jesus_maria',
    payment_method: PaymentMethod.CASH,
    delivery_method: DeliveryMethod.ASAP,
  } as CheckoutForm);

  const {
    street,
    street_number,
    payment_method,
    pay_amount,
    delivery_method,
    card_number,
    card_owner,
    card_due_date,
    cvc_number,
    custom_delivery_date,
    custom_delivery_time,
  } = formData as CheckoutForm;

  const onChangeHandler = (event: any) => {
    setFormData({
      ...formData!,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler = (event: any) => {
    event.preventDefault();

    if (!cart || cart.length === 0) {
      showError('productos a tu pedido');
      return;
    }

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

        if (!card_owner) {
          showError('un nombre y apellido valido');
          return;
        }

        const dateRegex = /^(0[1-9]|1[0-2])\/[0-9]{4}$/;
        if (!card_due_date || !dateRegex.test(card_due_date!)) {
          showError('una fecha de vencimiento valida');
          return;
        }

        const numberRegex = /^[1-9][0-9]{2}$/;
        if (!cvc_number || !numberRegex.test(cvc_number.toString())) {
          showError('una numero cvc valido');
          return;
        }

        break;
      }

      default:
        break;
    }

    switch (delivery_method) {
      case DeliveryMethod.CUSTOM: {
        const actualDate = new Date();
        const customDate = new Date(
          `${custom_delivery_date}T${custom_delivery_time}`
        );
        if (customDate < actualDate) {
          showError('una fecha de entrega valida');
          return;
        } else break;
      }

      default:
        break;
    }

    showSuccess();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="container px-4 px-lg-5 mt-5">
        <h4 className="text-center mb-3">
          Confirmá tu Pedido <Receipt />
        </h4>
        <div className="form-group row mb-2">
          <label className="col-4 col-form-label" htmlFor="street">
            Calle
          </label>
          <div className="col-8">
            <input
              id="street"
              name="street"
              placeholder="José María Bedoya"
              type="text"
              className="form-control"
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <div className="form-group row mb-2">
          <label htmlFor="street_number" className="col-4 col-form-label">
            Número
          </label>
          <div className="col-8">
            <input
              id="street_number"
              name="street_number"
              placeholder="1381"
              type="text"
              className="form-control"
              onChange={onChangeHandler}
              onInput={(e: ChangeEvent<HTMLInputElement>) => onlyNumbers(e,12)}
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
                Jesús María
              </option>
              <option key="mina_clavero" value="mina_clavero">
                Mina Clavero
              </option>
              <option key="alta_gracia" value="alta_gracia">
                Alta Gracia
              </option>
            </select>
          </div>
        </div>

        <div className="form-group row mb-2">
          <label htmlFor="payment_method" className="col-4 col-form-label">
            Método de Pago
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
                onInput={(e: ChangeEvent<HTMLInputElement>) => onlyNumbers(e,12)}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="form-group row mb-2">
              <label htmlFor="card_number" className="col-4 col-form-label">
                Número de la Tarjeta
              </label>
              <div className="col-8">
                <input
                  id="card_number"
                  name="card_number"
                  placeholder="8976556734326734"
                  type="text"
                  className="form-control"
                  onChange={onChangeHandler}
                  onInput={(e: ChangeEvent<HTMLInputElement>) => onlyNumbers(e,18)}
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
                  placeholder="Gabriel Brandalisse"
                  className="form-control"
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div className="form-group row mb-2">
              <label htmlFor="card_due_date" className="col-4 col-form-label">
                Fecha de Vencimiento
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
                  onInput={(e: ChangeEvent<HTMLInputElement>) => formatInputExpiryDate(e)}
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
                Número de CVC
              </label>
              <div className="col-8">
                <input
                  id="cvc_number"
                  name="cvc_number"
                  placeholder="112"
                  type="text"
                  className="form-control"
                  onChange={onChangeHandler}
                  onInput={(e: ChangeEvent<HTMLInputElement>) => onlyNumbers(e,3)}
                />
                 <span
                  id="card_due_dateHelpBlock"
                  className="form-text text-muted"
                >
                  Está en el dorzo de tu tarjeta
                </span>
              </div>
            </div>
          </>
        )}

        <div className="form-group row mb-2">
          <label htmlFor="delivery_method" className="col-4 col-form-label">
            Método de Entrega
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
                Fecha de Recepción
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
                Hora de Recepción
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
            <button
              name="submit"
              type="submit"
              className="btn btn-outline-success"
            >
              Realizar Pedido
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}