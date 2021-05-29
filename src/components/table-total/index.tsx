import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'TableTotal',
  render () {
    const {
      table: { data, columns, rowKey },
      renderRows
    } = this.$parent as any

    const key = typeof rowKey === 'function' ? rowKey() : rowKey

    const totalRow = {
      [key]: '-999999'
    } as { [key: string]: string }

    if (data == null || data.length <= 0) {
      columns.forEach((it: { [key: string]: string }) => {
        const dataIndex = it.dataIndex || it.title
        totalRow[dataIndex] = dataIndex
      })
    } else {
      columns.forEach((column: { [key: string]: any }) => {
        const isFunSummary = typeof column.summary === 'function'
        if (isFunSummary) {
          totalRow[column.dataIndex] = column.summary(data, h)
          return
        }
        totalRow[column.dataIndex] =
          (column.summary &&
            data
              .map((it: any) => {
                const val = column.summary && it[column.dataIndex]
                return typeof val === 'number' ? val : Number(val)
              })
              .reduce((prev: number, cur: number) => {
                return prev + cur
              })) ||
          ''
      })
    }

    const totalRows = () => {
      // this.columns = columns.map(column => {
      //   const { customRender, ...rest } = column;
      //   return rest;
      // });
      return renderRows([totalRow], 0)
    }
    return (
      <tbody class="a-table-total-row">
      {this.$slots.default?.()}
      {data.length > 0 && totalRows()}
      </tbody>
    )
  }
})
