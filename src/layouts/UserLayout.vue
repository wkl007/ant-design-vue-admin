<template>
  <div id="user-layout" class="user-layout-wrapper">
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img src="~@/assets/images/logo.png" class="logo" alt="logo">
            <span class="title">Ant Design</span>
          </a>
        </div>
        <div class="desc">
          Ant Design 是西湖区最具影响力的 Web 设计规范
        </div>
      </div>
      <router-view/>
      <div class="footer">
        <div class="links">
          <a href="_self">帮助</a>
          <a href="_self">隐私</a>
          <a href="_self">条款</a>
        </div>
        <div class="copyright">
          Copyright &copy; 2018 白鹭学园技术组出品
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLayout'
}
</script>

<style scoped lang="less">
  #user-layout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          width: 98%;
          max-width: 368px;
        }
      }
    }

    .container {
      position: relative;
      width: 100%;
      min-height: 100%;
      padding: 110px 0 144px;
      background: #f0f2f5 url(~@/assets/images/background.svg) no-repeat 50%;
      background-size: 100%;

      a {
        text-decoration: none;
      }

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            margin-top: -10px;
            margin-left: -12px;
            line-height: 1;
            vertical-align: middle;
            opacity: 0.8;
          }

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
