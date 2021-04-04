<template>
<div id="app">
  <h1>Would you rather...</h1>
  <would-you-rather 
    v-bind:question="wyrQuestion"
    v-bind:answer1="wyrAnswer1"
    v-bind:answer2="wyrAnswer2"
    v-on:answer-changed="answerChanged"
  ></would-you-rather>

  <p class="userSelection">{{ userSelectionMessage }}</p>
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
    wyrQuestion: "Would you rather know the history of every object you touched or be able to talk to animals?",
    wyrAnswer1: "Talk to animals",
    wyrAnswer2: "Know history of every object",
    userSelectionMessage: "",
    }
  },
  methods: {
    answerChanged(choice) {
      this.userSelectionMessage = `Thanks! you chose ${choice}`
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
