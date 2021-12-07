<template>
<v-col class="mx-5 my-2">
  <image-item 
    v-for="(image, index) in nv.volumes" 
    :key="index" 
    :image="image"
    :index="index"
    :nv="nv">

  </image-item>
</v-col>
</template>

<script>
import imageItem from '@/components/imageItem.vue'
export default {
  name: 'imageList',
  components: {
    imageItem,
  },
  props: {
    images: Array,
    nv: Object
  },
  data () {
    return {

    }
  },
  methods: {
    
  },
  mounted () {
    console.log(this.nv.volumes[0])
  }
  
}
</script>

<style scoped>

</style>