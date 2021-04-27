import { instance } from './index'

function postData(data) {
  return instance.post('/', data)
}

function getData() {
  return instance.get('/')
}

export { postData, getData }