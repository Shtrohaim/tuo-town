<template>
  <div class="article-card">
    <div class="article-card__wrapper">
      <div class="article-card__background"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.article-card {
  display: block;
  width: 100%;
  min-width: 290px;

  @media (min-width: 768px) {
    min-width: 630px;
  }

  @media (min-width: 1440px) {
    min-width: 380px;
  }

  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    width: 100%;
    min-height: 280px;

    border-radius: 14px;
    overflow: hidden;

    @media (min-width: 768px) {
      min-height: 465px;
    }
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-image: $skeleton-gradient;
    background-size: 800px;
    animation: shine 1.6s infinite linear;
  }
}

@keyframes shine {
  0% {
    background-position: -100px;
  }
  40%,
  100% {
    background-position: 700px;
  }
}
</style>
