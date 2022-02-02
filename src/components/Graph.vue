<template>
  <v-bottom-sheet
    v-model="vision"
    fullscreen
    class="bottomsheet">
    <v-sheet
      class="sheet">
      <v-row class="sheet" align='start' justify='center'>
        <v-row class="container" align='start' justify='end'>
          <v-btn class="closebtn" rounded
            color="white" @click="close">
            Закрыть
          </v-btn>
        </v-row>
        <v-row class="container" align='center' justify='center'>
          <div id="tree" ref="tree"></div>
        </v-row>
      </v-row>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import OrgChart from '@balkangraph/orgchart.js';
import getChildren from '../db/graph';

export default {
  name: 'Graph',
  data() {
    return {
      data: null,
    };
  },
  model: {
    prop: 'vision',
    event: 'visible',
  },
  props: {
    id: null,
    vision: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    mytree(domEl, x) {
      this.chart = new OrgChart(domEl, {
        nodes: x,
        nodeBinding: {
          field_0: 'name',
          img_0: 'img',
        },
      });
    },
    close() {
      this.$emit('visible', false);
    },
  },
  watch: {
    id() {
      console.log('ID --- ', this.id);
      this.data = getChildren(this.id, this.$db);
      this.mytree(this.$refs.tree, this.data);
    },
  },
};
</script>

<style>
.bottomsheet {
  background-color: #fefefe;
  max-height: 100vh !important;
  width: 100% !important
}
.sheet {
  background-color: #fefefe;
  width: 100% !important;
  height: 100% !important;
  max-height: 100% !important;
  margin: 0px !important;
}
.closebtn {
  margin-top: 25px;

  background-color: #fefefe;
  color: #0e0e0e;
}
</style>
