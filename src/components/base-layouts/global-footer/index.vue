<template>
  <a-layout-footer style="padding: 0;">
    <div class="custom-render ant-pro-global-footer">
      <div class="ant-pro-global-footer-links">
        <slot name="links">
          <a href="https://www.antdv.com" target="_blank">Ant Design Vue</a>
          <a title="github" target="_blank" href="https://github.com/vueComponent/ant-design-vue">
            <span role="img" aria-label="github" class="anticon anticon-github">
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                class=""
                data-icon="github"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
                ></path>
              </svg>
            </span>
          </a>
        </slot>
      </div>
      <div class="ant-pro-global-footer-copyright">
        <slot name="copyright">
          Copyright
          <span role="img" aria-label="copyright" class="anticon anticon-copyright">
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              class=""
              data-icon="copyright"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm5.6-532.7c53 0 89 33.8 93 83.4.3 4.2 3.8 7.4 8 7.4h56.7c2.6 0 4.7-2.1 4.7-4.7 0-86.7-68.4-147.4-162.7-147.4C407.4 290 344 364.2 344 486.8v52.3C344 660.8 407.4 734 517.3 734c94 0 162.7-58.8 162.7-141.4 0-2.6-2.1-4.7-4.7-4.7h-56.8c-4.2 0-7.6 3.2-8 7.3-4.2 46.1-40.1 77.8-93 77.8-65.3 0-102.1-47.9-102.1-133.6v-52.6c.1-87 37-135.5 102.2-135.5z"
              ></path>
            </svg>
          </span>
          wkl
        </slot>
      </div>
    </div>
  </a-layout-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GlobalFooter'
})
</script>

<style lang="less">
@import "~@/assets/styles/variables";

.@{pro-global-footer-prefix-cls} {
  margin: 48px 0 24px 0;
  padding: 0 16px;
  text-align: center;

  &-links {
    margin-bottom: 8px;

    a {
      color: @text-color-secondary;
      transition: all 0.3s;

      &:not(:last-child) {
        margin-right: 25px;
      }

      &:hover {
        color: @text-color;
      }
    }
  }

  &-copyright {
    color: @text-color-secondary;
    font-size: @font-size-base;
  }
}
</style>
