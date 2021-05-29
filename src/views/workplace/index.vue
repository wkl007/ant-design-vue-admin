<template>
  <page-container
    :show-breadcrumb="false"
    title="工作台"
  >
    <template #content>
      <div class="page-header-content">
        <div class="avatar">
          <a-avatar size="large" :src="userInfo.avatar"/>
        </div>
        <div class="content">
          <div class="content-title">
            早安，{{ userInfo.nickname }}
            <span class="welcome-text">，祝你开心每一天！</span>
          </div>
          <div class="pb10" v-if="userInfo.extra">{{ userInfo.extra.group }}</div>
        </div>
      </div>
    </template>
    <template #extraContent>
      <div class="extra-content">
        <div class="stat-item">
          <a-statistic title="项目数" :value="56"/>
        </div>
        <div class="stat-item">
          <a-statistic title="团队内排名" :value="8" suffix="/ 24"/>
        </div>
        <div class="stat-item">
          <a-statistic title="项目访问" :value="2223"/>
        </div>
      </div>
    </template>
    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            style="margin-bottom: 24px;"
            class="project-list"
            title="进行中的项目"
            :loading="projects.loading"
            :bordered="false"
            :body-style="{ padding: 0 }"
          >
            <template #extra>
              <a>全部项目</a>
            </template>
            <a-card-grid
              class="project-card-grid"
              :key="item.id"
              v-for="item in projects.dataSource"
            >
              <a-card :bordered="false" :body-style="{ padding: 0 }">
                <a-card-meta>
                  <template #title>
                    <div class="card-title">
                      <a-avatar size="small" :src="item.logo"/>
                      <a>{{ item.title }}</a>
                    </div>
                  </template>
                  <template #description>
                    <div class="card-description">
                      {{ item.description }}
                    </div>
                  </template>
                </a-card-meta>
                <div class="project-item">
                  <a href="/#/">科学搬砖组</a>
                  <span class="datetime">9小时前</span>
                </div>
              </a-card>
            </a-card-grid>
          </a-card>

          <a-card :loading="activities.loading" title="动态" :bordered="false">
            <a-list>
              <a-list-item :key="item.id" v-for="item in activities.dataSource">
                <a-list-item-meta>
                  <template #avatar>
                    <a-avatar :src="item.user.avatar"/>
                  </template>
                  <template #title>
                    <div>
                      <a>{{ item.user.name }}</a>
                      &nbsp;
                      <span class="events">
                        <template
                          v-for="event in item.template.split(/@\{([^{}]*)\}/gi)"
                          :key="event"
                        >
                          <a v-if="item[event]" :href="item[event].link">
                            {{ item[event].name }}
                          </a>
                          <span v-else>{{ event }}</span>
                        </template>
                      </span>
                    </div>
                  </template>
                  <template #description>
                    <div>{{ item.time }}</div>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px;" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            title="快速开始 / 便捷导航"
            style="margin-bottom: 24px;"
            :bordered="false"
            :body-style="{ padding: 0 }"
          >
            <div class="item-group">
              <a>操作一</a>
              <a>操作二</a>
              <a>操作三</a>
              <a>操作四</a>
              <a>操作五</a>
              <a>操作六</a>
              <a-button size="small" type="primary" ghost>
                <template #icon>
                  <plus-outlined/>
                </template>
                添加
              </a-button>
            </div>
          </a-card>
          <a-card
            title="XX 指数"
            style="margin-bottom: 24px;"
            :loading="radar.loading"
            :bordered="false"
            :body-style="{ padding: 0 }"
          >
            <div style="min-height: 400px;">
              <v-radar :data="radar.dataSource"/>
            </div>
          </a-card>
          <a-card :loading="projects.loading" title="团队" :bordered="false">
            <div class="members">
              <a-row>
                <a-col
                  v-for="item in projects.dataSource"
                  :key="`members-item-${item.id}`"
                  :span="12"
                >
                  <a :href="item.href">
                    <a-avatar size="small" :src="item.logo"/>
                    <span class="member">{{ item.member }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-container>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { useFetchData } from '@/hooks'
import { VRadar } from '@/components'
import DashboardServer from '@/api/dashboard'

export default defineComponent({
  name: 'Workplace',
  components: {
    VRadar
  },
  setup () {
    const store = useStore()
    const state = reactive({
      loading: true,
      radarLoading: true,
      teams: [],
      // data
      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          }
        }
      },
      scale: [
        {
          dataKey: 'score',
          min: 0,
          max: 80
        }
      ],
      axisData: [
        { item: '引用', a: 70, b: 30, c: 40 },
        { item: '口碑', a: 60, b: 70, c: 40 },
        { item: '产量', a: 50, b: 60, c: 40 },
        { item: '贡献', a: 40, b: 50, c: 40 },
        { item: '热度', a: 60, b: 70, c: 40 },
        { item: '引用', a: 70, b: 50, c: 40 }
      ]
    })

    const { context: projects } = useFetchData(() => DashboardServer.getProjectNotice().then(res => {
      return {
        data: res,
        total: 100
      }
    }))
    const { context: activities } = useFetchData(() => DashboardServer.getActivities().then(res => {
      return {
        data: res,
        total: 100
      }
    }))
    const { context: radar } = useFetchData(() => DashboardServer.getChartData().then(res => {
      return {
        data: res.radarData,
        total: 100
      }
    }))

    return {
      state,
      userInfo: computed(() => store.getters.userInfo),
      projects,
      activities,
      radar
    }
  }
})
</script>

