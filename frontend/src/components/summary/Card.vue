<template>
  <v-card class="mx-left summary-answer-card" width="600" tile>
    <v-row>{{ item.message }}</v-row>
    <v-text-field v-model="answer" disabled></v-text-field>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  computed: {
    answer: function() {
      if (this.item.type === "confirm") {
        return this.item.value ? "YES" : "NO";
      }
      return this.item.value;
    }
  }
};
</script>

<style scoped>
.summary-answer-card {
  margin: 20px;
  padding: 5px;
}
</style>
