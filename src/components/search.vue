<template>
    <v-autocomplete
      :items="items"
      :search-input.sync="search"
      solo
      outlined
      hide-details
      dense
      class="header__input"
      append-icon="mdi-zoom"
      placeholder="Поиск"
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
      this.$db
        .searchByName(this.search)
        .then((res) => {
          console.log(res);
          this.items = res;
        });
    },
  },
};
</script>
