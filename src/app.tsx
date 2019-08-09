import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { PersistGate } from 'redux-persist/integration/react';

import Root from './containers/Root';
import { store, persistor } from './redux/store';

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Render components
const render = (Component: React.ComponentClass) => {
  ReactDOM.render(
    //  <OriginalImageList sampleImages={ props }/>,
    <AppContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component />
        </PersistGate>
      </Provider>
    </AppContainer>,
    mainElement
  );
};

render(Root);

// Hot Module Replacement API
if (typeof module.hot !== 'undefined') {
  module.hot.accept('./containers/Root', () => {
    import('./containers/Root').then(World => {
      render(World.default);
    });
  });
}
