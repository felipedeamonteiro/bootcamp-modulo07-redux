import { createStore } from 'redux';

import rootReducer from './modules/rootReducer';
/** O Store nunca pode inicializar vazio, porque se não a aplicação
 * quebra. No caso nosso carrinho é o reducer, então eu inicializo ele
 * e passo como parâmetro na store. Renomeei o cart para reducer.
 * Mas como eu posso ter vários reducers, temos o combineReducers para
 * combinar todos os reducers em um só lugar e depois unir eles na store
 */

const store = createStore(rootReducer);

export default store;
