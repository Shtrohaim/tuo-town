<template>
  <main class="cart container">
    <div class="cart__head">
      <base-button @click="router.go(-1)" class="cart__back-button" :icon="true">
        <svg class="icon20 fill-gray">
          <use href="@/assets/images/svg/navArrowIcon.svg#icon"></use>
        </svg>
      </base-button>
      <h1 class="cart__title h3">Корзина</h1>
    </div>
    <div class="cart__content">
      <ul class="cart__product-list">
        <li
          class="cart__product-list-item p_md"
          v-for="(product, index) in products"
          :key="product?.id"
        >
          <div class="cart__product" @click="activateModal(index)">
            <base-image class="cart__product-image" :src="product?.image"></base-image>
            <span class="cart__product-name p_hg">{{ product?.name }}</span>
            <span class="cart__product-count p_hg">x{{ product?.count.value }}</span>
            <select class="cart__product-select"></select>
            <span class="cart__product-price p_hg">{{ product?.price }}</span>
          </div>
        </li>
      </ul>
      <div class="cart__content-footer">
        <div class="cart__content-footer-wrapper">
          <span class="p_hg cart__content-footer-name">Ваш заказ:</span>
          <span class="cart__content-footer-value p_hg"
            >{{ totalCount }} {{ declensionWord(totalCount, productDeclension) }}</span
          >
          <span class="p_hg cart__content-footer-name">К оплате:</span>
          <span class="cart__content-footer-value p_hg">{{ priceTransform(totalPrice) }}</span>
        </div>
      </div>
    </div>
    <div class="cart__slogans">
      <div class="cart__slogan">
        <div class="cart__slogan-icon-wrapper">
          <svg class="cart__slogan-icon icon36 fill-none">
            <use href="@/assets/images/svg/mapIcon.svg#icon"></use>
          </svg>
        </div>
        <div class="cart__slogan-description">
          <div class="h4 cart__slogan-title">Доставка</div>
          <div class="p_hg cart__slogan-text">Саратов, 25.10 бесплатно</div>
        </div>
      </div>
      <div class="cart__slogan">
        <div class="cart__slogan-icon-wrapper">
          <svg class="cart__slogan-icon icon36 fill-none">
            <use href="@/assets/images/svg/cardIcon.svg#icon"></use>
          </svg>
        </div>
        <div class="cart__slogan-description">
          <div class="cart__slogan-title h4">Оплата</div>
          <div class="p_hg cart__slogan-text">Самый удобный для Вас: Картой на сайте</div>
        </div>
      </div>
    </div>
    <base-form class="cart__form">
      <span class="cart__form-title h4"
        >Для подтверждения заказа - введите ваши данные и мы перезвоним вам</span
      >
      <base-input
        v-model="formData.name.value"
        class="cart__form-input"
        :dark="true"
        label="Получатель"
        placeholder="Имя Фамилия"
        :required="true"
        :error="formErrors.errors?.name"
      ></base-input>
      <base-input
        v-model="formData.tel.value"
        @input="mask"
        class="cart__form-input"
        :dark="true"
        label="Мобильный телефон"
        placeholder="+7 (___) ___-__-__"
        :required="true"
        :error="formErrors.errors?.tel"
      ></base-input>
      <base-input
        v-model="formData.email.value"
        class="cart__form-input"
        :dark="true"
        label="E-mail"
        placeholder="Ваша почта"
        :error="formErrors.errors?.email"
      ></base-input>
      <span class="cart__conditions p_sm"
        >Нажимая «Выбрать способ доставки», подтверждаю, что я ознакомлен с условиями
        <a class="cart__conditions-link" href="#">Публичного договора оферты</a> и
        <a class="cart__conditions-link" href="#">Политикой конфиденциальности</a>, а также согласен
        получать информационную рассылку</span
      >
      <base-button :filled="true" class="cart__submit-button">Отправить форму</base-button>
    </base-form>
    <base-modal class="cart__modal" v-if="modalActive" @closeModal="closeModal">
      <base-image class="cart__modal-image" :src="products[activeProduct].image"></base-image>
      <h3 class="cart__modal-name p_hg">{{ products[activeProduct].name }}</h3>
      <div class="cart__modal-info">
        <base-select
          :dark="true"
          class="cart__modal-select"
          v-model="products[activeProduct].count"
          :data="dataCount"
          @update:modelValue="
            updateProduct(products[activeProduct].id, products[activeProduct].count.value)
          "
        />
        <span class="cart__modal-price p_hg">{{
          priceTransform(products[activeProduct].price * products[activeProduct].count.value)
        }}</span>
      </div>
      <base-button
        @onClick="deleteProduct(products[activeProduct].id)"
        class="cart__modal-delete"
        :filled="true"
        >Удалить</base-button
      >
    </base-modal>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import BaseButton from '@/components/ui/BaseButton.vue'
import BaseForm from '@/components/ui/BaseForm.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseImage from '@/components/ui/BaseImage.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

import textTransform from '@/utils/textTransform'
import validation from '@/utils/validation'
import telMask from '@/utils/mask'
import cartServices from '@/services/cartServices'

