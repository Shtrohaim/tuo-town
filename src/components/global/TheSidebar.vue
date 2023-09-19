<template>
  <div class="sidebar" @click="closeSidebar">
    <Transition>
      <div
        class="sidebar__content"
        @click.stop
        :style="{ width: deviceWidth < 444 ? deviceWidth + 'px' : '444px' }"
      >
        <div class="sidebar__tools" v-if="deviceWidth <= 640">
          <a class="sidebar__mail" href="mailto:tuotown@mail.ru">
            <svg class="icon24 stroke-white fill-none">
              <use href="@/assets/images/svg/mailIcon.svg#icon"></use>
            </svg>
          </a>
          <the-search class="sidebar__search"></the-search>
        </div>
        <base-button class="sidebar__close-button" @onClick="closeSidebar" :icon="true">
          <svg class="icon24 fill-white">
            <use href="@/assets/images/svg/backIcon.svg#icon"></use>
          </svg>
        </base-button>
        <ul class="sidebar__product-list">
          <li class="sidebar__product-list-item"><a>Кухонные ножи TUOTOWN</a></li>
          <li class="sidebar__product-list-item"><a>Складные ножи TUOTOWN</a></li>
          <li class="sidebar__product-list-item"><a>Кухонные ножи QXF</a></li>
          <li class="sidebar__product-list-item"><a>Точильные камни</a></li>
          <li class="sidebar__product-list-item"><a>Наборы для BBQ</a></li>
          <li class="sidebar__product-list-item"><a>Кухонные принадлежности</a></li>
          <li class="sidebar__product-list-item"><a>Туристические товары</a></li>
        </ul>
        <ul class="sidebar__info-list">
          <li class="sidebar__info-list-item"><a>Новости</a></li>
          <li class="sidebar__info-list-item"><a>О компании</a></li>
          <li class="sidebar__info-list-item"><a>Контакты</a></li>
          <li class="sidebar__info-list-item">
            <router-link
              class="sidebar__info-list-link"
              @click="emits('closeSidebar')"
              :to="{ path: 'service' }"
              >Сервис</router-link
            >
          </li>
          <li class="sidebar__info-list-item"><a>Как проехать</a></li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import TheSearch from '@/components/ui/BaseSearch.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const deviceWidth = window.innerWidth
const emits = defineEmits(['closeSidebar'])

const closeSidebar = () => {
  emits('closeSidebar')
}
</script>

<style scoped lang="scss">
.v-enter-active .sidebar__content,
.v-leave-active .sidebar__content {
  transform: translateX(0);
  transition: 0.5s ease;
}

.v-enter-from .sidebar__content,
.v-leave-to .sidebar__content {
  transform: translateX(-100%);
}

.sidebar {
  position: fixed;
  top: 0;
  z-index: 9999;

  width: 100%;
  height: 100vh;

  background: $sidebar-bg;

  &__content {
    position: relative;
    width: 444px;
    height: 100vh;

    padding: 30px 15px;

    background: url('@/assets/images/sidebarBackground.png') no-repeat center;
    background-size: cover;
  }

  &__tools {
    display: flex;
    justify-content: center;
    align-content: center;

    position: absolute;
    top: 30px;
    right: 15px;
  }

  &__close-button {
    position: absolute;
    top: 35px;
    left: 15px;

    background: transparent;
    border: none;

    cursor: pointer;

    svg:hover {
      fill: $red-active;
    }
  }

  &__mail {
    margin-right: 30px;
    cursor: pointer;

    svg:hover {
      stroke: $red-active;
    }
  }

  &__search {
    top: -5px;
  }

  &__product-list {
    margin-top: 54px;
  }

  &__product-list-item {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: $white;

    margin-bottom: 30px;

    cursor: pointer;

    &:hover {
      color: $red-active;
    }
  }

  &__info-list-link {
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: $white;
    text-transform: uppercase;

    &:hover {
      color: $red-active;
    }
  }

  &__info-list-item {
    margin-bottom: 26px;
  }
}
</style>
