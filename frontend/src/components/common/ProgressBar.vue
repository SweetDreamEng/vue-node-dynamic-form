<template>
  <v-progress-linear :color="color" v-model="percent" :height="height">
    <strong>{{ content }}</strong>
  </v-progress-linear>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: null
    },
    content: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    height: {
      type: Number,
      default: null
    }
  }
};
</script>
