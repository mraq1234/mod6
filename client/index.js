import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const render = (Component) => {
    ReactDOM.render( 
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root'));
};
render(App);

if (module.hot) {
    console.log('module.hot = ', module.hot)
    module
        .hot
        .accept('./App', () => {
            const NewApp = require('./App').default;
            render(NewApp)
        });
}
// ReactDOM.render(
//     <App/>, document.getElementById('root'));