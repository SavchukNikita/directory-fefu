<template>
  <v-data-table
    :headers="headers"
    :items="tables"
    @click:row="blink(tables)"
  >
  </v-data-table>
</template>

<script>
export default {
  name: 'DepartmentTable',

  data: () => ({
    headers: [
      {
        text: 'Id',
        value: 'id',
        sortable: false,
      },
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
  methods: {
    blink(event) {
      console.log(event.id);
      // this.$router.push({
      //   path: `/${event.id}`,
      //   params: {
      //     items: event,
      //   },
      // });
    },
  },
};
</script>
