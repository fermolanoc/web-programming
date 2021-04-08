<template>
<div id="app">
  <h1>Would you rather...?</h1>
  <!-- Loop trough questions data to render each question and its answer options into WouldYouRather component -->
    <would-you-rather
      v-for="question in questions" v-bind:key="question.id"
      v-bind:question="question" 
      v-on:answer-changed="answerChanged"
      v-on:choices-to-render="choicesToRender"
    ></would-you-rather>
  

  <h1>You would rather...</h1>
  <!-- for each user choice, render each one of them on an li element on screen -->
  <p class="userSelection" v-for="choice in choicesToRender" v-bind:key="choice.id">
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
    answerChanged(id, choice) {
      // add each user choice to Array
      this.userSelectionMessage[id] = choice
    }
  },
  computed: {
    // this function will save only the choices to the questions user has already choose for
    choicesToRender: function() {
      let userChoices = []
      this.userSelectionMessage.forEach(choice => {
        if (choice) { // if there's a question with no option chosen(undefined) it won't be saved
          userChoices.push(choice)
        }
      });
      return userChoices; //return the new list with only chosen options
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
