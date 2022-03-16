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
        // template: 'rony',
        editForm: {
          photoBinding: null,
        },
        nodes: x,
        nodeBinding: {
          field_0: 'name',
          img_0: 'https://pbs.twimg.com/media/ChsJM53WEAEi14Y.jpg:large',
        },
      });
    },
  },

  mounted() {
    this.mytree(this.$refs.tree, this.data);
  },

  watch: {
    data() {
      this.mytree(this.$refs.tree, this.data);
    },
  },
};
</script>

        <style scoped>
        </style>
