<template>
  <div>
    <div>
      <h1 class="header">Список телепередач</h1>
      <button class="telecast_button" @click="closeTelecasts">
        Вернуться к списку каналов
      </button>
    </div>
    <div class="telecast_container">
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
          <div class="start_time">{{ telecast.start }}</div>
          <div>{{ telecast.title }}</div>
        </div>

        <div class="progressbar" v-if="telecast.progress">
          <span :style="`width: ${telecast.progress}%`"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'telecast',
  props: {
    telecasts: Array
  },
  methods: {
    closeTelecasts () {
      this.$emit('onCloseTelecasts')
    }
  }
}
</script>

<style>
.telecast_image {
  width: 70px;
}

.telecast_container {
display: flex;
flex-wrap: wrap;
}

.start_time {
  margin: 0 10px;
}

.telecast {
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-basis: 49%;
  margin: 5px;

}

.telecast_content {
  display: flex;
  align-items: center;
}

.telecast_button {
  margin-bottom: 20px;
  left: 0;
}

@media screen and (max-width: 991px) {
  .telecast_container {
    display: block;
  }
}

.progressbar {
  height: 6px;
  position: relative;
  background: #555;
  padding: 1px;
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
