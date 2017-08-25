import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import * as actions from './actions'
import * as getters from './getters'

import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)

const debug = process.env.NODE_ENV != 'production'

export default new Vuex.Store({
	actions,
	getters,
	modules:{
		cart,
		products
	},
	strits:debug,
	plugins:debug ? [createLogger()]:[]
})