<template>
<div id="app">
  <h1>Would you rather...</h1>
  <div v-for="question in questions" v-bind:key="question.id">
    <would-you-rather 
      v-bind:question="question.question"
      v-bind:answer1="question.answer1"
      v-bind:answer2="question.answer2"
      v-on:answer-changed="answerChanged"
    ></would-you-rather>
  </div>

  <p class="userSelection" v-for="choice in userSelectionMessage" v-bind:key="choice.id">
    <li>{{ choice }}</li>
  </p>
</div>
</template>

<script>
import WouldYouRather from './components/WouldYouRather.vue'

export default {
  name: 'App',
  components: {
    WouldYouRather
  },
  data() {
    return {
      questions: [
        {
          id: 0,
          question: "Would you rather know the history of every object you touched or be able to talk to animals?", 
          answer1: "Talk to animals",
          answer2: "Know history of every object",
      },
        {
          id: 1,
          question: "Would you rather be a detective or a pilot??", 
          answer1: "Detective",
          answer2: "Pilot",
      },
        {
          id: 2,
          question: "Would you rather be a wizard or a superhero?", 
          answer1: "Wizard",
          answer2: "Superhero",
      },
    ],
    userSelectionMessage: [],
    }
  },
  methods: {
    answerChanged(choice) {
      this.userSelectionMessage.push(choice)
    }
  }
}
</script>

<style>
body {
  background-color: rgb(231, 231, 231);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.userSelection {
  font-size: 1.4rem;
  font-weight: bold;
  color: rgb(25, 25, 122);
}
</style>
