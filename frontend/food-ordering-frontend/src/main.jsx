import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './State/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Bọc Provider bao quanh App và truyền store vào */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)