<template>
  <div class="page department">
    <Graph :id="departData.id" v-model="graphVisible"></Graph>
    <Indicators :id="departData.id" v-model="indicatorsVisible"></Indicators>
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
          <v-btn
            @click="getIndicators()"
            color="primary">
            Показатели
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
          bye
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
import Indicators from '@/components/Indicators.vue';

export default {
  name: 'Department',
  data: () => ({
    typeTable: 'department',
    tableData: [],
    id: null,
    graphVisible: false,
    indicatorsVisible: false,
    departData: {},
    subord1: null,
    subord1Id: null,
    subord2: null,
    subord2Id: null,
    subord3: null,
    subord3Id: null,
  }),

  components: {
    DepartmentTable,
    Graph,
    Indicators,
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
    getIndicators() {
      this.indicatorsVisible = true;
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
  },
};
</script>

<style lang="scss" scoped>
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
      &-title {
        display: flex;
        align-items: center;
        cursor: pointer;

        &::marker  {
          display: none;
          content: "";
        }
      }

      &-body {
        padding-left: 24px;
      }

      &[open] {
        padding: 8px 0;
        i {
          transform: rotate(90deg);
        }
      }
    }
    &__actions {
      text-align: right;
      height: 100%;
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
