<template>
  <div class="page department">
    <Graph :id="departData.id" v-model="graphVisible"></Graph>
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
            <a @click="blink1()" class="department__info-text">
              {{ subord1 }}
            </a>
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
            <a @click="blink2()" class="department__info-text">
              {{ subord2 }}
            </a>
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
            <a @click="blink3()" class="department__info-text">
              {{ subord3 }}
            </a>
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
        <div class="department__actions">
          <v-btn
            @click="getGraph()"
            color="primary">
            Показать граф
          </v-btn>
        </div>
      </div>
    </div>
    <div class="page__section">
      <details class="department__indicators">
        <summary class="department__indicators-title">
          <v-icon class="toggle-icon">
            mdi-chevron-right
          </v-icon>
          <span>Основные показатели</span>
        </summary>
        <div class="department__indicators-body">
          <v-data-table
            :headers="headers"
            :items="indicators"
            :item-class="row_classes"
          />
        </div>
      </details>
    </div>
    <div class="page__section">
      <DepartmentTable
        hideDep
        :tables="tableData"
      />
    </div>
  </div>
</template>

<script>
import DepartmentTable from '@/components/DepartmentTable.vue';
import Graph from '@/components/Graph.vue';

export default {
  name: 'Department',
  data: () => ({
    typeTable: 'department',
    tableData: [],
    id: null,
    graphVisible: false,
    departData: {},
    subord1: null,
    subord1Id: null,
    subord2: null,
    subord2Id: null,
    subord3: null,
    subord3Id: null,
    indicators: [],
    headers: [
      {
        text: 'Название',
        value: 'name',
      },
      {
        text: 'Ед. изменерения',
        value: 'measure',
      },
      {
        text: 'Период',
        value: 'measure_period',
      },
      {
        text: 'По плану',
        value: 'planned',
      },
      {
        text: 'Фактические',
        value: 'fact',
      },
    ],
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
      this.indicators = await this.$db.getScoreById(this.id);
      this.indicators.forEach((el, index) => {
        if (el.fact === el.planned) {
          this.indicators[index].color = true;
        }
      });
      console.log('indicators', this.indicators);
      this.subord();
    },
    blink1() {
      this.$router.push({
        path: `/${this.subord1Id}`,
      });
    },
    blink2() {
      this.$router.push({
        path: `/${this.subord2Id}`,
      });
    },
    blink3() {
      this.$router.push({
        path: `/${this.subord3Id}`,
      });
    },
    getGraph() {
      this.graphVisible = true;
    },
    subord() {
      const Data = this.departData.dependence;
      this.$db.getById(Data).then((res) => {
        this.subord3 = res.name;
        this.subord3Id = res.id;
        this.$db.getById(res.dependence).then((result) => {
          this.subord2 = result.name;
          this.subord2Id = result.id;
          this.$db.getById(result.dependence).then((result1) => {
            this.subord1 = result1.name;
            this.subord1Id = result1.id;
          });
        });
      });
    },
    row_classes(item) {
      if (item.color === true) {
        return item.color === true ? 'row-color' : 'row-none-color';
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
  .row-none-color {
    background-color: #fff
  }
  .v-btn {
    margin: 5px;
    width: 60%
  }
  .department {
    &__title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 16px;
    }
    &__indicators {
      transition: padding .3s ease;

      &-title {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-weight: 500;

        &::marker  {
          display: none;
          content: "";
        }
      }

      &[open] {
        padding: 16px 0;
        i {
          transform: rotate(90deg);
        }
      }
    }
    &__actions {
      button {
        width: 100%;
      }
    }
    &__common {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__info {
      display: grid;
      grid-template-columns: 600px 300px;
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

<style lang="scss">
  .row-color {
    background-color: #ACE1AFAF !important;
  }
</style>
