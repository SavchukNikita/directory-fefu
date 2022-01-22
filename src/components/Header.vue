<template>
  <header class="header">
    <div class="header__section">
      <img src="@/assets/logo.png" alt="logo" class="header__logo">
      <div class="header__title">
        <span>Справочник подразделений</span>
      </div>
    </div>
    <v-text-field
      outlined
      hide-details
      dense
      class="header__input"
      append-icon="mdi-zoom"
      placeholder="Поиск подразделений"
    />
  </header>
</template>

<script>
export default {
  name: 'Header',

  data: () => ({
    isSearch: false,
  }),
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
