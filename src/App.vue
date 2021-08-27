<script>
import {Niivue} from '@niivue/niivue'
const nv = new Niivue() // init a new niivue instance


export default {
  name: 'App',
  props: {

    // no props supported yet...

  },
  data(){
    return {
      // settings affect the UI and displayed data
      settings: {
        mmPrecision: 2 // how many decimal places to round to
      },
      nv: nv, // the niivue instance on this page
      mm: [0, 0, 0], // array of length 3 for millimeter coordinates.
      vox: [0, 0, 0], // array of length 3 for voxel coordinates
      // volume list is an array of any length with image objects
      // to load.
      volumeList: [
        {
          url: "./mni152.nii.gz",
          volume: {hdr: null, img: null},
          colorMap: "gray",
          opacity: 100,
          visible: true,
        },
        {
          url: "./hippo.nii.gz",
          volume: {hdr: null, img: null},
          colorMap: "Winter",
          opacity: 100,
          visible: true
        }
      ]

    }
  },

  created() {

    // nothing happens in created yet...
    
  },

  watch: {
    // watch for changes in crosshair Position
    'nv.scene.crosshairPos': {
      handler(val, oldVal) {
        // convert from clip space to mm
        let mm = this.nv.frac2mm(val)
        // round mm display values to 2 decimal places
        // update mm coordinates to display
        this.mm = [
          +mm[0].toFixed(this.settings.mmPrecision),
          +mm[1].toFixed(this.settings.mmPrecision),
          +mm[2].toFixed(this.settings.mmPrecision)
        ]
        // update voxel coordinates to display
        this.vox = this.nv.frac2vox(val)
      },
      // this is a deep watcher since we are watching for any value in the array
      deep: true,
    }
  },

  mounted() {
    // runs when the vue instance is ready and attached to the #app element
    this.nv.attachTo('gl') // attach the niivue instance to the canvas with id 'gl'
    this.nv.loadVolumes(this.volumeList) // load the volume list and render in the canvas
  }
}

</script>

<template>
<section style="height: 500px">
  <canvas id="gl" height="480" width="640">
  </canvas>
</section>

<section style="margin: 0px">
  mm:{{ mm }}
</section>

<section style="margin: 0px">
  vox:{{ vox }}
</section>
</template>

<style>
#app {
}
</style>
