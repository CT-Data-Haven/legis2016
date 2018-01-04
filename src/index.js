import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';
import 'leaflet/dist/leaflet.css';

import { loadData } from './components/DataLoader';

// const url = './data/legislative_data.csv';

loadData((data) => {
	ReactDOM.render(<App {...data} />, document.getElementById('root'));
});

// ReactDOM.render(<App url={'./data/legislative_data.csv'} />, document.getElementById('root'));
registerServiceWorker();
