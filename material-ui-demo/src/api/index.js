import axios from 'axios'

function createInstance() {
  return axios.create({
    baseURL: 'http://localhost:8000/notes'
  })
}

export const instance = createInstance()