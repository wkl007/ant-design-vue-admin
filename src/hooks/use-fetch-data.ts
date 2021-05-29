import { onMounted, reactive } from 'vue'

export interface PageInfo {
  current: number;
  pageSize: number;
  total: number;

  [key: string]: any;
}

export interface RequestData<T> {
  data: T[];
  success?: boolean;
  total?: number;

  [key: string]: any;
}

export type RequestParams =
  | {
  pageSize: number;
  current: number;
  [key: string]: any;
} | undefined;

export interface UseFetchDataAction<T extends RequestData<any>> {
  stripe: (record: any, index: number) => string | undefined;
  cancel: () => void;
  reload: () => Promise<void>;
  resetPageIndex: () => void;
  reset: () => void;
  context: Context<T>;
  setPageInfo: (pageInfo: Partial<PageInfo>) => void;
}

export interface Context<T> {
  current: number;
  pageSize: number;
  dataSource: T[];
  loading: boolean;
  total: number;
  requestParams?: {
    [key: string]: any;
  };

  [key: string]: any;
}

export const defaultContext: Context<any> = {
  stripe: false,
  loading: false,
  current: 1,
  pageSize: 20,
  total: 0,
  dataSource: []
}

// 如果请求数据中，没有分页，仅单列表数据，可以使用该方法进行包装，免去重复写请求方法
export const wrap = <T> (req: () => Promise<T[]>): (() => Promise<RequestData<T>>) => {
  return () =>
    req().then(res => {
      const data = res
      return {
        data,
        total: data.length,
        success: true
      }
    })
}

export function useFetchData<T extends RequestData<any>> (
  getData: (params?: RequestParams) => Promise<T>,
  context?: {
    stripe?: boolean;
    current?: number;
    pageSize?: number;
    dataSource?: T[];
    loading?: boolean;
    [key: string]: any;
  },
  options?: {
    current?: number;
    pageSize?: number;
    onLoad?: (dataSource: T['data']) => void;
    onRequestError?: (e: Error) => void;
    pagination?: boolean;
  }
): UseFetchDataAction<T> {
  const state = reactive<Context<T>>({
    ...defaultContext,
    ...context
  })

  async function fetchList (): Promise<void> {
    try {
      // 请求中禁止重复请求
      if (state.loading) return
      state.loading = true
      const { pageSize = 20, current = 1 } = state
      const params: RequestParams = options?.pagination !== false
        ? { current, pageSize, ...state.requestParams }
        : undefined
      const { data, success, total: dataTotal = 0 } = await getData(params)
      state.loading = false
      if (success !== false) {
        state.dataSource = data
        state.total = dataTotal
      }
    } catch (e) {
      state.loading = false
      // 如果没有传递这个方法的话，需要把错误抛出去，以免吞掉错误
      if (options?.onRequestError === undefined) {
        throw new Error(e)
      } else {
        options.onRequestError(e)
      }
    }
  }

  function cancel (): void {}

  function reset (): void {}

  function reload (): Promise<void> {
    return new Promise(resolve => {
      resolve(fetchList())
    })
  }

  function setPageInfo (pageInfo: Partial<PageInfo>): void {
    pageInfo.current && (state.current = pageInfo.current)
    pageInfo.pageSize && (state.pageSize = pageInfo.pageSize)
    state.requestParams = pageInfo
  }

  function resetPageIndex (): void {
    state.current = 1
  }

  function stripe (_: any, index: number): string {
    return index % 2 === 1 && state.stripe && 'ant-pro-table-row-striped'
  }

  onMounted(() => {
    fetchList().catch(e => {
      throw new Error(e)
    })
  })

  return {
    context: state,

    stripe,
    cancel,
    reset,
    reload,
    resetPageIndex,
    setPageInfo: info => {
      setPageInfo({
        current: state.current,
        pageSize: state.pageSize,
        ...info
      })
    }
  }
}
