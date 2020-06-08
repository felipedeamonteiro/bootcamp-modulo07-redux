import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
/** O store nunca pode inicializar vazio, porque se não a aplicação
 * quebra. No caso nosso carrinho é o reducer, então eu inicializo ele
 * e passo como parâmetro na store. Renomeei o cart para rootReducer.
 * Mas como eu posso ter vários reducers, temos o combineReducers para
 * combinar todos os reducers em um só lugar e depois unir eles na store
 */
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

// configurando o Reactotron
// no caso, o compose serve para juntar o console do reactotron e o saga, pois
// sem ele daria conflito no enhancer.
const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(console.tron.createEnhancer(), applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
