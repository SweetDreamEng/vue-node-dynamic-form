<template>
  <v-btn :color="color" @click="$emit('onClick')" :disabled="disabled">
    {{ title }}
  </v-btn>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
