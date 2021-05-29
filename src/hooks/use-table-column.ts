import { reactive, ref, Ref, watch } from 'vue'
import { TableColumn } from '@/types'

export type TableOptions =
  | {
  checkAll?: boolean;
  needRowIndex?: boolean;
} | boolean;

export type DynamicColumnItem = {
  key: string;
  label: string;
  checked: boolean;
}

export type DynamicColumnState = {
  checkAll: boolean;
  checkedList: string[];
  /**
   * 是否需要序号
   */
  needRowIndex: boolean;
  indeterminate: boolean;
}

export interface DynamicColumns {
  dynamicColumns: Ref<TableColumn[]>;
  dynamicColumnItems: Ref<DynamicColumnItem[]>;
  state: DynamicColumnState;
  reset: () => void;
  handleColumnChange: (e: Event, column: DynamicColumnItem) => void;
  handleColumnAllClick: (e: Event) => void;
  move: (index: number, targetIndex: number) => void;
}

const defaultRowIndexColumn: TableColumn = {
  align: 'center',
  title: '序号',
  dataIndex: 'my-custom-show-index',
  customRender: ({ index }: { index: number }) => `${index + 1}`
}

export function useTableDynamicColumns (columns: TableColumn[], defOptions: TableOptions): DynamicColumns {
  const options: { checkAll: boolean; needRowIndex: boolean; } = typeof defOptions === 'boolean'
    ? { checkAll: defOptions, needRowIndex: false }
    : { checkAll: !!defOptions.checkAll, needRowIndex: !!defOptions.needRowIndex }

  const state = reactive<DynamicColumnState>({
    checkAll: options.checkAll,
    needRowIndex: options.needRowIndex,
    checkedList: [],
    indeterminate: true
  })

  const dynamicColumns = ref([...columns])

  if (options.needRowIndex) dynamicColumns.value.unshift(defaultRowIndexColumn)

  const dynamicColumnItems: Ref<DynamicColumnItem[]> = ref(
    columns.map(column => {
      return {
        key: column?.key || column.dataIndex,
        label: column.title,
        checked: options.checkAll
      } as DynamicColumnItem
    })
  )

  const dynamicColumnValues: string[] = dynamicColumnItems.value.map(column => column.key)

  state.checkedList = dynamicColumnValues
  state.checkAll = options.checkAll
  state.indeterminate = !options.checkAll

  function planColumns (): void {
    const keys = dynamicColumnItems.value.map(item => item.key)

    dynamicColumns.value = columns
      .filter(item => state.checkedList.includes(item.dataIndex as string))
      .sort((a, b) => {
        const aKey = a.key || a.dataIndex
        const bKey = b.key || b.dataIndex
        return keys.indexOf(aKey as string) - keys.indexOf(bKey as string)
      })
      .map(item => item)

    if (options.needRowIndex) dynamicColumns.value.unshift(defaultRowIndexColumn)
  }

  function handleColumnChange (e: Event, column: DynamicColumnItem): void {
    const checked = (e.target as HTMLInputElement).checked
    column.checked = checked
    if (checked) {
      !state.checkedList.includes(column.key) && state.checkedList.push(column.key)
    } else {
      state.checkedList = state.checkedList.filter(item => item !== column.key)
    }
  }

  function handleColumnAllClick (e: Event): void {
    const checked = (e.target as HTMLInputElement).checked
    state.checkedList = checked ? dynamicColumnValues : []
    dynamicColumnItems.value = dynamicColumnItems.value.map(column => {
      column.checked = checked
      return column
    })
  }

  function reset (): void {
    state.checkedList = dynamicColumnValues
    dynamicColumnItems.value = columns.map(column => {
      return {
        key: column?.key || column.dataIndex,
        label: column.title,
        checked: options.checkAll
      } as DynamicColumnItem
    })
  }

  function move (index: number, targetIndex: number): void {
    const newColumnItems = dynamicColumnItems.value
    const columnItemKey = newColumnItems[index]
    newColumnItems.splice(index, 1)
    if (targetIndex === 0) {
      newColumnItems.unshift(columnItemKey)
    } else {
      newColumnItems.splice(targetIndex, 0, columnItemKey)
    }
    dynamicColumnItems.value = newColumnItems
  }

  watch(
    () => state.checkedList,
    () => {
      state.checkAll = !!state.checkedList.length && state.checkedList.length === dynamicColumnValues.length
      state.indeterminate = !!state.checkedList.length && state.checkedList.length < dynamicColumnValues.length
      planColumns()
    },
    { deep: true }
  )

  watch(
    () => dynamicColumnItems,
    () => planColumns(),
    { deep: true }
  )

  return {
    dynamicColumns,
    dynamicColumnItems,
    state,

    reset,
    move,
    handleColumnAllClick,
    handleColumnChange
  }
}
