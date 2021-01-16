<template>
  <v-container v-if="showSummary">
    <summary-container :questions="questions" @onBack="handleBack" />
  </v-container>
  <v-container v-else align="center" justify="center">
    <v-row>
      <v-col cols="12">
        <option-button
          :color="'error'"
          @onClick="handlePrev"
          :title="'PREV'"
          :disabled="currentProblemIndex === 1"
        />
        <option-button
          :color="'success'"
          @onClick="handleNext"
          :title="'NEXT'"
          :disabled="currentProblemIndex === totalProblemCount"
        />
        <option-button
          :color="'info'"
          @onClick="handleSubmit"
          :title="'SUBMIT'"
          v-if="currentProblemIndex === totalProblemCount"
        />
      </v-col>
      <v-col cols="12">
        <progress-bar
          :color="'deep-orange'"
          :percent="solvedProblemPercent"
          :content="progressBarContentString"
          :height="30"
        />
      </v-col>
      <v-col cols="12">
        <v-checkbox
          v-if="currentQuestion.type === 'confirm'"
          :label="`${currentQuestion.message}`"
          v-model="currentAnswer"
        ></v-checkbox>
        <v-text-field
          v-if="currentQuestion.type === 'input'"
          :label="`${currentQuestion.message}`"
          v-model="currentAnswer"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OptionButton from "../components/common/Button";
import ProgressBar from "../components/common/ProgressBar";
import SummaryContainer from "./summary/Index";

export default {
  components: { SummaryContainer, OptionButton, ProgressBar },
  data() {
    return {
      currentProblemIndex: 1,
      currentAnswer: null,
      showSummary: false,
      questions: null
    };
  },
  computed: {
    solvedProblemPercent: function() {
      return (100 * this.currentProblemIndex) / this.totalProblemCount;
    },
    totalProblemCount: function() {
      return this.questions.length;
    },
    currentQuestion: function() {
      return this.questions[this.currentProblemIndex - 1];
    },
    progressBarContentString: function() {
      return `${this.totalProblemCount} / ${this.totalProblemCount -
        this.currentProblemIndex} Questions Remaining`;
    }
  },
  mounted() {
    this.$http.get("http://localhost:3000/questions").then(response => {
      this.questions = response;
    });
  },
  methods: {
    likesFood(aFood) {
      return answers => {
        return answers[aFood];
      };
    },
    handlePrev() {
      this.questions[this.currentProblemIndex - 1].value = this.currentAnswer;
      this.currentProblemIndex--;
      this.currentAnswer = this.questions[this.currentProblemIndex - 1].value;
      this.showSummary = false;
    },
    handleNext() {
      this.questions[this.currentProblemIndex - 1].value = this.currentAnswer;
      this.currentProblemIndex++;
      this.currentAnswer = this.questions[this.currentProblemIndex - 1].value;
    },
    handleSubmit() {
      this.questions[this.currentProblemIndex - 1].value = this.currentAnswer;
      this.showSummary = true;
    },
    handleBack() {
      this.showSummary = false;
    }
  }
};
</script>

<style scoped>
.v-progress-linear {
  color: white;
  font-size: 16px;
  width: 800px;
  text-align: center;
}
</style>
