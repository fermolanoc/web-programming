<template>
  <div class="wyr">
    <h2>Choose one option</h2>
    <!-- Render each question -->
    <h3>{{ question.question }}</h3>

    <!-- for each question, show its 2 respective options -->
    <input type="radio" v-model="choice" v-bind:value="question.answer1" v-on:change="choiceMade"><label for="">{{ question.answer1 }}</label>
    <input type="radio" v-model="choice" v-bind:value="question.answer2" v-on:change="choiceMade"><label for="">{{ question.answer2 }}</label>
  </div>
</template>

<script>
export default {
  name: 'WouldYouRather',
  props: {
    question: Object,
  },
  data() {
    return {
      choice: ""
    }
  },
  methods: {
    // when select any of the answer options, save the selection on the choice parameter to sent to parent
    choiceMade() {
      this.$emit("answer-changed", this.question.id, this.choice)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.wyr {
  padding: .5rem 2rem 2rem;
  margin-bottom: 1rem;
  border-radius: 20px;
  background-color: white;
}
input {
  margin-top: 1rem;
}
</style>
