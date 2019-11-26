<template>
  <div class="logo">
    <router-link :to="{path:'/'}">
      <!--      <LogoSvg alt="logo" />-->
      <img src="~@/assets/images/logo.svg" alt="">
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Logo',
    props: {
      title: {
        type: String,
        default: 'Ant Design Pro',
        required: false
      },
      showTitle: {
        type: Boolean,
        default: true,
        required: false
      }
    }
  }
</script>
