 <template>
 <div class="telecast_container">
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
