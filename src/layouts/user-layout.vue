<template>
  <div class="user-layout">
    <div class="container" :style="{backgroundImage:`url(${images.background})`}">
      <div class="top">
        <div class="header">
          <a href="/">
            <img :src="images.user_logo" class="logo" alt="logo"/>
            <span class="title">Admin Pro</span>
          </a>
        </div>
        <p class="desc">
          Ant Design 是西湖区最具影响力的 Web 设计规范
        </p>
      </div>

      <router-view/>

      <div class="footer">
        <div class="links">
          <a href="_self">帮助</a>
          <a href="_self">隐私</a>
          <a href="_self">条款</a>
        </div>
        <div class="copyright">
          Copyright
          <copyright-outlined/>
          2021 wkl007
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'UserLayout',
  setup () {
    return {
      images: inject('images')
    }
  }
})
</script>

<style scoped lang="less">
.user-layout {
  height: 100%;

  .container {
    position: relative;
    width: 100%;
    min-height: 100%;
    padding: 110px 0 144px;
    background: no-repeat center 110px;
    background-size: 100%;

    a {
      text-decoration: none;
    }

    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        .logo {
          height: 44px;
          margin-right: 16px;
          vertical-align: top;
          border-style: none;
        }

        .title {
          position: relative;
          top: 2px;
          color: rgba(0, 0, 0, 0.85);
          font-weight: 600;
          font-size: 33px;
          font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
        }
      }

      .desc {
        margin-top: 12px;
        margin-bottom: 40px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }

    .main {
      width: 368px;
      min-width: 260px;
      margin: 0 auto;
    }

    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      margin: 48px 0 24px;
      padding: 0 16px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;

        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;

          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }

      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>
