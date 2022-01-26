<template>
  <header class="header">
    <div class="header__section">
      <img src="@/assets/logo.png" alt="logo" class="header__logo">
      <div class="header__title">
        <span>Справочник подразделений</span>
      </div>
    </div>
    <Search></Search>
  </header>
</template>

<script>
import Search from '@/components/search.vue';

export default {
  name: 'Header',

  components: {
    Search,
  },
  data() {
    return {
      search: null,
    };
  },
};
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 40px;
    padding-right: 40px;
    padding-left: 40px;

    &__section {
      display: flex;
      align-items: center;
    }

    &__logo {
      height: 100px;
      width: auto;
      margin-right: 40px;
    }

    &__title {
      color: #3178BB;
      font-size: 36px;
      font-weight: bold;
      letter-spacing: .1rem
    }

    &__icon {
      font-size: 32px;
      border: none;
      background: none;
      cursor: pointer;

      &:hover {
        color: #0784F9;
      }
    }

    &__input {
      max-width: 350px !important;
    }
  }
</style>
