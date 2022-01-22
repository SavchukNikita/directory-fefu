<template>
  <div class="page department">
    <div class="page__section">
      <div class="department__title">
        Подразделение с каким-то названием
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
              Иван Иванов
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
              Новая русская 3
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
              34
            </span>
          </div>
        </div>
        <v-btn color="primary">
          Показать граф
        </v-btn>
      </div>
    </div>
    <div class="page__section">
      <DepartmentTable />
    </div>
  </div>
</template>

<script>
import DepartmentTable from '@/components/DepartmentTable.vue';

export default {
  name: 'Department',

  components: {
    DepartmentTable,
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
