import { Provider } from 'react-redux';
import { store } from '../../services';

import { AppHeader } from '../app-header/app-header'
import { HomePage } from '../../pages'

function App() {
  return (
    <Provider store={store}>
      <AppHeader />
      <HomePage />
    </Provider>
  )
}

export default App
