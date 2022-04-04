<template>
  <div class="page main">
    <div class="page__section">
      <v-form class="filters">
        <v-autocomplete
          v-model="lead"
          :items="leads"
          outlined
          dense
          hide-details
          placeholder="Руководитель"
        />
        <v-autocomplete
          v-model="name"
          :items="names"
          outlined
          dense
          hide-details
          placeholder="В подчинении"
        />
        <v-autocomplete
          v-model="addres"
          :items="address"
          outlined
          dense
          hide-details
          placeholder="Адрес"
        />
        <div class="btn-container">
          <v-btn
            id="show"
            @click="filter"
            color="primary">
            Показать
          </v-btn>
          <v-btn
            id="clear"
            @click="clear"
            color="red">
            Очистить
          </v-btn>
        </div>
      </v-form>
    </div>
    <div class="page__section">
      <DepartmentTable :type="typeTable" :tables="tableData"/>
    </div>
  </div>
</template>

<script>
import DepartmentTable from '@/components/DepartmentTable.vue';

export default {
  name: 'Main',
  data: () => ({
    typeTable: 'main',
    lead: null,
    name: null,
    addres: null,
    tableData: [],
    leads: [],
    names: [],
    address: [],
  }),
  components: {
    DepartmentTable,
  },
  methods: {
    filter() {
      this.$db
        .getByFilters({ lead: this.lead, name: this.name, address: this.addres })
        .then((res) => {
          this.tableData = res;
          this.tableData.forEach(async (row) => {
            const Data = await this.$db.getById(row.dependence);
            // eslint-disable-next-line no-param-reassign
            row.dependence = Data.name;
          });
        });
    },
    clear() {
      this.lead = null;
      this.name = null;
      this.addres = null;
      this.$db.getAll().then((res) => {
        this.tableData = res;
        this.tableData.forEach(async (row) => {
          const Data = await this.$db.getById(row.dependence);
          // eslint-disable-next-line no-param-reassign
          row.dependence = Data.name;
        });
      });
    },
  },
  created() {
    this.$db.getAll().then((res) => {
      this.tableData = res;
      this.tableData.forEach(async (row) => {
        const Data = await this.$db.getById(row.dependence);
        // eslint-disable-next-line no-param-reassign
        row.dependence = Data.name;
      });
    });

    this.$db.getLeads().then((res) => {
      this.leads = res;
    });

    this.$db.getName().then((res) => {
      this.names = res;
    });

    this.$db.getAddresses().then((res) => {
      this.address = res;
    });
  },
};
</script>

<style lang="scss" scoped>
  .filters {
    display: grid;
    grid-template-columns: 250px 250px 250px 125px;
    gap: 24px;
  }
  .btn-container {
    display: flex;
  }
  #show {
    margin-right: 5px;
  }
  #clear {
    background-color: #e5e5e5 !important;
  }
</style>
