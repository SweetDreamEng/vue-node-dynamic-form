<template>
  <v-container>
    <v-row v-if="!showSummary">
      <v-col class="justify-spaceq-between">
        <v-col>
          <v-btn color="error" @click="handlePrev" :disabled="currentProblemIndex === 1">
            PREV
          </v-btn>
          <v-btn
            color="success"
            @click="handleNext"
            :disabled="currentProblemIndex === totalProblemCount"
          >
            NEXT
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            color="info"
            @click="handleSubmit"
            v-if="currentProblemIndex === totalProblemCount"
          >
            SUBMIT
          </v-btn>
        </v-col>
      </v-col>
      <v-col>
        <v-progress-linear color="deep-orange" v-model="solvedProblemPercent" height="30">
          <strong
            >{{ totalProblemCount }} / {{ totalProblemCount - currentProblemIndex }} Questions
            Remaining</strong
          >
        </v-progress-linear>
      </v-col>
      <v-col>
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
    <v-row v-if="showSummary">
      <div class="title">Summary</div>
      <v-card v-for="item in questions" class="mx-left summary-answer-card" width="600" tile>
        <v-row>{{ item.message }}</v-row>
        <v-text-field v-model="item.value" disabled></v-text-field>
      </v-card>
      <v-btn color="error" @click="handleBack">
        PREV
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      currentProblemIndex: 1,
      currentAnswer: null,
      showSummary: false,
      questions: [
        {
          type: "confirm",
          name: "bacon",
          message: "Do you like bacon?"
        },
        {
          type: "input",
          name: "favorite",
          message: "Bacon lover, what is your favorite type of bacon?"
          // when: function(answers) {
          //   return answers.bacon;
          // }
        },
        {
          type: "confirm",
          name: "pizza",
          message: "Ok... Do you like pizza?"
          // when: function(answers) {
          //   return !this.likesFood("bacon")(answers);
          // }
        },
        {
          type: "input",
          name: "favorite",
          message: "Whew! What is your favorite type of pizza?"
          // when: this.likesFood("pizza")
        }
      ]
    };

    // problem
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
    }
  },
  methods: {
    likesFood(aFood) {
      return answers => {
        return answers[aFood];
      };
    },
    correctConfirmAnswer() {
      if (this.questions[this.currentProblemIndex - 1].type === "confirm")
        this.currentAnswer = this.currentAnswer ? "Yes" : "No";
    },
    handlePrev() {
      this.correctConfirmAnswer();
      this.questions[this.currentProblemIndex - 1].value = this.currentAnswer;
      this.currentProblemIndex--;
      this.currentAnswer = this.questions[this.currentProblemIndex - 1].value;
      this.showSummary = false;
    },
    handleNext() {
      this.correctConfirmAnswer();
      this.questions[this.currentProblemIndex - 1].value = this.currentAnswer;
      this.currentProblemIndex++;
      this.currentAnswer = this.questions[this.currentProblemIndex - 1].value;
    },
    handleSubmit() {
      this.correctConfirmAnswer();
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
.summary-answer-card {
  margin: 20px;
  padding: 5px;
}
</style>
