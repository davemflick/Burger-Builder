import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-course-eec87.firebaseio.com/',
})

export default instance;