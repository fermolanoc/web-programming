<template>
  <div id="app">
    <new-student-form v-on:student-added="newStudentAdded"></new-student-form>
    <student-table 
      v-bind:students="students" 
      v-on:student-arrived-or-left="studentArrivedOrLeft"
      v-on:delete-student="studentDeleted"  
    >
    </student-table>
    <student-message v-bind:student="mostRecentStudent"></student-message>
  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm'
import StudentTable from './components/StudentTable'
import StudentMessage from './components/StudentMessage'


export default {
  name: 'App',
  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable,
  },
  data() {
    return {
      students: [],
      mostRecentStudent: {}
    }
  },
  methods: {
    newStudentAdded(student) {
      this.students.push(student)
      this.students.sort(function (s1, s2){
        return s1.name.toLowerCase() > s2.name.toLowerCase() ? 1 : -1
      })
    },
    studentArrivedOrLeft(student, present) {
      // find the student
      let updateStudent = this.students.find(s => {
        if (s.name === student.name && s.starID === student.starID) {
          return true;
        }
      })

      // update present attribute
      if (updateStudent) {
        updateStudent.present = present
        this.mostRecentStudent = updateStudent
      }
    },
    studentDeleted(student) {
      this.students = this.students.filter(s => {
        if (s != student) {
          return true
        }
      })
      this.mostRecentStudent = {}
    }
  }
}

</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css";
</style>
