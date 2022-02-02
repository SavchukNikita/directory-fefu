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
      console.log(this.subord1);
      this.$router.push({
        path: `/${this.subord1Id}`,
      });
    },
    blink2() {
      console.log(this.subord2);
      this.$router.push({
        path: `/${this.subord2Id}`,
      });
    },
    blink3() {
      console.log(this.subord3);
      this.$router.push({
        path: `/${this.subord3Id}`,
      });
    },
    getGraph() {
      this.visible = true;
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
