import { ref } from 'vue';

export const students = ref(
  [
    {
      id : 0,
      name : 'Ana Santos Lima',
      cpf : '00976576543',
      date : '2005-11-02',
      score :
      {
        module1 : 7.0,
        module2 : 8.2,
        module3 : 5.8
      },
      media(){
        const soma = this.score.module1 + this.score.module2 + this.score.module3
        const theMedia = soma/3
        return theMedia
      }
    },
    {
      id : 1,
      name : 'João Gabriel Cangussu Santana',
      cpf : '00976576643',
      date : '2005-14-10',
      score :
      {
        module1 : 7.0,
        module2 : 4.2,
        module3 : 3.8
      },
      media(){
        const soma = this.score.module1 + this.score.module2 + this.score.module3
        const theMedia = soma/3
        return theMedia
      }
    },
    {
      id : 2,
      name : 'Arthur Maia dos Santos Silva',
      cpf : '00911576543',
      date : '2005-01-04',
      score :
      {
        module1 : 4.0,
        module2 : 8.2,
        module3 : 9.8
      },
      media(){
        const soma = this.score.module1 + this.score.module2 + this.score.module3
        const theMedia = soma/3
        return theMedia
      }
    },
    {
      id : 3,
      name : 'José Xavier da Silva Junior',
      cpf : '00976234543',
      date : '2005-12-03',
      score :
      {
        module1 : 3.0,
        module2 : 4.2,
        module3 : 5.3
      },
      media(){
        const soma = this.score.module1 + this.score.module2 + this.score.module3
        const theMedia = soma/3
        return theMedia
      }
    },

  ]
);
