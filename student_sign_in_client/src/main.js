import { createApp } from 'vue'
import App from './App.vue'
import StudentService from '@/services/StudentService' // this will import from the two objects we created

let app = createApp(App)

app.config.globalProperties.$student_api = StudentService

app.mount('#app')
