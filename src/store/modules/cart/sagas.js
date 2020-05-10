import { call, select, put, all, takeLatest } from 'redux-saga/effects';
// sempre que eu usar qualquer um deste aqui em cima eu preciso do yeild
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmountSuccess } from './actions';
// Esse asterisco é async mais poderoso do javascript
function* addToCart({ id }) {
  // o select serve para buscar informações dentro do estado
  const productExists = yield select((state) =>
    state.cart.find((p) => p.id === id)
  );

  // consultando o estoque:
  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque.');
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    // o call serve para fazer as chamadas api
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    // o put serve para disparar uma action
    yield put(addToCartSuccess(data));

    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque.');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

// esse all serve de listener para as actions que forem ocorrer
export default all([
  // essa takeLatest serve para pegar apenas a ultima clicada caso a chamada
  // api não tenha terminado. Se usasse o "takeEvery", ele ouviria todas as
  // clicadas dadas pelo usuário.
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
