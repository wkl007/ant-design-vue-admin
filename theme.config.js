const less = require('less')
const { getLessOptions } = require('less-loader/dist/utils')
const { getThemeVariables } = require('ant-design-vue/dist/theme')

const themeConfig = [
  {
    theme: 'dark',
    htmlThemeAttr: 'dark',
    modifyVars: { ...getThemeVariables({ dark: true }), 'text-color': 'fade(@white, 65%)' }
  }
]

async function additionalData (content, loaderContext) {
  const themePromises = themeConfig.map(async t => {
    const { htmlThemeAttr, modifyVars = {} } = t
    const options = getLessOptions(loaderContext, {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars
      }
    })
    try {
      const { css } = await less.render(content, options)
      let res = ''
      if (htmlThemeAttr && css) {
        res = `
        [theme=${htmlThemeAttr}] {
          ${css}
        }
        `
      }
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(content)
    }
  })
  let res = content
  for (const themePromise of themePromises) {
    const theme = await themePromise
    res += theme
  }
  return res
}

module.exports = {
  themeConfig,
  additionalData
}
