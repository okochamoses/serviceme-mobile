import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Nav from './src/navigation';
import initReducer from './src/redux/InitReducer';


const store = createStore(initReducer);

const App = () => {
  return (
    <Provider store={store}>
      <Nav />
    </Provider>
  );
};

export default App;
