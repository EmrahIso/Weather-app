// Styles import
import styles from '../scss/main.scss';

// Import event listeners
import './modules/listeners';

import './modules/storage';

// To make sure that we are in development mode
if (process.env.NODE_ENV !== 'production') {
  console.log('----------------------');
  console.log('Looks like we are in development mode!');
  console.log('----------------------');
}
