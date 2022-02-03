<template>
    <div id="tree" ref="tree"></div>
</template>

<script>

import OrgChart from '@balkangraph/orgchart.js';

export default {

  name: 'tree',
  props: {
    data: [],
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
  },

  mounted() {
    this.mytree(this.$refs.tree, this.data);
  },
};
</script>

        <style scoped>
        </style>
