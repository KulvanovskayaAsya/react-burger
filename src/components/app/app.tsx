import { Provider } from 'react-redux';

import { HomePage } from '../../pages';
import { AppHeader } from '../app-header/app-header';

import { store } from '../../services';

function App() {
  return (
    <Provider store={store}>
      <AppHeader />
      <HomePage />
    </Provider>
  )
}

export default App
