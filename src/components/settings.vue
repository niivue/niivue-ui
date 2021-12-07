<template>

<v-row justify="center">
  <v-dialog 
    overlay-opacity="0" 
    overlay-color="blue" 
    v-model="show_" 
    fullscreen 
    hide-overlay 
    persistent
    transition="dialog-top-transition">
    <v-card>
      <v-toolbar
          color="light"
          flat
        >
          <v-btn
            icon
            @click="closeDialog"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
      </v-toolbar>
      <!-- crosshair color -->
      <v-row justify="center" align="center" class="mx-4">
        <v-col cols="12" sm="12" md="3" lg="3" class="my-2">
          <h3>Crosshair color</h3>
        </v-col>
        <v-col cols="12" sm="12" md="9" lg="9" class="my-2">
          <v-color-picker
          v-model="crosshairColor"
            hide-canvas
            hide-mode-switch
            mode="rgba"
            @input="setCrosshairColor"
          ></v-color-picker>
        </v-col>
      </v-row>
      <v-divider class="mx-4"></v-divider>
      <!-- crosshair size -->
      <v-row justify="center" align="center" class="mx-4">
        <v-col cols="12" sm="12" md="3" lg="3" class="my-2">
          <h3>Crosshair size</h3>
        </v-col>
        <v-col cols="12" sm="12" md="9" lg="9" class="my-2">
          <v-slider
            v-model="crosshairWidth"
            step="1"
            min="0"
            max="10"
            label="off"
            :tick-labels="crosshairWidthLabels"
            ticks
            @input="setCrosshairWidth"
      ></v-slider>
        </v-col>
      </v-row>
      <v-divider class="mx-4"></v-divider>
      <!-- selection box color -->
      <v-row justify="center" align="center" class="mx-4">
        <v-col cols="12" sm="12" md="3" lg="3" class="my-2">
          <h3>Selection box color</h3>
        </v-col>
        <v-col cols="12" sm="12" md="9" lg="9" class="my-2">
          <v-color-picker
          v-model="selectionBoxColor"
            hide-canvas
            hide-mode-switch
            mode="rgba"
            @input="setSelectionBoxColor"
          ></v-color-picker>
        </v-col>
      </v-row>
      <v-divider class="mx-4"></v-divider>
      <!-- background color -->
      <v-row justify="center" align="center" class="mx-4">
        <v-col cols="12" sm="12" md="3" lg="3" class="my-2">
          <h3>Background color</h3>
        </v-col>
        <v-col cols="12" sm="12" md="9" lg="9" class="my-2">
          <v-row class="my-2">
            <v-btn 
              class="black--text mx-2" 
              color="white"
              @click="setBackgroundColor([1,1,1,1])">
              White
            </v-btn>
            <v-btn 
              class="white--text mx-2" 
              color="black"
              @click="setBackgroundColor([0,0,0,1])">
              Black
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-divider class="mx-4"></v-divider>
      <v-row class="my-4">
        <v-spacer></v-spacer>
        <v-btn class="my-4" @click="closeDialog">Close</v-btn>
        <v-spacer></v-spacer>
      </v-row>
    </v-card>
  </v-dialog>
</v-row>

  
</template>

<script>
export default {
  name: 'niivueSettings',
  props: {
    show: Boolean
  },
  data () {
    return {
      show_ :this.show,
      crosshairColor: { r: 255, g: 0, b: 0, a: 1 },
      selectionBoxColor: { r: 255, g: 0, b: 0, a: 0.5 },
      crosshairWidth: 1,
      crosshairWidthLabels:[0,1,2,3,4,5,6,7,8,9, 10]
    }
  },
  methods: {
    rgba2array: function(rgbaObj){
      return [
        rgbaObj.r/255,
        rgbaObj.g/255,
        rgbaObj.b/255,
        rgbaObj.a
      ]
    },
    closeDialog: function () {
      this.show_ = false
      this.$emit('close-settings')
    },
    setCrosshairColor: function() {
      this.$emit('setCrosshairColor', this.rgba2array(this.crosshairColor))
    },
    setSelectionBoxColor: function() {
      this.$emit('setSelectionBoxColor', this.rgba2array(this.selectionBoxColor))
    },
    setBackgroundColor: function(color) {
      this.$emit('setBackgroundColor', color)
      this.closeDialog()
    },
    setCrosshairWidth: function() {
      this.$emit('setCrosshairWidth', this.crosshairWidth)
    }
  }
  
}
</script>

<style>

</style>