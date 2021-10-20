<template>

  <v-row align="center" justify="center">
    <v-btn icon @click="toggleVisible">
      <v-icon>{{visibleIcon}}</v-icon>
    </v-btn>
    <v-btn text small class="text-none">
      {{ displayName }}
    </v-btn>
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
    colormaps: Array,
    nv: Object,
  },
  data() {
    return {
      itemMenu: false,
      colormap: ''
    }
  },
  computed: {
    displayName: function () {
      let parts = this.image.url.split('/')
      console.log(parts)
      let fileNamePart = parts.slice(-1)[0]
      console.log(fileNamePart)
      return fileNamePart
    },

    visibleIcon: function () {
      return this.image.visible ? 'mdi-eye' : 'mdi-eye-off'

    }
  },

  methods: {
    toggleVisible: function() {
      this.image.visible = !this.image.visible
      this.$emit('visibilityChange', this.index, this.image.visible)
    },
    removeImage: function() {
      this.$emit('removeImage', this.index)
    },
    setColormap: function() {
      this.$emit('setColormap', this.index, this.colormap)
      this.itemMenu = false
    },
    makeColorGradients(colorName) {
      console.log('making color: ', colorName)
      let gradients = ''
      let c = this.nv.colormapFromKey(colorName)
      let n = c.R.length
      console.log(n)
      gradients += `background: rgba(${c.R[n-1]},${c.G[n-1]},${c.B[n-1]},${1});`
      gradients += `background: linear-gradient(90deg,`
      for (let j=0; j< n; j++) {
        gradients += `rgba(${c.R[j]},${c.G[j]},${c.B[j]},${1}) ${(j/(n-1))*100}%,`
      }
      gradients = gradients.slice(0,-1)
      gradients += ');'
      console.log(gradients)
      return gradients
    }
  },

  mounted () {
    console.log(this.colormaps)
    this.colormap = this.image.colorMap
  }
  
}
</script>

<style scoped>

</style>