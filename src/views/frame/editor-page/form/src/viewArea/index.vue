<template>
  <Scrollbar>
    <div class="view-area">
      <div
        ref="panelRef"
        class="view-area-panel relative"
        :style="panelStyle"
        @drop="handleDrag"
        @dragover.prevent
        @dragenter="handleDragenter"
        @dragleave="handleDragleave"
        @contextmenu.prevent="handleCancelSelect"
      >
        <!-- 拖拽组件 -->
        <draggable
          v-for="item in pointData"
          :key="item.uuid"
          class="view-item"
          :uuid="item.uuid"
          :style="pointStyle[item.uuid]"
          :move="dataItem.isMove"
          :hover="dataItem.hover === item.uuid"
          :select="pointUUID === item.uuid"
          @dragleave.stop
          @on-end="handleMoveEnd"
          @on-move="handleMove"
          @on-start="handleMoveStart"
          @mouseenter="mouseenter(item.uuid)"
          @mouseleave="mouseleave"
        >
          <component :is="`${item.name}-point`" v-bind="item" />
        </draggable>

        <!-- 标线 -->
        <mark-line
          :uuid="dataItem.uuid"
          :move="dataItem.scope"
          :is-move="dataItem.state === 'move'"
          @on-suck="handlePointSuck"
        />

        <!-- 拖拽显示 -->
        <div
          v-show="dataItem.state === 'move'"
          class="resize-item"
          :style="{
            width: `${dataItem.pos?.width}px`,
            height: `${dataItem.pos?.height}px`,
            transform: `translate(${dataItem.pos?.x}px,${dataItem.pos?.y}px)`
          }"
        />
      </div>
    </div>
  </Scrollbar>
</template>

<script lang="ts">
import type { PointInfo } from '/@/lib/interface/PointInfo'
import { defineComponent, computed, reactive, CSSProperties, ref } from 'vue'
import { Scrollbar } from '/@/components/Scrollbar'
import { pointList } from '../../components/tools/index'
import { buildUUID } from '/@/utils/uuid'
import { Draggable } from '/@/lib/UI/'
import { pointStore } from '/@/store/modules/point'
import { schemaList } from '../../components/tools/schema'
import markLine from '../../components/mark-line.vue'
import { assign, cloneDeep } from 'lodash-es'
import { handleStore, limitRules } from './utils'

interface DataItem {
  // 选择鼠标指针浮动在其上的元素
  hover?: string
  // 是否移动
  isMove?: boolean
  // 状态
  state?: 'start' | 'end' | 'move'
  // 唯一值
  uuid?: string
  // 当前位置
  pos?: Pick<PointInfo, 'x' | 'y' | 'width' | 'height'>
  // 移动中位置
  scope?: Pick<PointInfo, 'x' | 'y' | 'width' | 'height'>
}

interface Move {
  // 唯一值
  uuid: string
  // 类型
  type: 'mouse' | 'ew' | 'ns' | 'se'
  // 相对位移
  x: number
  y: number
}

