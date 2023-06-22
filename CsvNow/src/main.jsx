import React from 'react'
import ReactDOM from 'react-dom/client'

import './App.css'
import App from './App.jsx'
import configureStore from './store.jsx'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={configureStore()}>
     <App />
     </Provider>
  </React.StrictMode>,
)
