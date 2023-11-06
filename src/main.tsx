//@ts-nocheck
import React from 'react'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import App from './App'

// const persistor = persistStore(store)

const rootDom = createRoot(document.getElementById('root'));
rootDom.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
