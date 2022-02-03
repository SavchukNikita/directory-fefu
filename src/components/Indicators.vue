<template>
  <v-bottom-sheet
    v-model="vision"
    fullscreen
    class="bottomsheet__indicators">
    <v-sheet
      class="sheet__indicators">
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

export default {
  name: 'Indicators',
  data() {
    return {
      data: null,
    };
  },
  model: {
    prop: 'vision',
    event: 'indicatorsVisible',
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
      this.$emit('indicatorsVisible', false);
    },
  },
};
</script>

<style>
.bottomsheet__indicators {
  background-color: #fefefe;
  max-height: 100vh !important;
  width: 100% !important
}
.sheet__indicators {
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
