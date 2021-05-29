export type LoginType = 'account' | 'telephone'

export interface LoginReq {
  type: LoginType;
  username: string;
  password: string;
}

export interface LoginResp {
  type: LoginType;
  success: boolean;
  token: string;
}

export interface Tag {
  key: string;
  label: string;
}

export interface Province {
  label: string;
  key: string;
}

export interface City {
  label: string;
  key: string;
}

export interface Geographic {
  province: Province;
  city: City;
}

export interface Permission {
  id: number;
  roleId: number;
  name: string;
  actions: Array<string>;
}

export interface Role {
  id: number;
  name: string | undefined;
  describe: string | undefined;
  permissions: Permission[];
}

export interface UserInfoResp {
  name: string;
  avatar: string;
  userid: string;
  email: string;
  signature: string;
  title: string;
  group: string;
  tags: Tag[];
  notifyCount: number;
  unreadCount: number;
  country: string;
  geographic: Geographic;
  address: string;
  phone: string;
  role: Role;
}

export interface LogoutResp {
  success: boolean;
}

export interface RegisterReq {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  captcha: string;
}

export interface RegisterResp {
  data: Record<any, any>;
  success: boolean;
}
