<template>
  <div class="wyr">
    <h2>Choose one option</h2>
    <h3>{{ question }}</h3>

    <input type="radio" v-model="choice" v-bind:value="answer1" v-on:change="choiceMade"><label for="">{{ answer1 }}</label>
    <input type="radio" v-model="choice" v-bind:value="answer2" v-on:change="choiceMade"><label for="">{{ answer2 }}</label>
  </div>
</template>

<script>
export default {
  name: 'WouldYouRather',
  props: {
    question: String,
    answer1: String,
    answer2: String
  },
  data() {
    return {
      choice: ""
    }
  },
  methods: {
    choiceMade() {
      this.$emit("answer-changed", this.choice)
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
