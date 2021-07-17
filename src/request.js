import axios from 'axios';
import store from './store';

let request = axios.create({
	method: "post",
	// baseURL: "http://localhost:4000",
	baseURL: "http://www.52craft.cc:4000",
	timeout: 4000,
	headers: {
		"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
	},
	withCredentials: true,
	transformRequest: [
		data => {
			let params = '';
			for (var index in data) {
				params += index + '=' + data[index] + '&';
			}
			return params;
		}
	]
})

request.interceptors.request.use(config => {
	if (store.state.cookie) {
		if (config.data) {
			config.data.cookie = store.state.cookie;
		} else {
			if (!config.params) config.params = {};
			config.params.cookie = encodeURIComponent(store.state.cookie);
		}
	}
	return config;
}, function (error) {
	Qmsg['error'](`出错了 ${error}`);
	return Promise.reject(error);
});

request.interceptors.response.use(response => {
	return response;
}, function (error) {
	Qmsg['error'](`出错了 ${error}`);
	return Promise.reject(error);
});

export default request
