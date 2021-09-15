<template>

  <v-row align="center" justify="center">
    <v-btn icon @click="toggleVisible">
      <v-icon>{{visibleIcon}}</v-icon>
    </v-btn>
    <v-btn text small class="text-none">
      {{ displayName }}
    </v-btn>
    <v-spacer></v-spacer>
  </v-row>
  
</template>

<script>
export default {
  name: 'imageItem',
  props: {
    image: Object,
    index: Number
  },
  data() {
    return {

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
    }
  }
  
}
</script>

<style scoped>

</style>