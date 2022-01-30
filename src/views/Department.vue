<template>
  <div class="page department">
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
              {{ subord3 }}
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
        <v-btn color="primary">
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

export default {
  name: 'Department',
  data: () => ({
    tableData: [],
    id: null,
    departData: {},
    subord1: null,
    subord2: null,
    subord3: null,
  }),

  components: {
    DepartmentTable,
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
      this.subord();
      console.log(this.$db.getById(this.departData.dependence));
    },
    subord() {
      this.subord3 = this.$db.getById(this.departData.dependence).name;

      this.subord2 = this.$db.getByFilters(this.subord3).name;

      this.subord1 = this.$db.getByFilters(this.subord2).name;
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
