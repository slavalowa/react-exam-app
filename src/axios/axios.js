import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-simple-exam-app.firebaseio.com/'
})