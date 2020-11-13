import { Provider } from 'react-redux'
import { createStore } from 'redux';
import beneficiaryReducer from '../reducers/beneficiaryReducer';

export default function App({ Component, pageProps }) {
  const store = createStore(beneficiaryReducer);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
