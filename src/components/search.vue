<template>
    <v-text-field
      outlined
      hide-details
      dense
      class="header__input"
      append-icon="mdi-zoom"
      placeholder="Поиск подразделений"
      v-model="search"
    />
</template>

<script>
export default {
  name: 'DepartmentTable',

  data() {
    return {
      search: null,
    };
  },
};
</script>
