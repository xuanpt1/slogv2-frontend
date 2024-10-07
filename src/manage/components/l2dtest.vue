<template>
    <live2d
        :style="style"
        :model="['Potion-Maker/Pio', 'school-2017-costume-yellow']"
        :direction="direction"
        :size="size"
    ></live2d>
</template>

<script>
import live2d from 'vue-live2d'

export default {
  name: 'test',
  components: {
    live2d
  },
  data () {
    return {
      direction: 'left',
      style: 'position: fixed; bottom: 0; left: 0; zIndex: 1000',
      width: 300,
      height: 300,
      size: 250,
    }
  },
}
</script>

<style>
body {
  margin: 20px;
  padding: 0;
}
</style>
