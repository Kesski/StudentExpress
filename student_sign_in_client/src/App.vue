<template>
  <div id="app">

    <new-student-form v-on:student-added="newStudentAdded"></new-student-form>
    <student-message v-bind:student="mostRecentStudent"></student-message>
    <student-table 
    v-bind:students="students" 
    v-on:students-arrived-or-left="studentsArrivedOrLeft"
    v-on:delete-student="studentDeleted">
    </student-table>
  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentTable from './components/StudentTable.vue'

export default {
  name: 'App',
  data() {
    return {
      students: [],
      mostRecentStudent: {}
    }
  },
  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable
  },
  data() {
    return {
      students: [],
      mostRecentStudent: {}
    }
  },
  mounted() {
    // load all students - make request to API
    this.updateStudents()
  },
  methods: {
    updateStudents() {
      this.$student_api.getAllStudents().then( students => {
        this.students = students
      }).catch( () => alert('Unable to fetch student list'))
    },
    newStudentAdded(student) {   
      this.$student_api.addStudent(student).then( () => {
        this.updateStudents()
      })
      .catch( err => {
        //let msg = err.response.data.json.join(',')
        alert('Error adding student. Star ID must be unique.' )//+ msg)
        
      })
    },
    studentsArrivedOrLeft(student, present) {
      // find student in array of students
      //update present attribute
      student.present = present // update present value
      this.$student_api.updateStudent(student).then( () => {
        this.mostRecentStudent = student
        this.updateStudents()
      }).catch( () =>('Unable to update student'))
      
    },
    studentDeleted(student) {
      // filter returns new array of all students for whom the function returns true
      this.$student_api.deleteStudent(student.id).then( () => {
        this.updateStudents()
        this.mostRecentStudent = {} // clear welcome/goodbye message
      }).catch( () => alert('Unable to delete student'))
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";
</style>
