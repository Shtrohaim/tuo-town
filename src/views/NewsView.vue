<template>
  <main class="news container">
    <h1 class="news__title h3">{{ route.name === 'article' ? article.title : 'Новости' }}</h1>
    <router-view v-slot="{ Component }" class="news__content">
      <component
        :is="Component"
        :articles="news"
        :article="article"
        :listLoad="isLoad.list"
        :articleLoad="isLoad.article"
        @onUnmounted="newsUnmounted"
      >
      </component>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import articlesServices from '@/services/articlesServices'
import { useRoute } from 'vue-router'
import type { ArticleType } from '@/types/responseType'

const route = useRoute()

const news = ref([] as ArticleType[])
const article = ref({} as ArticleType)
const isLoad = ref({
  list: false,
  article: false
})

const fetchNews = async () => {
  await articlesServices.getAllArticles().then((res) => {
    news.value = res.data
    isLoad.value.list = true
  })
}

const fetchArticle = async () => {
  await articlesServices.getArticle(Number(route.params.id)).then((res: any) => {
    article.value = res.data
    isLoad.value.article = true
  })
}

const newsUnmounted = async () => {
  if (route.name === 'article') {
    await fetchArticle()
  } else {
    await fetchNews()
  }
}

onMounted(async () => {
  await newsUnmounted()
})
</script>

<style scoped lang="scss">
.news {
  padding-top: 65px;

  @media (min-width: 768px) {
    padding-top: 100px;
  }

  &__title {
    text-align: center;
    color: $white;

    margin-bottom: 40px;
  }

  &__content {
    justify-content: space-around;
  }
}
</style>
