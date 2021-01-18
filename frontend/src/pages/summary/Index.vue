<template>
  <v-row>
    <v-col>
      <div class="title">Summary</div>
      <v-row v-for="(item, idx) in questions" :key="idx">
        <summary-card :item="item" />
      </v-row>
      <option-button :color="'error'" @onClick="handleBack" :title="'BACK'" />
    </v-col>
  </v-row>
</template>

<script>
import OptionButton from '../../components/common/Button'
import SummaryCard from '../../components/summary/Card'

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
      this.$emit('onBack')
    }
  }
}
</script>
