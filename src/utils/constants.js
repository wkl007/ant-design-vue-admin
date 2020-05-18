export const NODE_ENV = process.env.NODE_ENV // 环境变量

export const LOGIN_STATUS = 'Login_Status' // 登录状态

export const ACCESS_TOKEN = 'Access_Token' // 登录token

export const USER_INFO = 'User_Info' // 用户信息

export const SETTINGS = 'Settings' // 设置信息

export const DEFAULT_TITLE = 'Ant Design Pro' // 默认标题

export const DEVICE_TYPE = {
  DESKTOP: 'desktop',
  TABLET: 'tablet',
  MOBILE: 'mobile'
}

export const PAGINATION = {
  total: 0,
  pageSize: 10,
  current: 1,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total) => `共 ${total} 条`,
  size: 'small'
} // 分页默认参数

export const SEARCH_LAYOUT = {
  Row: {
    gutter: 24,
    justify: 'space-between',
    type: 'flex'
  },
  Col: {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 18,
    xxl: 17
  }
} // 搜索layout

export const SEARCH_STYLE = {
  padding: '0px'
}

export const FORM_ITEM_STYLE = {
  width: '200px'
} // 表单item样式

export const TABLE_PROPS = {
  rowKey: (record, index) => index,
  scroll: { x: false },
  bordered: true,
  size: 'small',
}

export const MODAL_PROPS = {
  style: { top: '18%' },
  maskClosable: false,
  bodyStyle: { padding: '16px 24px' },
}

export const BUTTON_STYLE = {
  marginRight: '6px'
}

export const MODAL_FORM_LAYOUT = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
}

export const INPUT_PROPS = {
  autoComplete: 'off'
}

export const SEARCH_INPUT_PROPS = {
  autoComplete: 'off',
  style: FORM_ITEM_STYLE
}

export const SELECT_PROPS = {
  allowClear: true,
  showSearch: true,
  optionFilterProp: 'children',
  filterOption: (input, option) => option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

export const UPLOAD_PROPS = {
  accept: 'image/*',
  showUploadList: false,
}
