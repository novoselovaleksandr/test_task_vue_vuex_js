import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    channels: []
  },
  mutations: {
    updateChannels (state, channels) {
      state.channels = channels
    }
  },
  actions: {
    getChannels (context) {
      axios
        .get('https://epg.domru.ru/channel/list?domain=ekat')
        .then((response) => {
          context.commit('updateChannels', response.data)
        })
    }
  },
  getters: {
    allChannels (state) {
      return state.channels
    }
  }
})
