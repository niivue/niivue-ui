<template>
  <v-app>
    <v-app-bar app color="" elevation="0">
      <div class="d-flex align-center">
        <h2>NiiVue</h2>
      </div>

      <v-spacer></v-spacer>


      <v-btn
        text
        @click="showSettings=!showSettings"
        disabled
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>

      <v-btn
        href="https://github.com/niivue"
        target="_blank"
        text
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>
      
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row no-gutters align-content="space-between" justify="space-between">
          <image-list v-on:visibilityChange="visibilityChange" :images=volumeList>
            
          </image-list>
          <!-- <v-spacer></v-spacer> -->
        <v-col cols="12" sm="12" md="9" lg="9" class="my-2">
          <div style="width: 100%">
            <canvas id="gl" height="480" width="640"> </canvas>
          </div>
        </v-col>
        
        </v-row>
      </v-container>
      <settings v-on:close-settings="showSettings=!showSettings" :show=showSettings></settings>
    </v-main>
  </v-app>
</template>

<script>
import imageList from '@/components/imageList.vue'
import settings from '@/components/settings.vue'
import { Niivue } from "@niivue/niivue";
const nv = new Niivue(); // init a new niivue instance

export default {
  name: "App",

  components: {
    imageList,
    settings
  },

  data: () => ({
    showSettings: false,
    settings: {
      mmPrecision: 2, // how many decimal places to round to
    },
    nv: nv, // the niivue instance on this page
    mm: [0, 0, 0], // array of length 3 for millimeter coordinates.
    vox: [0, 0, 0], // array of length 3 for voxel coordinates
    // volume list is an array of any length with image objects
    // to load.
    volumeList: [
      {
        url: "./mni152.nii.gz",
        volume: { hdr: null, img: null },
        colorMap: "gray",
        opacity: 100,
        visible: true,
      },
      {
        url: "./hippo.nii.gz",
        volume: { hdr: null, img: null },
        colorMap: "winter",
        opacity: 100,
        visible: true,
      },
    ],
  }),
  watch: {
    // watch for changes in crosshair Position
    'nv.scene.crosshairPos': {
      handler(val, oldval) {
        console.log(val)
        console.log(oldval)
        // convert from clip space to mm
        let mm = this.nv.frac2mm(val);
        // round mm display values to 2 decimal places
        // update mm coordinates to display
        this.mm = [
          +mm[0].toFixed(this.settings.mmPrecision),
          +mm[1].toFixed(this.settings.mmPrecision),
          +mm[2].toFixed(this.settings.mmPrecision),
        ];
        // update voxel coordinates to display
        this.vox = this.nv.frac2vox(val);
      },
      // this is a deep watcher since we are watching for any value in the array
      // deep: true,
    }
  },
  methods: {
    visibilityChange: function (index, visible) {
      console.log(index)
      console.log(visible)
      console.log('blah')
      this.nv.setOpacity(index, visible)
      // this.volumeList[index].visible = visible
      // this.nv.updateGLVolume()
    }
  },
  mounted() {
    // runs when the vue instance is ready and attached to the #app element
    this.nv.attachTo("gl"); // attach the niivue instance to the canvas with id 'gl'
    this.nv.loadVolumes(this.volumeList); // load the volume list and render in the canvas
    this.nv.set
  },
};
</script>

<style>

</style>
