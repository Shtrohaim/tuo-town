<template>
  <section class="service-report">
    <h2 class="visually-hidden">Служба заботы</h2>
    <a class="service-report__phone h3" href="tel:+7 926 420-11-17">+7 (981) 120-11-17</a>
    <base-form @onSubmit="emits('onSubmit', formData)" class="service-report__form" v-if="!isSent">
      <base-select label="Тема" v-model="formData.topic.data" :data="topicData" />
      <base-input
        class="service-report__input"
        v-model="formData.email.value"
        label="Email"
        :error="errors.errors?.email"
        placeholder="Ваша почта"
        :required="false"
      />
      <base-input
        class="service-report__input"
        @input="mask"
        v-model="formData.tel.value"
        label="Телефон"
        :error="errors.errors?.tel"
        placeholder="+7 (___) ___-__-__"
        :required="true"
      />
      <base-input
        class="service-report__input"
        v-model="formData.name.value"
        label="Имя"
        placeholder="Ваше имя"
        :error="errors.errors?.name"
        :required="true"
      />
      <base-textarea
        v-model="formData.comment.value"
        class="service-report__comment"
        label="Комментарий"
        placeholder="Впишите ваше сообщение...."
      />
      <base-button @onClick="emits('onSubmit', formData)" class="service-report__submit"
        >Отправить</base-button
      >
    </base-form>
    <div class="service-report__send-message" v-else>
      <div class="service-report__send-message-background"></div>
      <span class="service-report__send-message-text h3"
        >Спасибо, что воспользовались нашей службой, {{ formData.name.value }}. В ближайщее время с
        вами свяжутся.</span
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import BaseForm from '@/components/ui/BaseForm.vue'
import BaseTextarea from '@/components/ui/BaseTextarea.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'

import telMask from '@/utils/mask'
import validation from '@/utils/validation'

import { ServiceType } from '@/types/formType'

const emits = defineEmits(['onSubmit'])
const props = defineProps({
  isSent: {
    type: Boolean,
    required: true
  }
})

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

const errors = ref({
  errors: {} as any,
  countErrors: 0
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
.service-report {
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

  &__submit {
    width: fit-content;

    color: $input-text;

    margin: 0 auto;

    @media (min-width: 768px) {
      margin-top: 10px;
    }
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
