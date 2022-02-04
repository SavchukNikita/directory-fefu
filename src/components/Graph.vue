<template>
  <v-bottom-sheet
    v-model="vision"
    fullscreen
    class="bottomsheet__graph">
    <v-sheet
      class="sheet__graph ">
      <v-row class="sheet" align='start' justify='center'>
        <v-row class="container" align='start' justify='end'>
          <v-btn class="closebtn" icon
             @click="close">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-row>
        <v-row class="container" align='center' justify='center'>
          <OrgChart :data="data" id="tree" ref="tree"></OrgChart>
        </v-row>
      </v-row>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
// import OrgChart from '@balkangraph/orgchart.js';
import OrgChart from './OrgChart.vue';
import getGraphData from '../db/graph';

export default {
  name: 'tree',
  components: {
    OrgChart,
  },
  data() {
    return {
      data: null,
    };
  },
  model: {
    prop: 'vision',
    event: 'graphVisible',
  },
  props: {
    id: null,
    vision: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('graphVisible', false);
    },

    async getGraph() {
      this.data = await getGraphData(this.id, this.$db);
    },
  },
  created() {
    console.log('hi');
    this.getGraph();
  },
};
</script>

<style>
.bottomsheet__graph {
  background-color: #fefefe;
  max-height: 100vh !important;
  width: 100% !important
}
.row {
  margin: 0 !important;
}
.sheet__graph {
  background-color: #fefefe;
  width: 100% !important;
  height: 100% !important;
  max-height: 100% !important;
  margin: 0px !important;
}
.boc-search {
  display: none;
}
.container {
  padding: 0px !important;
  max-width: none !important;
}
.closebtn {
  margin: 40px 60px;
}
</style>
