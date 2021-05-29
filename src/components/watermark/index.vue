<template>
  <div
    style="position: relative;"
    :class="wrapperCls"
  >
    <slot/>
    <div
      v-if="!disabled"
      :class="waterMarkCls"
      :style="{
        zIndex,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundSize: `${gapX + width}px`,
        pointerEvents: 'none',
        backgroundRepeat: 'repeat',
        backgroundImage: `url('${base64Url}')`,
        ...markStyle,
      }"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, ref, watchEffect } from 'vue'
import { injectProProvider } from '@/components'

/**
 * 获取像素比例
 * @param context
 */
function getPixelRatio (context: any): number {
  if (!context) return 1
  const backingStore = context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1
  return (window.devicePixelRatio || 1) / backingStore
}

export default defineComponent({
  name: 'Watermark',
  props: {
    /** 是否禁用水印 */
    disabled: {
      type: Boolean,
      default: false
    },
    /** 水印样式 */
    markStyle: {
      type: Object,
      default: () => {}
    },
    /** 水印类名 */
    markClassName: {
      type: String,
      default: ''
    },
    /** 水印之间的水平间距 */
    gapX: {
      type: Number,
      default: 212
    },
    /** 水印之间的垂直间距 */
    gapY: {
      type: Number,
      default: 222
    },
    /** 追加的水印元素的z-index */
    zIndex: {
      type: Number,
      default: 999
    },
    /** 水印的宽度 */
    width: {
      type: Number,
      default: 120
    },
    /** 水印的高度 */
    height: {
      type: Number,
      default: 64
    },
    /** 水印在canvas 画布上绘制的垂直偏移量，正常情况下，水印绘制在中间位置, 即 offsetTop = gapY / 2 */
    offsetTop: {
      type: Number,
      default: 0
    },
    /** 水印在canvas 画布上绘制的水平偏移量, 正常情况下，水印绘制在中间位置, 即 offsetTop = gapX / 2 */
    offsetLeft: {
      type: Number,
      default: 0
    },
    /** 水印绘制时，旋转的角度，单位 ° */
    rotate: {
      type: Number,
      default: -22
    },
    /** 类名前缀 */
    prefixCls: {
      type: String,
      default: ''
    },
    /** 高清印图片源, 为了高清屏幕显示，建议使用 2倍或3倍图，优先使用图片渲染水印。 */
    image: {
      type: String,
      default: ''
    },
    /** 水印文字内容 */
    content: {
      type: String,
      default: ''
    },
    /** 文字颜色 */
    fontColor: {
      type: String,
      default: ''
    },
    /** 文字样式 */
    fontStyle: {
      type: String as PropType<'none' | 'normal' | 'italic' | 'oblique'>,
      default: 'normal'
    },
    /** 文字族 */
    fontFamily: {
      type: String,
      default: 'sans-serif'
    },
    /** 文字粗细 */
    fontWeight: {
      type: [String, Number],
      default: 'normal'
    },
    /** 文字大小 */
    fontSize: {
      type: [String, Number],
      default: 14
    }
  },
  setup (props) {
    const { getPrefixCls } = injectProProvider()
    const prefixCls = props.prefixCls || getPrefixCls('water-mark')
    const wrapperCls = computed(() => `${prefixCls}-wrapper`)
    const waterMarkCls = computed(() => {
      return {
        [`${prefixCls}`]: prefixCls,
        [`${props.markClassName}`]: props.markClassName
      }
    })
    const base64Url = ref('')
    const isRealDark = inject('isRealDark', ref(false))
    const color = computed(() => {
      if (props.fontColor) {
        return props.fontColor
      } else {
        return isRealDark.value ? 'rgba(255, 255, 255, .15)' : 'rgba(0,0,0,.15)'
      }
    })

    watchEffect(() => {
      if (props.disabled) return
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const ratio = getPixelRatio(ctx)

      const canvasWidth = `${(props.gapX + props.width) * ratio}px`
      const canvasHeight = `${(props.gapY + props.height) * ratio}px`
      const canvasOffsetLeft = props.offsetLeft || props.gapX / 2
      const canvasOffsetTop = props.offsetTop || props.gapY / 2

      canvas.setAttribute('width', canvasWidth)
      canvas.setAttribute('height', canvasHeight)

      if (ctx) {
        // 旋转字符 rotate
        ctx.translate(canvasOffsetLeft * ratio, canvasOffsetTop * ratio)
        ctx.rotate((Math.PI / 180) * Number(props.rotate))
        const markWidth = props.width * ratio
        const markHeight = props.height * ratio

        if (props.image) {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.referrerPolicy = 'no-referrer'
          img.src = props.image
          img.onload = () => {
            ctx.drawImage(img, 0, 0, markWidth, markHeight)
            base64Url.value = canvas.toDataURL()
          }
        } else if (props.content) {
          const markSize = Number(props.fontSize) * ratio
          ctx.font = `${props.fontStyle} normal ${props.fontWeight} ${markSize}px/${markHeight}px ${props.fontFamily}`
          ctx.fillStyle = color.value
          ctx.fillText(props.content, 0, 0)
          base64Url.value = canvas.toDataURL()
        }
      } else {
        console.error('当前环境不支持Canvas')
      }
    })

    return {
      wrapperCls,
      waterMarkCls,
      base64Url
    }
  }
})
</script>
