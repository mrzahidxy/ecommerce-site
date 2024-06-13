import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render( 
<Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
           <App />
         </PersistGate>
      </Provider>
  );

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
