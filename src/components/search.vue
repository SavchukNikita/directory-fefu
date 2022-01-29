<template>
    <v-autocomplete
      v-model="model"
      :items="items"
      :search-input.sync="search"
      chips
      clearable
      solo
      outlined
      item-text="name"
      hide-details
      dense
      class="header__input"
      append-icon="mdi-zoom"
      label="Поиск"
      item-value="symbol"
    />
</template>

<script>

export default {
  name: 'DepartmentTable',

  data() {
    return {
      items: [],
      search: null,
    };
  },
  watch: {
    search(val) {
      console.log(val);
      if (!val) {
        return;
      }
      this.debounce();
    },
  },
  methods: {
    /* eslint-disable no-underscore-dangle */
    debounce() {
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        this.searchName();
      }, 1000);
    },
    searchName() {
      this.$db.searchByName(this.search).then((res) => {
        this.items = res;
      });
    },
  },
};
</script>
