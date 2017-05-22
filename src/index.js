import registerServiceWorker from './registerServiceWorker';
import './index.css';

import 'classlist-polyfill'
import './polyfills/arrayIncludes'

import './globals'
import './utilities'
import './resize'

import './polypoints'
import './balls'

import './inertia'
import './interaction/touch'
import './interaction/mouse'
import './interaction/button'

registerServiceWorker();
