import Vue from 'vue'
import Vuex,{ Store} from 'vuex'

import articles from './modules/articles'
import user from './modules/user'
Vue.use(Vuex)


export default new Store({

    modules: {
      articles,
      user
    }
})