<template>
  <div>
    <h1 class="header">Список каналов</h1>
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

<style>
.channel {
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-basis: 200px;
  margin: 5px;
}

.channels_container {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
