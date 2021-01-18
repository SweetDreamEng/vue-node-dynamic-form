<template>
  <v-container v-if="showSummary">
    <summary-container :questions="availableQuestions" @onBack="handleBack" />
  </v-container>
  <v-container v-else align="center" justify="center">
    <v-row>
      <v-col cols="12">
        <option-button
          :color="'success'"
          @onClick="handleNext"
          :title="'NEXT'"
          :disabled="isLastQuestion()"
        />
        <option-button
          :color="'info'"
          @onClick="handleSubmit"
          :title="'SUBMIT'"
          v-if="isLastQuestion()"
        />
      </v-col>
      <v-col cols="12">
        <progress-bar
          :color="'deep-orange'"
          :percent="answeredQuestionPercent"
          :content="progressBarContentString"
          :height="30"
        />
      </v-col>
      <v-col cols="12">
        <v-checkbox
          v-if="currentQuestion && currentQuestion.type === 'confirm'"
          :label="`${currentQuestion.message}`"
          v-model="currentAnswer"
          @change="handleChangeAnswer"
        ></v-checkbox>
        <v-text-field
          v-if="currentQuestion && currentQuestion.type === 'input'"
          :label="`${currentQuestion.message}`"
          v-model="currentAnswer"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OptionButton from '../components/common/Button'
import ProgressBar from '../components/common/ProgressBar'
import SummaryContainer from './summary/Index'
import axios from 'axios'

export default {
  components: { SummaryContainer, OptionButton, ProgressBar },
  data() {
    return {
      currentQuestionIndex: 1,
      currentAnswer: null,
      showSummary: false,
      questions: [],
      availableQuestions: [],
      answers: []
    }
  },
  async mounted() {
    const response = await axios.get('http://localhost:3000/questions')
    this.questions = response.data
    this.updateQuestionAvailability()
  },
  computed: {
    answeredQuestionPercent: function () {
      return (100 * this.currentAvailableQuestionIndex) / this.totalProblemCount
    },
    totalProblemCount: function () {
      return this.availableQuestions.length
    },
    currentQuestion: function () {
      if (!!this.questions) {
        return this.questions[this.currentQuestionIndex - 1]
      }
    },
    progressBarContentString: function () {
      return `${this.totalProblemCount} / ${
        this.totalProblemCount - this.currentAvailableQuestionIndex
      } Questions Remaining`
    },
    currentAvailableQuestionIndex: function () {
      return (
        this.availableQuestions.findIndex(
          (question) => question._id === this.currentQuestion._id
        ) + 1
      )
    }
  },
  methods: {
    handleChangeAnswer() {
      const name = this.questions[this.currentQuestionIndex - 1].name
      this.answers[name] = this.currentAnswer
      this.updateQuestionAvailability()
    },
    likesFood(aFood) {
      return function (answers) {
        return answers[aFood]
      }
    },
    updateQuestionAvailability() {
      this.questions.map((question) => {
        console.log(this.answers)
        if (question.when) {
          var func = new Function('return ' + question.when)()
          question['availability'] = func(this.answers, this.likesFood)
        }
      })
      this.availableQuestions = this.questions.filter(
        (question) => question.availability
      )
    },
    handleNext() {
      this.questions[this.currentQuestionIndex - 1].value = this.currentAnswer
      this.currentQuestionIndex++
      let nextQuestion = this.questions[this.currentQuestionIndex - 1]
      while (
        nextQuestion.availability !== true &&
        this.currentQuestionIndex <= this.questions.length
      ) {
        this.currentQuestionIndex++
        nextQuestion = this.questions[this.currentQuestionIndex - 1]
      }
      this.currentAnswer = nextQuestion.value
    },
    handleSubmit() {
      this.questions[this.currentQuestionIndex - 1].value = this.currentAnswer
      this.availableQuestions = this.questions.filter(
        (question) => question.availability
      )
      this.showSummary = true
    },
    handleBack() {
      this.showSummary = false
    },
    isLastQuestion() {
      let isLast = true
      for (let i = this.currentQuestionIndex; i < this.questions.length; i++) {
        if (this.questions[i].availability === true) {
          isLast = false
        }
      }
      return isLast
    }
  }
}
</script>

<style scoped>
.v-progress-linear {
  color: white;
  font-size: 16px;
  width: 800px;
  text-align: center;
}
</style>
