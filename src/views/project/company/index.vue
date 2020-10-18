<template>
  <page-view>
    <a-form :form="form">
      <a-form-item label="日期">
        <a-date-picker v-decorator="['createdAt']"/>
      </a-form-item>
      <a-form-item label="日期2">
        <a-range-picker
          :placeholder="['开始时间', '结束时间']"
          v-decorator="['dateRange']"
        />
      </a-form-item>
      <a-form-item>
        <a-button type='primary' @click="handleTestSubmit">
          提交
        </a-button>
        <a-button @click="handleTestReset">
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </page-view>
</template>
<script>
import { PageView } from '@/layouts'

export default {
  components: {
    PageView
  },
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    // 测试提交
    handleTestSubmit () {
      const { form: { validateFields } } = this
      validateFields((err, values) => {
        // console.log(values)
      })
    },
    // 测试重置
    handleTestReset () {
      const { form: { resetFields } } = this
      resetFields()
    }
  }
}
</script>
