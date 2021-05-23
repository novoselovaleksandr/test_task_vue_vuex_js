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

.channel {
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-basis: 200px;
  margin: 5px;
}

.channels_container {
  display: flex;
  flex-wrap: wrap;
}

.telecast_image {
  width: 70px;
}

.telecast_container {
  columns: 2;
}

@media screen and (max-width: 991px) {
  .telecast_container {
    columns: 1;
  }
}

.telecast_content {
  display: flex;
}

.telecast {
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-basis: 200px;
  margin: 5px;
}

.progressbar {
  height: 20px;
  position: relative;
  background: #555;
  padding: 3px;
  box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
}

.progressbar > span {
  display: block;
  height: 100%;
  background-color: rgb(43, 194, 83);
  background-image: linear-gradient(
    center bottom,
    rgb(43, 194, 83) 37%,
    rgb(84, 240, 84) 69%
  );
  box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),
    inset 0 -2px 6px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
}
</style>
