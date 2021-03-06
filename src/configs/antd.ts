import type { App } from 'vue'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Calendar,
  Card,
  Cascader,
  Checkbox,
  Col,
  ConfigProvider,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Form,
  Input,
  Layout,
  List,
  Menu,
  Modal,
  PageHeader,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Rate,
  Result,
  Row,
  Select,
  Space,
  Spin,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Tooltip,
  Upload
} from 'ant-design-vue'

/**
 * antd 按需加载配置
 * @param app
 */
export function setupAntd (app: App<Element>): void {
  app
    .use(Alert)
    .use(Avatar)
    .use(Badge)
    .use(Button)
    .use(Calendar)
    .use(Card)
    .use(Cascader)
    .use(Checkbox)
    .use(Col)
    .use(ConfigProvider)
    .use(DatePicker)
    .use(Descriptions)
    .use(Divider)
    .use(Drawer)
    .use(Dropdown)
    .use(Empty)
    .use(Form)
    .use(Input)
    .use(Layout)
    .use(List)
    .use(Menu)
    .use(Modal)
    .use(Pagination)
    .use(Popconfirm)
    .use(Popover)
    .use(Progress)
    .use(Radio)
    .use(Rate)
    .use(Result)
    .use(Row)
    .use(Select)
    .use(Space)
    .use(Spin)
    .use(Statistic)
    .use(Steps)
    .use(Switch)
    .use(Table)
    .use(Tabs)
    .use(Tag)
    .use(TimePicker)
    .use(Tooltip)
    .use(PageHeader)
    .use(Upload)
}
