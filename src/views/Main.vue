<template>
  <div class="page main">
    <div class="page__section">
      <v-form class="filters">
        <v-autocomplete
          outlined
          dense
          hide-details
          placeholder="Руководитель"
        />
        <v-autocomplete
          outlined
          dense
          hide-details
          placeholder="В подчинении"
        />
        <v-autocomplete
          outlined
          dense
          hide-details
          placeholder="Адрес"
        />
        <v-btn color="primary">
          Показать
        </v-btn>
      </v-form>
    </div>
    <div class="page__section">
      <DepartmentTable />
    </div>
  </div>
</template>

<script>
import DepartmentTable from '@/components/DepartmentTable.vue';

export default {
  name: 'Main',

  components: {
    DepartmentTable,
  },
};
</script>

<style lang="scss" scoped>
  .filters {
    display: grid;
    grid-template-columns: 250px 250px 250px 125px;
    gap: 24px;
  }
</style>
