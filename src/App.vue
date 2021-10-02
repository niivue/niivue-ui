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
          <image-list 
            v-on:removeImage="removeImage" 
            v-on:visibilityChange="visibilityChange" 
            v-on:setColormap="setColormap"
            :images=volumeList
            :colormaps="this.nv.colorMaps()"
            :nv=nv>
            
          </image-list>
          <!-- <v-spacer></v-spacer> -->
        <v-col cols="12" sm="12" md="9" lg="9" class="my-2">
          <v-row class="mb-2">
            <v-col cols="6">
              <v-select :items="sliceTypes" v-model="sliceType" item-text="text" item-value="value" @change="setSliceType" solo dense hide-details>
              </v-select>
            </v-col>
          </v-row>
          <div style="width: 100%">
            <canvas id="gl" height="480" width="640"> </canvas>
          </div>
        </v-col>
        
        </v-row>
      </v-container>
      <settings 
        v-on:close-settings="showSettings=!showSettings" 
        v-on:setCrosshairColor="setCrosshairColor"
        v-on:setSelectionBoxColor="setSelectionBoxColor"
        v-on:setBackgroundColor="setBackgroundColor"
        v-on:setCrosshairWidth="setCrosshairWidth"
        :show=showSettings></settings>
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
    sliceTypes: [
      {text: '2D Multiplanar (A + C + S)', value: nv.sliceTypeMultiplanar},
      {text: '3D', value: nv.sliceTypeRender},
      {text: 'Axial', value: nv.sliceTypeAxial},
      {text: 'Coronal', value: nv.sliceTypeCoronal},
      {text: 'Sagittal', value: nv.sliceTypeSagittal}
    ],
    sliceType: {text: '2D Multiplanar (A + C + S)', value: nv.sliceTypeMultiplanar},
    volumeList: [
      {
        url: "./mni152.nii",
        volume: { hdr: null, img: null },
        colorMap: "gray",
        opacity: 1,
        visible: true,
      },
      {
        url: "./hippo.nii",
        volume: { hdr: null, img: null },
        colorMap: "winter",
        opacity: 1,
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
    },
    // removeImage: function(index) {
      // this.volumeList.splice(index, 1)
      // this.nv.updateGLVolume()
    // },
    setSliceType: function(sliceType) {
      console.log(sliceType)
      this.nv.setSliceType(sliceType)
    },
    setColormap: function(index, colormap) {
      this.volumeList[index].colorMap = colormap
      this.nv.updateGLVolume()
    },
    setCrosshairColor: function(color) {
      this.nv.setCrosshairColor(color)
    },
    setSelectionBoxColor: function(color) {
      this.nv.setSelectionBoxColor(color)
    },
    setBackgroundColor: function (color) {
      this.nv.opts.backColor = color
      if (color[0] === 0 && color[1]===0 && color[2] === 0){
        this.nv.canvas.parentElement.style.backgroundColor = "black";
      }
      if (color[0] === 1 && color[1]===1 && color[2] === 1){
        this.nv.canvas.parentElement.style.backgroundColor = "white";
      }
      this.nv.drawScene()
    },
    setCrosshairWidth: function(width) {
      this.nv.opts.crosshairWidth = width
      this.nv.drawScene()
    }
  },
  mounted() {
    // runs when the vue instance is ready and attached to the #app element
    this.nv.attachTo("gl"); // attach the niivue instance to the canvas with id 'gl'
    this.nv.loadVolumes(this.volumeList); // load the volume list and render in the canvas
  },
};
</script>

<style scoped>

</style>
