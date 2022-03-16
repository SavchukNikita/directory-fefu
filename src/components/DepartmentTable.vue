<template>
  <v-data-table
    :headers="activeHeaders"
    :items="tables"
    @click:row="blink"
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
        hidden: true,
      },
    ],
  }),
  props: {
    tables: [],
    hideDep: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    activeHeaders() {
      if (this.hideDep) return this.headers.filter((el) => !el.hidden);

      return this.headers;
    },
  },
  methods: {
    blink(row) {
      this.$router.push({
        path: `/${row.id}`,
      });
    },
  },
};
</script>
