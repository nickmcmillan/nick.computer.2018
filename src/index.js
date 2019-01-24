import './index.scss';
import './social-links.scss';
import './list.scss';

import 'classlist-polyfill'
import './polyfills/arrayIncludes'

// import './rainbow'

import './globals'
import './utilities'
import './resize'

import './polypoints'
import './balls'

import './inertia'
import './interaction/touch'
import './interaction/mouse'
// import './interaction/button'

import * as serviceWorker from './serviceWorker';



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
