<template>
  <div class="page-header">
    <div class="page-header-index-wide">
      <s-breadcrumb />
      <!--<div class="detail">
        <div class="main" v-if="!$route.meta.hiddenHeaderContent">
          <div class="row">
            <img v-if="logo" :src="logo" class="logo"/>
            <h1 v-if="title" class="title">{{ title }}</h1>
            <div class="action">
              <slot name="action"></slot>
            </div>
          </div>
          <div class="row">
            <div v-if="avatar" class="avatar">
              <a-avatar :src="avatar" />
            </div>
            <div v-if="this.$slots.content" class="headerContent">
              <slot name="content"></slot>
            </div>
            <div v-if="this.$slots.extra" class="extra">
              <slot name="extra"></slot>
            </div>
          </div>
          <div>
            <slot name="pageMenu"></slot>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/tools/Breadcrumb'

export default {
  name: 'PageHeader',
  components: {
    's-breadcrumb': Breadcrumb
  },
  props: {
    title: {
      type: [String, Boolean],
      default: true,
      required: false
    },
    logo: {
      type: String,
      default: '',
      required: false
    },
    avatar: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.page-header {
  padding: 16px 32px 0;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;

  .breadcrumb {
    margin-bottom: 16px;
  }

  .detail {
    display: flex;

    /* margin-bottom: 16px; */

    .avatar {
      flex: 0 1 72px;
      margin: 0 24px 8px 0;

      & > span {
        display: block;
        width: 72px;
        height: 72px;
        border-radius: 72px;
      }
    }

    .main {
      flex: 0 1 auto;
      width: 100%;

      .row {
        display: flex;
        width: 100%;

        .avatar {
          margin-bottom: 16px;
        }
      }

      .title {
        flex: auto;
        margin-bottom: 16px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
      }

      .logo {
        width: 28px;
        height: 28px;
        margin-right: 16px;
        border-radius: 4px;
      }

      .content,
      .headerContent {
        flex: auto;
        color: rgba(0, 0, 0, 0.45);
        line-height: 22px;

        .link {
          margin-top: 16px;
          line-height: 24px;

          a {
            margin-right: 32px;
            font-size: 14px;
          }
        }
      }

      .extra {
        flex: 0 1 auto;
        min-width: 242px;
        margin-left: 88px;
        text-align: right;
      }

      .action {
        flex: 0 1 auto;
        min-width: 266px;
        margin-left: 56px;
        text-align: right;

        &:empty {
          display: none;
        }
      }
    }
  }
}

.mobile .page-header {
  .main {
    .row {
      flex-wrap: wrap;

      .avatar {
        flex: 0 1 25%;
        margin: 0 2% 8px 0;
      }

      .content,
      .headerContent {
        flex: 0 1 70%;

        .link {
          margin-top: 16px;
          line-height: 24px;

          a {
            margin-right: 10px;
            font-size: 14px;
          }
        }
      }

      .extra {
        flex: 1 1 auto;
        min-width: 0;
        margin-left: 0;
        text-align: right;
      }

      .action {
        flex: 0 1 auto;
        min-width: 266px;
        margin-bottom: 12px;
        margin-left: unset;
        text-align: left;

        &:empty {
          display: none;
        }
      }
    }
  }
}
</style>
