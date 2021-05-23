<template>
  <div id="app">
    <div v-show="!telecastsShow">
      <channels :channels="allChannels" @clickOnChannel="showListOfTelecasts" />
    </div>
    <div v-show="telecastsShow">
      <telecasts @onCloseTelecasts="closeTelecasts" :telecasts="telecasts" />
    </div>
  </div>
</template>

<script>
import channels from './components//channels/channels.vue'
import telecasts from './components/telecasts/telecasts'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    channels,
    telecasts
  },
  data () {
    return {
      telecasts: [],
      telecastsShow: false
    }
  },
  computed: mapGetters(['allChannels', 'getTelecasts']),
  mounted () {
    this.getChannels()
  },
  methods: {
    ...mapActions(['getChannels', 'getListOfTelecasts']),
    showListOfTelecasts (id) {
      this.getListOfTelecasts(id).then(listOfTelecasts => {
        this.telecasts = listOfTelecasts
      })
      this.telecastsShow = true
    },
    closeTelecasts () {
      this.telecastsShow = false
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.header {
  line-height: 1.45;
  font-size: 2.2rem;
  font-weight: 600;
}

</style>
