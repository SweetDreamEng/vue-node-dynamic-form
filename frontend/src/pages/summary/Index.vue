<template>
  <v-row>
    <div class="title">Summary</div>
    <v-row v-for="item in questions">
      <summary-card :item="item" />
    </v-row>
    <option-button :color="'error'" @onClick="handleBack" :title="'BACK'" />
  </v-row>
</template>

<script>
import OptionButton from "../../components/common/Button";
import SummaryCard from "../../components/summary/Card";

export default {
  components: { SummaryCard, OptionButton },
  props: {
    questions: {
      type: Array,
      default: []
    }
  },
  methods: {
    handleBack() {
      this.$emit("onBack");
    }
  }
};
</script>
