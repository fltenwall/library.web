<template>
  <!-- eslint-disable vue/no-v-html -->
  <div v-for="item in dataSource" :key="item.id" class="search-list-box">
    <div>
      <div class="header">
        <router-link class="header-link" :to="'/search/' + item.id" v-html="highlight(item.name)" />
      </div>
      <div class="main">
        <div class="main-box">
          <span class="box-title">作者</span>
          <span class="box-content" v-html="highlight(item.author)" />
        </div>
        <div class="main-box">
          <span class="box-title">出版社</span>
          <span class="box-content" v-html="highlight(item.publisher)" />
        </div>
        <div class="main-box">
          <span class="box-title">出版时间</span>
          <span class="box-content">{{ item.publicationTime }}</span>
        </div>
        <div class="main-box">
          <span class="box-title">描述</span>
          <span class="box-content" v-html="highlight(item.description || '没有找到任何描述信息')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Search } from '/@/api/search'
import xss from 'xss'
import { isString } from '/@/utils/is'

export default defineComponent({
	props: {
		dataSource: {
			type: Object as PropType<Search>,
			default: () => ({})
		},
		searchValue: {
			type: String,
			default: ''
		}
	},
	setup() {
		// 高亮
		function highlight(value: string) {
			if (!isString(value)) return
			let result = xss(value, { whiteList: {} })

			return result.replace(/&lt;em data="([^"]+)"&gt;&lt;\/em&gt;/g, '<em>$1</em>')
		}

		return { highlight }
	}
})
</script>

<style lang="less" scoped>
.search-list-box {
	display: flex;
	margin: 0 0 30px 0;

	::v-deep(em) {
		font-style: normal;
		color: red;
	}

	.header {
		&-link {
			font-size: 16px;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	.main {
		&-box {
			font-size: 14px;
			line-height: 30px;

			.box-title {
				color: #333;

				&::after {
					margin: 0 5px 0 3px;
					content: ':';
				}
			}

			.box-content {
				color: #555;
			}
		}
	}
}
</style>