export default defineComponent({
  components: { Scrollbar, Draggable, ...pointList, markLine },
  emits: ['on-click-point'],
  setup(_props, { emit }) {
    // 面板样式
    const panelStyle = reactive<CSSProperties>({})
    // 拖拽数据信息
    const pointData = computed(() => pointStore.getPointDataState)
    // 拖拽数据样式
    const pointStyle = computed(() => pointStore.getPointStyleState)
    // 选中数据
    const pointUUID = computed({
      set: (uuid) => pointStore.commitUpdatePointUUIDState({ uuid }),
      get: () => pointStore.getPointUUIDState
    })
    // 当前状态
    const dataItem = reactive<DataItem>({})
    // ref
    const panelRef = ref<HTMLElement | null>(null)

    const limit = limitRules(panelRef)

    //  初始化样式
    function initPointStyle(uuid: string, { x, y, width: w, height: h }: PointInfo) {
      const { clientHeight: cH, clientWidth: cW } = panelRef.value!
      const width = x! + w! > cW ? cW - x! : w
      const height = y! + h! > cH ? cH - y! : h
      setPointStyle({ uuid, key: 'transform', value: `translate(${x}px,${y}px)` })
      setPointStyle({ uuid, key: 'width', value: `${width}px` })
      setPointStyle({ uuid, key: 'height', value: `${height}px` })

      return { width, height }
    }

    // 处理移动
    function handleMove({ uuid, x, y, type }: Move) {
      const mapState = {
        mouse: () => {
          const { pos, scope } = limit.limitPosition({ x, y }, uuid)
          // 记录位置
          dataItem.pos = pos
          dataItem.scope = scope
          // 设置样式
          setPointTransform({ uuid, x: scope.x!, y: scope.y! })
        },
        ew: () => {
          const pos = limit.limitSize({ x }, uuid)
          // 记录位置
          dataItem.pos = pos
          // 设置样式
          setPointStyle({ uuid, key: 'width', value: `${pos.width}px` })
        },
        ns: () => {
          const pos = limit.limitSize({ y }, uuid)
          // 记录位置
          dataItem.pos = pos
          // 设置样式
          setPointStyle({ uuid, key: 'height', value: `${pos.height}px` })
        },
        se: () => {
          const pos = limit.limitSize({ y, x }, uuid)
          // 记录位置
          dataItem.pos = pos
          // 设置样式
          setPointStyle({ uuid, key: 'width', value: `${pos.width}px` })
          setPointStyle({ uuid, key: 'height', value: `${pos.height}px` })
        }
      }
      mapState[type]()
      // 设置状态
      dataItem.state = 'move'
    }

    // 处理移动结束
    function handleMoveEnd({ uuid, x, y, type }: Move) {
      // 设置鼠标弹起
      dataItem.state = 'end'
      dataItem.isMove = false
      dataItem.uuid = ''

      const mapState = {
        mouse: () => {
          // 更新数据
          handleStore('u', { uuid, key: 'x', value: dataItem.pos?.x })
          handleStore('u', { uuid, key: 'y', value: dataItem.pos?.y })
          // 样式更新
          setPointTransform({ uuid, x: dataItem.pos!.x!, y: dataItem.pos!.y! })
        },
        ew: () => {
          const { width } = limit.limitSize({ x }, uuid)
          // 检查大小
          validSize({ key: 'width', value: width! })
        },
        ns: () => {
          const { height } = limit.limitSize({ y }, uuid)
          // 检查大小
          validSize({ key: 'height', value: height! })
        },
        se: () => {
          mapState['ns']()
          mapState['ew']()
        }
      }
      // 检测大小
      function validSize({ key, value }: { key: string; value: number }) {
        // 宽高 小于 10 表示删除 否则就是更新数据
        if (value < 10) {
          // 删数数据
          handleStore('d', { uuid })
        } else {
          // 更新数据
          handleStore('u', { uuid, key, value })
        }
      }
      mapState[type]()
    }

    // 处理移动开始
    function handleMoveStart({ uuid }: { uuid: string; type: string }) {
      // 设置鼠标按下
      dataItem.state = 'start'
      dataItem.isMove = true
      // 判断移动的类型
      dataItem.uuid = uuid
      // 传递数据
      setSelectPoint(uuid)
    }

    // 设置样式
    function setPointStyle(options: { uuid: string; key: string; value: string }) {
      pointStore.commitUpdatePointStyle(options)
    }

    // 设置 transform
    function setPointTransform({ uuid, x, y }: { uuid: string; x: number; y: number }) {
      const key = 'transform'
      const value = `translate(${x}px,${y}px)`
      setPointStyle({ uuid, key, value })
    }

    // 处理 组件吸附
    function handlePointSuck({}: { uuid: string; x: number; y: number }) {
      // dataItem.pos!.x = x <= 0 ? 0 : x
      // dataItem.pos!.y = y <= 0 ? 0 : y
    }

    const mouseEvent = {
      // 处理鼠标进入
      mouseenter(uuid: string) {
        dataItem.hover = uuid
      },
      // 处理鼠标离开
      mouseleave() {
        dataItem.hover = ''
      }
    }

    // 拖拽事件
    const dragEvent = {
      // 在一个拖动过程中，释放鼠标键时触发此事件
      handleDrag(event: DragEvent) {
        // 清除透明样式
        panelStyle.opacity = 1
        // 获取传来的数据
        const { name, offset } = JSON.parse(event.dataTransfer?.getData('tool') || '')
        // 获取数据位置
        const { offsetX, offsetY } = event
        // 计算位置 设置中间对齐
        const x = offsetX + offset.x
        const y = offsetY + offset.y
        // 唯一值
        const uuid = buildUUID()
        const schema = cloneDeep(schemaList[name])
        // 合并
        assign(schema, { x, y, uuid, name })
        // 初始化样式
        const { width, height } = initPointStyle(uuid, schema)
        schema.width = width
        schema.height = height
        // 传递数据
        setSelectPoint(uuid)
        // 添加数据
        pointStore.commitAddPointData(schema)
      },

      // 当被鼠标拖动的对象进入其容器范围内时触发此事件
      handleDragenter() {
        panelStyle.opacity = 0.7
      },

      // 当被鼠标拖动的对象离开其容器范围内时触发此事件
      handleDragleave() {
        panelStyle.opacity = 1
      }
    }

    // 设置数据
    function setSelectPoint(uuid: string) {
      // 传递数据
      emit('on-click-point')
      // 设置选中
      pointUUID.value = uuid
    }

    // 右键
    function handleCancelSelect() {
      setSelectPoint('')
    }

    return {
      panelRef,
      dataItem,
      pointUUID,
      pointData,
      pointStyle,
      panelStyle,
      ...dragEvent,
      ...mouseEvent,
      handleMove,
      handleMoveEnd,
      handleMoveStart,
      handlePointSuck,
      handleCancelSelect
    }
  }
})
</script>

<style lang="less" scoped>
.view-area {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 70px 0 70px;
  margin: 0 300px 0 240px;

  &-panel {
    width: 90%;
    min-height: 100%;
    background: #fff;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  }

  .view-item {
    z-index: 2;
    border: 2px solid transparent;
    box-sizing: border-box;
    transition: all 0.2s ease;

    &[hover='true'] {
      cursor: move;
      border-color: @primary-color;
    }

    &[select='true'] {
      border-color: @primary-color;
    }

    &[move='true'] {
      transition: none;
    }
  }

  .resize-item {
    position: absolute;
    z-index: 1;
    background: #ffccc7;
    opacity: 0.6;
  }
}
</style>
