import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    routers:[]
  },
  mutations:{
    initRoutes(state,data){
      state.routers = data;
    }
  },
  actions:{

  }

})
