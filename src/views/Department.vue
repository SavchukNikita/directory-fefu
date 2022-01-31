<template>
  <div class="page department">
    <Graph :id="departData.id" v-model="visible"></Graph>
    <div class="page__section">
      <div class="department__title">
        {{ departData.name }}
      </div>
      <div class="department__common">
        <div class="department__info">
          <div class="department__info-item">
            <span class="department__info-title">
              Подчиненость 1:
            </span>
            <span class="department__info-text">
              Подразделение 1
            </span>
          </div>
          <div class="department__info-item">
            <span class="department__info-title">
              Руководитель:
            </span>
            <span class="department__info-text">
              {{ departData.lead }}
            </span>
          </div>
          <div class="department__info-item">
            <span class="department__info-title">
              Подчиненость 2:
            </span>
            <span class="department__info-text">
              Подразделение 1
            </span>
          </div>
          <div class="department__info-item">
            <span class="department__info-title">
              Адрес:
            </span>
            <span class="department__info-text">
              {{ departData.address }}
            </span>
          </div>
          <div class="department__info-item">
            <span class="department__info-title">
              Подчиненость 3:
            </span>
            <span class="department__info-text">
              Подразделение 1
            </span>
          </div>
          <div class="department__info-item">
            <span class="department__info-title">
              Штатная численность:
            </span>
            <span class="department__info-text">
              {{ departData.peopleCount }}
            </span>
          </div>
        </div>
        <v-btn
          @click="getGraph()"
          color="primary">
          Показать граф
        </v-btn>
      </div>
    </div>
    <div class="page__section">
      <DepartmentTable :tables="tableData"/>
    </div>
  </div>
</template>

<script>
import DepartmentTable from '@/components/DepartmentTable.vue';
import Graph from '@/components/Graph.vue';

export default {
  name: 'Department',
  data: () => ({
    tableData: [],
    id: null,
    visible: false,
    departData: {},
  }),

  components: {
    DepartmentTable,
    Graph,
  },
  created() {
    this.id = this.$route.params.id;
    this.getData();
  },
  beforeRouteUpdate(to, from, next) {
    this.id = to.params.id;
    this.getData();
    next();
  },
  methods: {
    async getData() {
      this.departData = await this.$db.getById(this.id);
      this.tableData = await this.$db.getByFilters({ dependence: this.id });
    },
    getGraph() {
      this.visible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
  .department {
    &__title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    &__common {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__info {
      display: grid;
      grid-template-columns: 300px 300px;
      gap: 12px 24px;

      &-item {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      &-title {
        color: #0000008A;
        margin-right: 4px;
      }
    }
  }
</style>
