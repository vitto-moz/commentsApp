import angular from 'angular';

import {main} from './app/main';
import {init} from './app/init';
import {sidebar} from './app/sidebar';
import 'angular-ui-router';
import routesConfig from './routes';
import {localStorageService} from './services/localStorage.js';

import './index.css';

export const app = 'app';

angular
  .module(app, ['ui.router'])
  .config(routesConfig)
  .component('app', main)
  .component('init', init)
  .component('sidebar', sidebar)
  .factory('localStorageService', [localStorageService]);
