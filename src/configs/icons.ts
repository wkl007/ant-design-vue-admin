import type { App } from 'vue'
import {
  AlipayCircleOutlined,
  AppstoreAddOutlined,
  BellOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  CloudDownloadOutlined,
  CloudOutlined,
  ColumnHeightOutlined,
  CopyrightOutlined,
  DingdingOutlined,
  DownloadOutlined,
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
  FormOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  GlobalOutlined,
  HeartOutlined,
  HistoryOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  LikeOutlined,
  LinkOutlined,
  LockOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageFilled,
  MobileOutlined,
  PlusOutlined,
  ReloadOutlined,
  RightOutlined,
  SearchOutlined,
  SettingOutlined,
  ShareAltOutlined,
  StarTwoTone,
  TableOutlined,
  TaobaoCircleOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  UserOutlined,
  WarningOutlined,
  WeiboCircleOutlined
} from '@ant-design/icons-vue'

/**
 * Icon 按需加载配置
 * @param app
 */
export function setupIcons (app: App<Element>): void {
  const iconList = [AlipayCircleOutlined, AppstoreAddOutlined, BellOutlined, CheckCircleOutlined, CloseCircleOutlined, CloseOutlined, CloudDownloadOutlined, CloudOutlined, ColumnHeightOutlined, CopyrightOutlined, DingdingOutlined, DownloadOutlined, DownOutlined, EditOutlined, EllipsisOutlined, FormOutlined, FullscreenExitOutlined, FullscreenOutlined, GlobalOutlined, HeartOutlined, HistoryOutlined, HomeOutlined, InfoCircleOutlined, LeftOutlined, LikeOutlined, LinkOutlined, LockOutlined, LogoutOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MessageFilled, MobileOutlined, PlusOutlined, ReloadOutlined, RightOutlined, SettingOutlined, ShareAltOutlined, StarTwoTone, TableOutlined, TaobaoCircleOutlined, UnorderedListOutlined, UploadOutlined, UserOutlined, WarningOutlined, WeiboCircleOutlined, CaretDownOutlined, CaretUpOutlined, SearchOutlined]

  iconList.forEach(icon => {
    app.component(icon.displayName, icon)
  })
}
