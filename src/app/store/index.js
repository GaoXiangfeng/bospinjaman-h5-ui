/**
 * Created by zc on 2017/4/12.
 */
import Vuex from 'vuex'
import QGVueComponents from 'qg-vue-components2'
import mallModule from './module'

let store = new Vuex.Store({
	modules: {
		qg: QGVueComponents.store.modules,
		mall: mallModule
	}
})

export default store
