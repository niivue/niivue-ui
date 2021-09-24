<template>
<v-col class="mx-5 my-2">
  <image-item 
    v-on:removeImage="removeImage" 
    v-on:visibilityChange="visibilityChange" 
    v-on:setColormap="setColormap"
    v-for="(image, index) in images" 
    :key="index" 
    :image=image 
    :index=index
    :colormaps="colormaps">

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
    images: Array,
    colormaps:Array
  },
  data () {
    return {

    }
  },
  methods: {
    visibilityChange: function(index, visible) {
      this.$emit('visibilityChange', index, visible)
    },
    removeImage: function(index) {
      this.$emit('removeImage', index)
    },
    setColormap: function(index, colormap) {
      this.$emit('setColormap', index, colormap)
    }
  }
  
}
</script>

<style scoped>

</style>