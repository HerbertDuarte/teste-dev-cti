<script setup></script>

<template>
  <section class="flex items-center justify-center px-2 max-w-[600px]">
      <div class="flex items-center justify-between p-3 border m-2 w-full" v-for="student in students">
        <div>
          <p class="font-semibold">0{{student.id + 1}} - {{ student.name }}</p>
          <p><span class="font-semibold">Data de nascimento : </span>({{ student.date }})</p>
          <p><span class="font-semibold">CPF :</span> {{ student.cpf }}</p>
        </div>
        <div>
          <button v-if="method == 'visualizer'" class="bg-blue-500 text-white p-2 ml-4 rounded">
            Ver mais
          </button>
          <button v-if="method == 'edit'" class="bg-blue-500 text-white p-2 ml-4 rounded">
            Editar
          </button>
          <button v-if="method == 'delete'" class="bg-blue-500 text-white p-2 ml-4 rounded">
            Excluir
          </button>
        </div>
      </div>
    </section>
</template>

<script>
  export default {
    name : 'DataList',
    props : [
      'students',
      'method'
    ]
  }
</script>
