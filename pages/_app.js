import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import beneficiaryReducer from '../reducers/beneficiaryReducer';
import beneficiarySaga from '../sagas/beneficiarySaga';

const sagaMiddleware = createSagaMiddleware()

export default function App({ Component, pageProps }) {
  const store = createStore(
    beneficiaryReducer,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(beneficiarySaga)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
