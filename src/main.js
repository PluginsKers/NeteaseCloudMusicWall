// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import request from './request';

/**
 * Font Awesome SVG
 */
import {
	library
} from '@fortawesome/fontawesome-svg-core'
import {
	FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

import {
	faBook, faPen, faPlay, faPause
} from '@fortawesome/free-solid-svg-icons';

library.add(
	faBook, faPen, faPlay, faPause
);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$request = request;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requireAuth)) {
		if (store.state.logged) {
			next();
		} else {
			next('/login');
		}
	} else {
		next();
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	components: {
		App
	},
	template: '<App/>'
})