<style scoped lang="less">
@import "~@/assets/styles/variables";
@import "~@/assets/styles/mixins";

.page-header-content {
  display: flex;

  .avatar {
    flex: 0 1 72px;

    & > span {
      display: block;
      width: 72px;
      height: 72px;
      border-radius: 72px;
    }
  }

  .content {
    position: relative;
    top: 4px;
    flex: 1 1 auto;
    margin-left: 24px;
    color: @text-color-secondary;
    line-height: 22px;

    .content-title {
      margin-bottom: 12px;
      color: @heading-color;
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }
  }
}

.extra-content {
  .clear-fix();

  float: right;
  white-space: nowrap;

  .stat-item {
    position: relative;
    display: inline-block;
    padding: 0 32px;

    > p:first-child {
      margin-bottom: 4px;
      color: @text-color-secondary;
      font-size: @font-size-base;
      line-height: 22px;
    }

    > p {
      margin: 0;
      color: @heading-color;
      font-size: 30px;
      line-height: 38px;

      > span {
        color: @text-color-secondary;
        font-size: 20px;
      }
    }

    &::after {
      position: absolute;
      top: 8px;
      right: 0;
      width: 1px;
      height: 40px;
      background-color: @border-color-split;
      content: '';
    }

    &:last-child {
      padding-right: 0;

      &::after {
        display: none;
      }
    }
  }
}

.project-list {
  .card-title {
    font-size: 0;

    a {
      display: inline-block;
      height: 24px;
      margin-left: 12px;
      color: @text-color;
      font-size: 14px;
      line-height: 24px;
      vertical-align: top;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .card-description {
    height: 44px;
    overflow: hidden;
    color: @text-color-secondary;
    line-height: 22px;
  }

  .project-item {
    display: flex;
    height: 20px;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    line-height: 20px;

    a {
      display: inline-block;
      flex: 1 1 0;
      color: @text-color-secondary;

      &:hover {
        color: #1890ff;
      }
    }

    .datetime {
      flex: 0 0 auto;
      float: right;
      color: @disabled-color;
    }
  }

  .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    color: @text-color-secondary;
    line-height: 22px;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;

  a {
    display: inline-block;
    width: 25%;
    margin-bottom: 13px;
    color: @text-color;
    font-size: 14px;
  }
}

.members {
  a {
    display: block;
    height: 24px;
    margin: 12px 0;
    color: @text-color;
    line-height: 24px;

    .member {
      display: inline-block;
      max-width: 100px;
      margin-left: 12px;
      font-size: 14px;
      line-height: 24px;
      vertical-align: top;
      transition: all 0.3s;
    }

    &:hover {
      span {
        color: @primary-color;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .project-card-grid {
    width: 50%;
  }
}

@media screen and (max-width: 480px) {
  .project-card-grid {
    width: 100%;
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    margin: 16px 0 16px;
    padding-top: 16px;
    border: 0;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
