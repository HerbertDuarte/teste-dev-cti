import { reactive } from 'vue';

export const store = reactive({
  auth : localStorage.getItem('auth'),
  user : localStorage.getItem('user')
});

console.log(store)
