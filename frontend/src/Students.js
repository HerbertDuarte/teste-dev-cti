import { ref } from 'vue';

async function fetchData (){

  const url = 'http://localhost:3030/students/list'

  const data = await fetch(url)

  const json = await json(data)
  console.log(json)
  return json
}

export const students = ref(fetchData)
