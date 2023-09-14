<template>
  <main class="service">
    <h1 class="service__title h3">Сервис</h1>
    <div class="service__slider-container">
      <base-slider
        class="service__tab-slider"
        :carousel="false"
        :havePagination="false"
        :height="30"
      >
        <span class="service__tab p_hg">Сервисные центры</span>
        <span class="service__tab p_hg service__tab--active">Служба заботы</span>
        <span class="service__tab p_hg">Запчасти</span>
        <span class="service__tab p_hg">Инструкции</span>
        <span class="service__tab p_hg">Сертификаты</span>
      </base-slider>
    </div>
    <section>
      <h2 class="visually-hidden">Служба заботы</h2>
      <a class="service__phone h3" href="tel:+7 926 420-11-17">+7 (981) 120-11-17</a>
      <base-form class="service__form">
        <base-input
          class="service__input"
          v-model="formData.email.value"
          label="Email"
          :error="errors.errors?.email"
          placeholder="Ваша почта"
          :required="false"
        />
        <base-input
          class="service__input"
          @input="mask"
          v-model="formData.tel.value"
          label="Телефон"
          :error="errors.errors?.tel"
          placeholder="+7 (___) ___-__-__"
          :required="true"
        />
        <base-input
          class="service__input"
          v-model="formData.name.value"
          label="Имя"
          placeholder="Ваше имя"
          :error="errors.errors?.name"
          :required="true"
        />
        <base-textarea
          v-model="formData.comment.value"
          class="service__comment"
          label="Комментарий"
          placeholder="Впишите ваше сообщение...."
        />
        <base-button class="service__submit">Отправить</base-button>
      </base-form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import BaseForm from '@/components/ui/BaseForm.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSlider from '@/components/ui/BaseSlider.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseTextarea from '@/components/ui/BaseTextarea.vue'

import validation from '@/utils/validation'
import telMask from '@/utils/mask'

import type { ServiceType } from '@/types/formType'

const errors = ref({})

const formData = ref<ServiceType>({
  email: {
    value: null,
    required: false
  },
  tel: {
    value: null,
    required: true
  },
  name: {
    value: null,
    required: true
  },
  comment: {
    value: null,
    required: false
  }
})

const { fieldValidation } = validation()
const mask = () => {
  formData.value.tel.value = telMask(formData.value.tel.value)
}

watch(formData.value, () => {
  errors.value = fieldValidation(formData.value)
})
</script>

<style scoped lang="scss">
.service {
  padding: 65px 0 0 0;

  &__title {
    text-transform: uppercase;
    text-align: center;
    line-height: normal;
    color: $white;

    margin-bottom: 30px;
  }

  &__slider-container {
    min-width: 320px;
    max-width: fit-content;
    width: 100%;
    margin: 0 auto;
  }

  &__tab-slider {
    margin-bottom: 45px;
    text-align: center;
  }

  &__tab {
    min-width: fit-content;

    margin-left: 15px;

    font-weight: 500;
    line-height: normal;
    text-transform: uppercase;
    color: $gray-light;

    cursor: pointer;

    &--active {
      text-decoration: underline $red-active 2px;
      text-underline-offset: 6px;
      color: $white;
      cursor: default;
    }
  }

  &__phone {
    display: block;
    color: $white;

    width: fit-content;
    margin: 0 auto 30px;

    line-height: normal;

    &:active {
      color: $red-active;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 15px;
  }

  &__submit {
    width: fit-content;

    color: $input-text;
  }
}
</style>
