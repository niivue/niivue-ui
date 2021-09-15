<template>

<v-row justify="center">
  <v-dialog v-on:keydown="$emit('close-settings')" overlay-opacity="0" overlay-color="blue" v-model="show" fullscreen hide-overlay transition="dialog-top-transition">
    <v-card>

    </v-card>
  </v-dialog>
</v-row>

  
</template>

<script>
export default {
  name: 'settings',
  props: {
    show: Boolean
  }
  
}
</script>

<style>

</style>