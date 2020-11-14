import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers/rootReducer';

import rootSaga from '../sagas/rootSaga';
import 'bootstrap/dist/css/bootstrap.min.css';


const sagaMiddleware = createSagaMiddleware()

export default function App({ Component, pageProps }) {
  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga)

  return (

    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