import { useSessionStore } from '@/stores/session'

import type { CartProductType } from '@/types/responseType'
import type { SelectType, ServiceType } from '@/types/formType'

const { declensionWord, priceTransform } = textTransform()
const { fieldValidation } = validation()

const router = useRouter()

const store = useSessionStore()

const productDeclension = ['товар', 'товара', 'товаров']

const formData = ref({
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
  }
} as ServiceType)

const formErrors = ref({
  countErrors: 0,
  errors: {} as any
})

const products = ref<CartProductType[]>([])

const activeProduct = ref(0)
const modalActive = ref(false)

const dataCount = computed(() => {
  let count = [] as SelectType[]
  for (let i = 1; i <= 6; i++) {
    count.push({ code: i, value: i })
  }
  return count
})

const totalPrice = computed(() => {
  let price = 0
  products.value.forEach((item) => {
    price += item.price * item.count.value
  })
  return price
})

const totalCount = computed(() => {
  let count = 0
  products.value.forEach((item: CartProductType) => {
    count += item.count.value
  })
  return count
})
const fetchProducts = async () => {
  await cartServices.getCartProducts().then((res) => {
    products.value = res.data
    products.value.forEach((item: CartProductType) => {
      item.count = {
        code: item.count,
        value: item.count
      }
    })
  })
}

const updateProduct = async (id: number, count: number) => {
  store.updateCount(totalCount.value)
  await cartServices.patchCartProduct(id, count)
}

const deleteProduct = async (id: number) => {
  modalActive.value = false
  products.value = products.value.filter((item) => {
    return item.id !== id
  })
  store.updateCount(totalCount.value)
  await cartServices.deleteCartProduct(id)
}
const activateModal = (index: number) => {
  document.querySelector('body').style.overflow = 'hidden'
  activeProduct.value = index
  modalActive.value = true
}

const closeModal = () => {
  document.querySelector('body').style.overflow = 'auto'
  modalActive.value = false
}

const mask = () => {
  formData.value.tel.value = telMask(formData.value.tel.value)
}

onMounted(async () => {
  await fetchProducts()
})

watch(formData.value, () => {
  formErrors.value = fieldValidation(formData.value)
})
</script>

<style scoped lang="scss">
.cart {
  padding-top: 75px;

  &__head {
    position: relative;
  }

  &__title {
    text-align: center;
    color: $white;

    margin-bottom: 30px;
  }

  &__back-button {
    position: absolute;
    top: 50%;
    left: 0;

    transform: translateY(-50%) rotate(180deg);
  }

  &__product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    background: $cart-input-background;

    border-radius: 15px 15px 0 0;
  }

  &__product-list-item {
    padding: 30px 20px;
  }

  &__product {
    display: flex;
    align-items: end;
  }

  &__product-image {
    width: 66px;
    margin-right: 17px;
  }

  &__product-count {
    color: $gray-light;
    font-weight: 500;
    line-height: 140%;
  }

  &__product-name {
    display: none;
  }

  &__product-price {
    display: none;
  }

  &__product-select {
    display: none;
  }

  &__modal-name {
    color: $white;
    font-weight: 500;

    margin-bottom: 10px;
  }

  &__modal-image {
    width: 70%;
    margin: 0 auto 10px;
  }

  &__modal-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__modal-price {
    color: $white;
  }

  &__modal-delete {
    margin-top: 10px;
  }

  &__modal-select {
    background: transparent;
    color: $white;

    width: 80px;
    border: none;

    transform: translateY(-5px);
    z-index: 5;
  }

  &__content-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    width: 100%;

    padding: 20px 25px;

    background: $cart-background-dark;

    border-radius: 0 0 15px 15px;

    margin-bottom: 26px;
  }

  &__content-footer-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;

    grid-row-gap: 12px;
    grid-column-gap: 15px;
  }

  &__content-footer-name {
    color: $gray-light;
    font-weight: 500;
    line-height: 140%;
  }

  &__content-footer-value {
    color: $white;
    font-weight: 500;
    line-height: 140%;
  }

  &__slogans {
    display: flex;
    flex-direction: column;

    row-gap: 30px;

    margin-bottom: 69px;
  }

  &__slogan {
    display: flex;
  }

  &__slogan-icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
    height: 80px;

    border-radius: 15px;

    background: $cart-background-dark;

    margin-right: 15px;
  }

  &__slogan-icon {
    stroke: $white;
  }

  &__slogan-description {
    width: 60%;
  }

  &__slogan-title {
    color: $white;
    text-decoration: 2px underline $red-active;
    text-underline-offset: 4px;

    margin-bottom: 16px;
  }

  &__slogan-text {
    color: $gray-light;
    font-weight: 500;
    line-height: 140%;
  }

  &__form {
    background: $cart-background-dark;

    row-gap: 15px;
  }

  &__form-title {
    padding: 0 9px;

    color: $white;
    margin-bottom: 20px;
  }

  &__conditions {
    color: $gray-light;

    text-align: center;
  }

  &__conditions-link {
    color: $red-active;
  }

  &__submit-button {
    width: 223px;

    margin: 0 auto;
  }
}
</style>
