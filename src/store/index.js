import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    channels: [],
    telecasts: {}
  },
  mutations: {
    updateChannels (state, channels) {
      state.channels = channels
    },
    updateTelecasts (state, { telecasts, id }) {
      state.telecasts[id] = telecasts
    }
  },
  actions: {
    getChannels (context) {
      axios
        .get('https://epg.domru.ru/channel/list?domain=ekat')
        .then((response) => {
          context.commit('updateChannels', response.data)
        })
    },
    getListOfTelecasts (context, id) {
      return new Promise((resolve, reject) => {
        if (!(id in context.getters.getTelecasts)) {
          axios
            .get('https://epg.domru.ru/program/list', {
              params: {
                digit: 1,
                date_from: '2021-05-23',
                date_to: '2021-05-24',
                xvid: [id],
                domain: 'ekat'
              }
            })
            .then(response => {
              const telecastParametrs = response.data[id].map(telecast => {
                const dateTimeNow = new Date().getTime()
                const startDate = new Date(telecast.start)
                const start = `${startDate.getHours()}:${startDate.getMinutes()}`

                const duration = Number(telecast.duration)
                const endDate = startDate.getTime() + duration * 1000

                const isFinished = endDate < dateTimeNow
                const isInProgress =
                endDate > dateTimeNow && startDate.getTime() <= dateTimeNow

                const progress = isInProgress
                  ? Math.floor((endDate - dateTimeNow) / duration / 100 - 1)
                  : 0

                return {
                  title: telecast.title,
                  icon: telecast.icon,
                  start,
                  isFinished,
                  progress
                }
              })
              resolve(telecastParametrs)

              context.commit('updateTelecasts', { telecasts: telecastParametrs, id })
            }).catch((e) => { reject(e) })
        } else {
          resolve(context.getters.getTelecasts[id])
        }
      })
    }
  },
  getters: {
    allChannels (state) {
      return state.channels
    },
    getTelecasts: (state) => {
      return state.telecasts
    }
  }
})
