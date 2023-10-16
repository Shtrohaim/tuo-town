<template>
  <main class="not-found container">
    <div class="not-found__code">404</div>
    <div class="not-found__message">
      <h1 class="not-found__title h3">Страницы не существует</h1>
      <p class="not-found__info p_hg">
        Возможно она удалена, перемещена или никогда не существовала — проверьте правильность
        написания адреса, перейдите на главную или воспользуйтесь поиском в шапке сайта
      </p>
      <base-button class="not-found__to-main" @onClick="router.push({ name: 'main' })"
        >Перейти на главную</base-button
      >
    </div>
  </main>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  padding-top: 70px;

  @media (min-width: 768px) {
    padding-top: 95px;
  }

  @media (min-width: 1440px) {
    flex-direction: row-reverse;
    justify-content: space-between;

    padding-top: 131px;
  }

  &__code {
    font-family: 'Jura', sans-serif;
    font-size: 80px;
    font-weight: bolder;
    color: $white;
    text-align: center;
    opacity: 0.7;

    margin-bottom: 15px;

    @media (min-width: 768px) {
      font-size: 160px;
    }

    @media (min-width: 1440px) {
      font-size: 200px;
    }
  }

  &__message {
    color: $white;
    text-align: center;
    line-height: 140%;

    @media (min-width: 1440px) {
      width: 50%;
    }
  }

  &__title {
    margin-bottom: 30px;

    @media (min-width: 1440px) {
      text-align: left;
      margin-bottom: 60px;
    }
  }

  &__info {
    font-weight: 500;
    margin-bottom: 30px;

    @media (min-width: 1440px) {
      text-align: left;
    }
  }

  &__to-main {
    margin: 0 auto;
    @media (min-width: 1440px) {
      float: left;
      margin: 0;
    }
  }
}
</style>
