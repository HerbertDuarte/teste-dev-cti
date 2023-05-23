import { ref } from 'vue';

export const students = ref(
  [
    {
      id: 1,
      name: "João Silva",
      cpf: "12345678901",
      date: "2022-01-01",
      score: {
        module1: 8.5,
        module2: 9.0,
        module3: 8.0
      }
    },
    {
      id: 2,
      name: "Maria Santos",
      cpf: "98765432109",
      date: "2022-02-15",
      score: {
        module1: 7.0,
        module2: 7.5,
        module3: 8.0
      }
    },
    {
      id: 3,
      name: "Pedro Almeida",
      cpf: "65498732145",
      date: "2022-03-10",
      score: {
        module1: 9.0,
        module2: 9.5,
        module3: 8.5
      }
    },
    {
      id: 4,
      name: "Ana Oliveira",
      cpf: "32165498799",
      date: "2022-04-22",
      score: {
        module1: 4.0,
        module2: 4.5,
        module3: 3.0
      }
    },
    {
      id: 5,
      name: "Carlos Pereira",
      cpf: "45678912303",
      date: "2022-05-18",
      score: {
        module1: 5.0,
        module2: 4.5,
        module3: 5.0
      }
    },
    {
      id: 6,
      name: "Mariana Costa",
      cpf: "78932165400",
      date: "2022-06-30",
      score: {
        module1: 6.0,
        module2: 5.5,
        module3: 5.0
      }
    },
    {
      id: 7,
      name: "Lucas Fernandes",
      cpf: "15975386422",
      date: "2022-07-09",
      score: {
        module1: 4.5,
        module2: 5.0,
        module3: 4.0
      }
    },
    {
      id: 8,
      name: "Juliana Souza",
      cpf: "75395145611",
      date: "2022-08-14",
      score: {
        module1: 5.0,
        module2: 4.5,
        module3: 4.0
      }
    },
    {
      id: 9,
      name: "Rafaela Santos",
      cpf: "85296374166",
      date: "2022-09-25",
      score: {
        module1: 3.0,
        module2: 4.0,
        module3: 2.5
      }
    }
  ]
);
