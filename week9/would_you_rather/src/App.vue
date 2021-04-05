<template>
<div id="app">
  <h1>Would you rather...?</h1>
  <!-- Loop trough questions data to render each question and its answer options into WouldYouRather component -->
  <div v-for="question in questions" v-bind:key="question.id">
    <would-you-rather
      v-bind:id="question.id" 
      v-bind:question="question.question"
      v-bind:answer1="question.answer1"
      v-bind:answer2="question.answer2"
      v-on:answer-changed="answerChanged"
    ></would-you-rather>
  </div>

  <h1>You would rather...</h1>
  <!-- for each user choise, render each one of them on an li element on screen -->
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
          answer1: "Be a Detective",
          answer2: "Be a Pilot",
      },
        {
          id: 2,
          question: "Would you rather be a wizard or a superhero?", 
          answer1: "Be a Wizard",
          answer2: "Be a Superhero",
      },
    ],
    userSelectionMessage: [],
    }
  },
  methods: {
    answerChanged(choice) {
      // add each user choice to Array
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
