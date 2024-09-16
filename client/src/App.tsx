import Teams from '@/pages/Teams';
import './App.css'
import { Provider } from 'react-redux';
import { store } from '@/store'

const App = () => {

  return (
    <Provider store={store}>
    <Teams />
    </Provider>
  )
}

export default App
