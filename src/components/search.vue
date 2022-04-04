<template>
    <v-autocomplete
      v-model="model"
      :items="items"
      :search-input.sync="search"
      @change="route"
      outlined
      dense
      hide-details
      clearable
      item-text="name"
      class="header__input"
      append-icon="mdi-zoom"
      label="Поиск департамента"
      item-value="symbol"
    />
</template>

<script>

export default {
  name: 'search',

  data() {
    return {
      model: null,
      items: [],
      search: null,
    };
  },
  watch: {
    search() {
      this.debounce();
    },
  },
  methods: {
    route(e) {
      this.$db.searchByName(e).then((res) => {
        this.$router.push({ path: `/${res[0].id}` });
      });
      this.$nextTick(() => {
        this.model = null;
        this.search = null;
      });
    },
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

<style>
.v-menu__content {
  max-width: 350px !important;
}
</style>
