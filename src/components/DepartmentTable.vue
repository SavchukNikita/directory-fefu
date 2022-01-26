<template>
  <v-data-table
    :headers="headers"
    :items="tables"
  >

  </v-data-table>
</template>

<script>
export default {
  name: 'DepartmentTable',

  data: () => ({
    headers: [
      {
        text: 'Название',
        value: 'name',
        sortable: false,
      },
      {
        text: 'Руководитель',
        value: 'lead',
        sortable: false,
      },
      {
        text: 'Адрес',
        value: 'address',
        sortable: false,
      },
      {
        text: 'Штатная численость',
        value: 'peopleCount',
        sortable: false,
      },
      {
        text: 'В подчинении',
        value: 'dependence',
        sortable: false,
      },
    ],
  }),
  props: {
    tables: [],
  },
  created() {
  },
};
</script>
