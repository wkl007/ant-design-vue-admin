export interface NoticeResp {
  key?: string;
  id: string;
  avatar: string;
  title: string;
  datetime: string;
  type: string;
  read?: boolean;
  description: string;
  clickClose?: boolean;
  extra: string;
  status: string;
}
