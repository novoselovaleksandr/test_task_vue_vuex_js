<template>
<div class="channels_container">
      <div
        class="channel"
        v-for="channel in channels"
        :key="channel.id"
        @click="$emit('clickOnChannel', channel.xvid)"
      >
        <h2>{{ channel.title }}</h2>
        <img :src="'https://epg.domru.ru/' + channel.logo" />
      </div>
    </div>
</template>

<script>

export default {
  name: 'channels',
  props: {
    channels: Array
  }

}
</script>
