<template>
  <div class="sidebar" @click="emits('closeSidebar')">
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
          <base-search v-model="search" @onSubmit="onSearch" class="sidebar__search"></base-search>
        </div>
        <base-button class="sidebar__close-button" @onClick="emits('closeSidebar')" :icon="true">
          <svg class="icon24 fill-white">
            <use href="@/assets/images/svg/backIcon.svg#icon"></use>
          </svg>
        </base-button>
        <ul class="sidebar__product-list">
          <li class="sidebar__product-list-item">
            <router-link
              @click="emits('closeSidebar')"
              class="sidebar__product-list-link"
              :to="{ path: '/catalog/categories/0' }"
              >Кухонные ножи TUOTOWN</router-link
            >
          </li>
          <li class="sidebar__product-list-item">
            <router-link
              @click="emits('closeSidebar')"
              class="sidebar__product-list-link"
              :to="{ path: '/catalog/products/6' }"
              >Складные ножи TUOTOWN</router-link
            >
          </li>
          <li class="sidebar__product-list-item">
            <router-link
              @click="emits('closeSidebar')"
              class="sidebar__product-list-link"
              :to="{ path: '/catalog/categories/0' }"
              >Кухонные ножи QXF</router-link
            >
          </li>
          <li class="sidebar__product-list-item">
            <router-link
              @click="emits('closeSidebar')"
              class="sidebar__product-list-link"
              :to="{ path: '/catalog/categories/0' }"
              >Точильные камни</router-link
            >
          </li>
          <li class="sidebar__product-list-item">
            <router-link
              @click="emits('closeSidebar')"
              class="sidebar__product-list-link"
              :to="{ path: '/catalog/categories/0' }"
              >Наборы для BBQ</router-link
            >
          </li>
          <li class="sidebar__product-list-item">
            <router-link
              @click="emits('closeSidebar')"
              class="sidebar__product-list-link"
              :to="{ path: '/catalog/categories/0' }"
            >
              Кухонные принадлежности</router-link
            >
          </li>
          <li class="sidebar__product-list-item">
            <router-link
              @click="emits('closeSidebar')"
              class="sidebar__product-list-link"
              :to="{ path: '/catalog/categories/0' }"
              >Туристические товары</router-link
            >
          </li>
        </ul>
        <ul class="sidebar__info-list">
          <li class="sidebar__info-list-item">
            <router-link
              class="sidebar__info-list-link"
              @click="emits('closeSidebar')"
              :to="{ path: '/news' }"
              >Новости</router-link
            >
          </li>
          <li class="sidebar__info-list-item">
            <router-link
              class="sidebar__info-list-link"
              @click="emits('closeSidebar')"
              :to="{ path: '/about' }"
              >О компании</router-link
            >
          </li>
          <li class="sidebar__info-list-item">
            <router-link
              class="sidebar__info-list-link"
              @click="emits('closeSidebar')"
              :to="{ path: '/contacts' }"
              >Контакты</router-link
            >
          </li>
          <li class="sidebar__info-list-item">
            <router-link
              class="sidebar__info-list-link"
              @click="emits('closeSidebar')"
              :to="{ path: '/service' }"
              >Сервис</router-link
            >
          </li>
          <li class="sidebar__info-list-item">
            <router-link
              class="sidebar__info-list-link"
              @click="emits('closeSidebar')"
              :to="{ path: '/dealers' }"
              >Как проехать</router-link
            >
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import BaseSearch from '@/components/ui/BaseSearch.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const deviceWidth = window.innerWidth
const emits = defineEmits(['closeSidebar'])

const search = ref('')

const onSearch = () => {
  emits('closeSidebar')
  router.push({ name: 'search', query: { search: search.value, page: 1, limit: 8 } })
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
    display: flex;
    flex-direction: column;
    row-gap: 30px;

    margin: 54px 0 30px 0;
  }

  &__product-list-link {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: $white;
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
