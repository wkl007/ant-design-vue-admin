<template>
  <notice-dropdown
    class="action"
    :count="unreadCount"
    :loading="loading"
  >
    <a-tabs :v-model:active-key="activeKey">
      <template
        v-for="{ key, title, emptyText, showViewMore } in noticesConfig"
        :key="key"
      >
        <a-tab-pane v-if="key" :key="key" :tab="title">
          <notice-list
            :title="title"
            :count="unreadData[key]"
            :list="noticeData[key]"
            :empty-text="emptyText"
            :show-view-more="showViewMore"
            clear-text="Empty"
            view-more-text="See more"
            show-clear
            @itemClick="changeReadState"
            @clear="handleNoticeClear(title,key)"
            @viewMore="handleViewMore(key)"
          >
            <template #extra="notice">
              <a-tag
                v-if="notice.extra && notice.status"
                style="margin-right: 0;"
                :color="color[notice.status]"
              >
                {{ notice.extra }}
              </a-tag>
              <template v-else>
                {{ notice.extra }}
              </template>
            </template>
          </notice-list>
        </a-tab-pane>
      </template>
    </a-tabs>
  </notice-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import { message } from 'ant-design-vue'
import moment from 'moment'
import { groupBy } from 'lodash-es'
import NoticeDropdown from './notice-dropdown.vue'
import NoticeList from './notice-list.vue'
import NoticeServer from '@/api/notice'
import type { NoticeResp } from '@/types/api/notice'

const color = {
  todo: '',
  processing: 'blue',
  urgent: 'red',
  doing: 'gold'
}

interface NoticesConfig {
  key: string;
  title: string;
  emptyText: string;
  showViewMore: boolean;
}

interface State {
  totalCount: number;
  unreadCount: number;
  list: NoticeResp[];
  loading: boolean;
  activeKey: string;
  noticesConfig: NoticesConfig[];
}

export default defineComponent({
  name: 'NoticeIcon',
  components: {
    NoticeDropdown,
    NoticeList
  },
  setup () {
    const state = reactive<State>({
      totalCount: 0,
      unreadCount: 0,
      list: [],
      loading: true,
      activeKey: 'notification',
      noticesConfig: [
        {
          key: 'notification',
          title: 'Notification',
          emptyText: 'You have viewed all notifications',
          showViewMore: true
        },
        {
          key: 'message',
          title: 'Message',
          emptyText: 'You have read all messages',
          showViewMore: true
        },
        {
          key: 'event',
          title: 'To do',
          emptyText: 'You have completed all to-dos',
          showViewMore: false
        }
      ]
    })
    const noticeData = computed(() => groupBy(state.list, 'type'))
    const unreadData = computed(() => {
      const data: Record<string, number> = {}
      Object.keys(noticeData.value).forEach(key => {
        const value = noticeData.value[key]
        if (!data[key]) data[key] = 0
        if (Array.isArray(value)) data[key] = value.filter(item => !item.read).length
      })
      return data
    })

    /** 获取列表 */
    async function getNoticeList () {
      try {
        const res = await NoticeServer.getNoticeList()
        if (!res || !res.length || !Array.isArray(res)) {
          state.list = []
        } else {
          res.forEach(item => {
            if (item.datetime) item.datetime = moment(item.datetime).fromNow()
            if (item.id) item.key = item.id
          })
          state.list = res
        }
        state.totalCount = state.list.length
        state.unreadCount = state.list.filter(item => !item.read).length
        state.loading = false
      } catch (e) {}
    }

    /** 更改状态 */
    function changeReadState (notice: NoticeResp): void {
      const { id } = notice
      const index = state.list.findIndex(item => item.id === id)
      state.list[index].read = true
      state.totalCount = state.list.length
      state.unreadCount = state.list.filter(item => !item.read).length
    }

    /** 查看更多 */
    function handleViewMore (key: string): void {
      message.info(`Click on view more ${key}`)
    }

    /** 清空消息 */
    function handleNoticeClear (title: string, key: string): void {
      message.success(`Emptied ${title}`)
      state.list = state.list.filter(item => item.type !== key)
      state.totalCount = state.list.length
      state.unreadCount = state.list.filter(item => !item.read).length
    }

    onMounted(() => {
      getNoticeList()
    })

    return {
      ...toRefs(state),
      unreadData,
      noticeData,
      color,

      changeReadState,
      handleViewMore,
      handleNoticeClear
    }
  }
})
</script>
