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
      <base-form @onSubmit="sendReport" class="service__form" v-if="!isSent">
        <base-select label="Тема" v-model="formData.topic.data" :data="topicData" />
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
        <base-button @onClick="sendReport" class="service__submit">Отправить</base-button>
      </base-form>
      <div class="service__send-message" v-else>
        <div class="service__send-message-background"></div>
        <span class="service__send-message-text h3"
          >Спасибо, что воспользовались нашей службой, {{ formData.name.value }}. В ближайщее время
          с вами свяжутся.</span
        >
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import validation from '@/utils/validation'
import telMask from '@/utils/mask'

import reportServices from '@/services/reportServices'

import type { ServiceType } from '@/types/formType'

import BaseForm from '@/components/ui/BaseForm.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSlider from '@/components/ui/BaseSlider.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseTextarea from '@/components/ui/BaseTextarea.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const errors = ref({
  errors: {} as any,
  countErrors: 0
})
const { fieldValidation } = validation()
const isSent = ref(false)

const topicData = [
  {
    value: 'Неполадки с ножом',
    code: 0
  },
  {
    value: 'Сломался нож',
    code: 1
  },
  {
    value: 'Тупой нож',
    code: 2
  },
  {
    value: 'Не пришел товар',
    code: 3
  },
  {
    value: 'Другое',
    code: 4
  }
]

const formData = ref<ServiceType>({
  email: {
    value: undefined,
    required: false
  },
  tel: {
    value: undefined,
    required: true
  },
  name: {
    value: undefined,
    required: true
  },
  comment: {
    value: undefined,
    required: false
  },
  topic: {
    value: undefined,
    data: topicData[0],
    required: false
  }
})
const mask = () => {
  formData.value.tel.value = telMask(formData.value.tel.value)
}

const sendReport = async () => {
  const sendData = {} as any
  let item: keyof ServiceType
  for (item in formData.value) {
    if (formData.value[item].value === undefined) formData.value[item].value = ''
    if (item === 'topic') sendData['topic'] = formData.value.topic.data.code
    else sendData[item] = formData.value[item].value
  }
  errors.value = fieldValidation(formData.value)
  if (!errors.value.countErrors) {
    await reportServices.sendReport(sendData)
    await router.push({ name: 'service' })
    isSent.value = true
  }
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

  &__send-message {
    position: relative;
    height: 50vh;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background: $white;
    border-radius: 15px;

    padding: 15px;
  }

  &__send-message-text {
    color: $black-input;
    text-align: center;
  }

  &__send-message-background {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    background: url('@/assets/images/placeholder.jpg') center center no-repeat;
    background-size: cover;
    opacity: 0.1;
    border-radius: 15px;

    z-index: 1;
  }
}
</style>
