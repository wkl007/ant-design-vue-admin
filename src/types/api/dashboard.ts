export interface ProjectNoticeResp {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: Date;
  member: string;
  href: string;
  memberLink: string;
}

export interface User {
  name: string;
  avatar: string;
}

export interface Group {
  name: string;
  link: string;
}

export interface Project {
  name: string;
  link: string;
}

export interface Comment {
  name: string;
  link: string;
}

export interface ActivitiesResp {
  id: string;
  updatedAt: Date;
  user: User;
  group: Group;
  project: Project;
  template: string;
  comment: Comment;
}

export interface VisitData {
  x: string;
  y: number;
}

export interface VisitData2 {
  x: string;
  y: number;
}

export interface SalesData {
  x: string;
  y: number;
}

export interface SearchData {
  index: number;
  keyword: string;
  count: number;
  range: number;
  status: number;
}

export interface OfflineData {
  name: string;
  cvr: number;
}

export interface OfflineChartData {
  x: any;
  y1: number;
  y2: number;
}

export interface SalesTypeData {
  x: string;
  y: number;
}

export interface SalesTypeDataOnline {
  x: string;
  y: number;
}

export interface SalesTypeDataOffline {
  x: string;
  y: number;
}

export interface RadarData {
  name: string;
  label: string;
  value: number;
}

export interface ChartDataResp {
  visitData: VisitData[];
  visitData2: VisitData2[];
  salesData: SalesData[];
  searchData: SearchData[];
  offlineData: OfflineData[];
  offlineChartData: OfflineChartData[];
  salesTypeData: SalesTypeData[];
  salesTypeDataOnline: SalesTypeDataOnline[];
  salesTypeDataOffline: SalesTypeDataOffline[];
  radarData: RadarData[];
}

export interface List {
  name: string;
  value: number;
  type: number;
}

export interface TagsResp {
  list: List[];
}
