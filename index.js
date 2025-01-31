/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import StoreAppWrapper from './src/store/StoreAppWrapper';

AppRegistry.registerComponent(appName, () => StoreAppWrapper);
