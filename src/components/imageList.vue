<template>
<v-col class="mx-5 my-2">
  <image-item v-on:visibilityChange="visibilityChange" v-for="(image, index) in images" :key="index" :image=image :index=index>

  </image-item>
</v-col>
</template>

<script>
import imageItem from '@/components/imageItem.vue'
export default {
  name: 'imageList',
  components: {
    imageItem
  },
  props: {
    images: Array
  },
  data () {
    return {

    }
  },
  methods: {
    visibilityChange: function(index, visible) {
      this.$emit('visibilityChange', index, visible)
    }
  }
  
}
</script>

<style scoped>

</style>