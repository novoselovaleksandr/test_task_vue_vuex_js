<template>
  <div id="app">
    <div class="channels_container" v-if="!telecastsShow">
      <div
        class="channel"
        v-for="channel in channels"
        :key="channel.id"
        @click="showListOfTelecasts(channel.xvid)"
      >
        <h2>{{ channel.title }}</h2>
        <img :src="'https://epg.domru.ru/' + channel.logo" />
      </div>
    </div>
    <div class="telecast_container" v-if="telecastsShow">
      <button @click="closeTelecasts">Закрыть</button>
      <div class="telecast" v-for="telecast in telecasts" :key="telecast.id">

        <div class="telecast_content">
          <img
            class="telecast_image"
            :src="
              'https://domru.ru/' +
              'epgservice/ertelecomipfile/pic/' +
              telecast.icon
            "
          />
          <div>{{ telecast.title }}</div>
          <div>{{ telecast.start }}</div>
        </div>

        <div class="progressbar" v-if="telecast.progress">
          <span :style="`width: ${telecast.progress}%`"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  components: {},
  data () {
    return {
      channels: [],
      telecasts: [],
      telecastsShow: false
    }
  },
  mounted () {
    axios
      .get('https://epg.domru.ru/channel/list?domain=ekat')
      .then((response) => {
        this.channels = response.data
      })
  },
  methods: {
    showListOfTelecasts (id) {
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
        .then((response) => {
          this.telecasts = response.data[id].map((telecast) => {
            const dateTimeNow = new Date().getTime()
            const startDate = new Date(telecast.start)
            const start = `${startDate.getHours()}:${startDate.getMinutes()}`

            const duration = Number(telecast.duration)
            const endDate = startDate.getTime() + duration * 1000

            const isFinished = endDate < dateTimeNow
            const isInProgress = endDate > dateTimeNow && startDate.getTime() <= dateTimeNow

            const progress = isInProgress ? Math.floor((endDate - dateTimeNow) / duration / 100 - 1) : 0

            return {
              title: telecast.title,
              icon: telecast.icon,
              start,
              isFinished,
              progress
            }
          })
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
