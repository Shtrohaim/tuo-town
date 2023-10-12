<template>
  <main class="contacts container">
    <div class="contacts__info">
      <h1 class="contacts__title h3">Контакты</h1>
      <p class="contacts__address p_md">
        Россия, Москва, МКАД, 19-й километр, вл20с1, вход Ф, 22-68-70
      </p>
      <p class="contacts__hours p_md">
        Время работы: <br />
        09:00 — 18:00, Пн-Пт
      </p>
      <a href="mailto:tuotown@bk.ru" class="contacts__link contacts__link--email p_hg"
        >tuotown@bk.ru</a
      >
      <a
        href="https://tuotown.ru/media/files/contacts/%D0%9A%D0%B0%D1%80%D1%82%D0%BE%D1%87%D0%BA%D0%B0_%D0%9E%D0%9E%D0%9E_%D0%A2%D0%A3%D0%9E%D0%93%D0%9E%D0%A0%D0%9E%D0%94_A1F6jVm.docx"
        class="contacts__link contacts__link--requisites p_hg"
        >Реквизиты компании</a
      >
      <base-button
        :filled="true"
        @onClick="router.push({ name: 'dealers' })"
        class="contacts__redirect"
        >Где купить</base-button
      >
    </div>
    <yandex-map
      class="contacts__map"
      :coords="[55.621862, 37.783249]"
      :zoom="15"
      :settings="settings"
      :controls="[]"
    >
      <ymap-marker
        :icon="marker"
        :coords="[55.621862, 37.783249]"
        :marker-id="0"
        :balloon="{ body: 'Россия, Москва, МКАД, 19-й километр, вл20с1, вход Ф, 22-68-70' }"
      ></ymap-marker>
    </yandex-map>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { yandexMap, ymapMarker } from 'vue-yandex-maps'

import markerIcon from '@/assets/images/svg/pinIcon.svg'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()

const settings = {
  apiKey: import.meta.env.VITE_MAP_API,
  lang: 'ru_RU',
  enterprise: true,
  version: '2.1'
}

const marker = {
  layout: 'default#imageWithContent',
  imageHref: markerIcon,
  imageSize: [40, 40],
  imageOffset: [-20, -40]
}
</script>

<style lang="scss">
.contacts {
  padding-top: 65px;
  background: $background-dark;

  @media (min-width: 768px) {
    padding-top: 85px;
  }

  @media (min-width: 1440px) {
    padding-top: 130px;
    max-width: 1920px;
    display: flex;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__title {
    text-align: center;
    color: $white;
    margin-bottom: 30px;

    @media (min-width: 1440px) {
      text-align: left;
    }
  }

  &__address {
    color: $gray;
    font-weight: 500;
    line-height: 140%;

    margin-bottom: 10px;
  }

  &__hours {
    color: $gray;
    font-weight: 500;
    line-height: 140%;

    margin-bottom: 30px;

    @media (min-width: 768px) {
      margin-bottom: 15px;
    }
  }

  &__link {
    display: block;
    color: $white;
    font-weight: 600;
    text-decoration: 2px underline $white;
    text-underline-offset: 4px;

    &:active {
      color: $red-active;
      text-decoration-color: $red-active;
    }

    @media (min-width: 1440px) {
      &:hover {
        color: $red-active;
        text-decoration-color: $red-active;
      }
    }

    &--email {
      margin-bottom: 20px;
    }

    &--requisites {
      margin-bottom: 30px;

      text-transform: uppercase;
    }
  }

  &__redirect {
    margin: 0 auto 30px;

    @media (min-width: 1440px) {
      margin: 0;

      width: 230px;
    }
  }

  &__map {
    display: flex;
    height: 50vh;
    width: 100%;

    border-radius: 15px;

    overflow: hidden;

    filter: grayscale(1);

    border-bottom: 1px solid transparent;

    @media (min-width: 768px) {
      height: 80vh;
    }

    @media (min-width: 1440px) {
      max-height: 900px;
    }

    .ymaps-2-1-79-balloon {
      background-color: $background-dark;
      color: $white;

      @media (min-width: 768px) {
        border-radius: 15px;
      }
    }
    .ymaps-2-1-79-balloon__layout {
      background: transparent;
    }

    .ymaps-2-1-79-balloon__tail {
      background-color: $background-dark;
      &:after {
        background-color: $background-dark;
      }
    }

    .ymaps-2-1-79-balloon__content {
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;
      background: transparent;
    }
    .ymaps-2-1-79-balloon__close-button {
      width: 20px;
      height: 20px;

      margin: 10px 10px 0 0;
      -webkit-mask-image: url('@/assets/images/svg/closeIcon.svg');
      -webkit-mask-repeat: no-repeat;
      mask-image: url('@/assets/images/svg/closeIcon.svg');
      mask-repeat: no-repeat;
      background: $white;
    }
  }
}
</style>
