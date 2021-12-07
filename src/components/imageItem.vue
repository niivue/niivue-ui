<template>

  <v-row align="center" justify="center" no-gutters>
    <v-col cols="2" class="mx-0 my-0" >
      <v-btn small icon @click="moveImageDown">
        <v-icon small v-show="index != 0">
          mdi-arrow-up-thick
        </v-icon>
      </v-btn>
      <v-btn small icon @click="moveImageUp">
        <v-icon small v-show="index != 0">
          mdi-arrow-down-thick
        </v-icon>
      </v-btn>
    </v-col>
    <v-btn icon @click="toggleVisible">
      <v-icon>{{visibleIcon}}</v-icon>
    </v-btn>
    <!-- <v-btn text small class="text-none">
      {{ image.name }}
    </v-btn> -->
    <p class="my-2"> {{ image.name }}</p>
    <v-spacer></v-spacer>
    <v-menu
      v-model="itemMenu"
      top 
      offset-x 
      left
      :close-on-content-click="false"
      :nudge-width="200">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon class="mr-4">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-action-text class="text-subtitle-2">color</v-list-item-action-text>
            <v-list-item-action>
              <v-select
                v-model="colormap"
                :items="colormaps"
                @change="setColormap"
                dense
                solo>
                <template v-slot:item="{item}">
                    <v-row class="my-1" >
                      <v-col>
                        {{item}}
                      </v-col >
                      <v-col :style="makeColorGradients(item)">
                      </v-col>
                    </v-row>
                </template>
              </v-select>
            </v-list-item-action>
            
          </v-list-item>
        </v-list>
      </v-card>
      <!-- <v-btn @click="removeImage" text>remove</v-btn> -->
      
    </v-menu>
  </v-row>

  
  
</template>

<script>
export default {
  name: 'imageItem',
  props: {
    image: Object,
    index: Number,
    nv: Object,
  },
  data() {
    return {
      itemMenu: false,
      colormap: '', 
    }
  },
  computed: {
    visibleIcon: function () {
      return this.image.opacity > 0 ? 'mdi-eye' : 'mdi-eye-off'

    },

    colormaps: function() {
      return this.image.colorMaps()
    }
  },

  methods: {
    toggleVisible: function() {
      // this.image.visible = !this.image.visible
      // this.$emit('visibilityChange', this.index, this.image.visible)
      let currentOpacity = this.image.opacity
      this.nv.setOpacity(this.nv.getVolumeIndexByID(this.image.id), currentOpacity>0 ? 0 : 1)
    },
    removeImage: function() {
      // this.$emit('removeImage', this.index)
    },
    setColormap: function() {
      console.log(this.colormap)
      this.nv.setColorMap(this.image.id, this.colormap)
      this.itemMenu = false
    },
    moveImageUp: function() {
      this.nv.moveVolumeUp(this.image)
      this.$forceUpdate()
      this.nv.updateGLVolume()
    },
    moveImageDown: function() {
      this.nv.moveVolumeDown(this.image)
      this.$forceUpdate()
      this.nv.updateGLVolume()
    },
    makeColorGradients(colorName) {
      // console.log('making color: ', colorName)
      let gradients = ''
      let c = this.nv.colormapFromKey(colorName)
      let n = c.R.length
      // console.log(n)
      gradients += `background: rgba(${c.R[n-1]},${c.G[n-1]},${c.B[n-1]},${1});`
      gradients += `background: linear-gradient(90deg,`
      for (let j=0; j< n; j++) {
        gradients += `rgba(${c.R[j]},${c.G[j]},${c.B[j]},${1}) ${(j/(n-1))*100}%,`
      }
      gradients = gradients.slice(0,-1)
      gradients += ');'
      // console.log(gradients)
      return gradients
    }
  },

  mounted () {
    this.colormap = this.image.colorMap
  }
  
}
</script>

<style scoped>

</style>