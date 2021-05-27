<template>
  <Scrollbar>
    <div class="view-area" @contextmenu.prevent="handleContextmenu">
      <div
        ref="panelRef"
        class="view-area-panel relative"
        :style="panelStyle"
        @drop="handleDrag"
        @dragover.prevent
        @dragenter="handleDragenter"
        @dragleave="handleDragleave"
      >
        <!-- 拖拽组件 -->
        <draggable
          v-for="item in pointData"
          :key="item.uuid"
          class="view-item"
          :uuid="item.uuid"
          :style="pointStyle[item.uuid]"
          :hover="curState.hover === item.uuid"
          :select="curState.select === item.uuid"
          @dragleave.stop
          @contextmenu.stop.prevent
          @on-end="handleMoveEnd"
          @on-move="handleMove"
          @on-start="handleMoveStart"
          @mouseenter="mouseenter(item.uuid)"
          @mouseleave="mouseleave"
        >
          <component :is="`${item.name}-point`" :uuid="item.uuid" :title="item.uuid" />
        </draggable>

        <!-- 标线 -->
        <mark-line
          :uuid="curState.uuid"
          :move="curState.pos"
          :is-move="curState.isMove"
          @on-suck="setPointTransform"
        />
      </div>
    </div>
  </Scrollbar>
</template>

<script lang="ts">
import type { PointInfo } from '/@/lib/interface/PointInfo'
import { defineComponent, computed, reactive, CSSProperties, ref, unref } from 'vue'
import { Scrollbar } from '/@/components/Scrollbar'
import { pointList } from '../../components/tools/index'
import { buildUUID } from '/@/utils/uuid'
import { Draggable } from '/@/lib/UI/'
import { pointStore } from '/@/store/modules/point'
import { schemaList } from '../../components/tools/schema'
import markLine from '../../components/mark-line.vue'
import { assign, cloneDeep } from 'lodash-es'
import { handleStore } from './utils'

interface CurState {
  // 选择鼠标指针浮动在其上的元素
  hover?: string
  // 设置选中
  select?: string
  // 是否移动
  isMove?: boolean
  // 唯一值
  uuid?: string
  // 当前位置
  pos?: Pick<PointInfo, 'x' | 'y' | 'width' | 'height'>
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
    const pointData = computed(() => pointStore.getPointState)
    // 拖拽数据样式
    const pointStyle = reactive<Indexable<CSSProperties>>({})
    // 当前状态
    const curState = reactive<CurState>({})
    // ref
    const panelRef = ref<HTMLElement | null>(null)

    // 在一个拖动过程中，释放鼠标键时触发此事件
    function handleDrag(event: DragEvent) {
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
      pointStore.commitAddPointState(schema)
    }

    //  初始化样式
    function initPointStyle(uuid: string, { x, y, width: w, height: h }: PointInfo) {
      pointStyle[uuid] = {}
      const { clientHeight: cH, clientWidth: cW } = panelRef.value!
      const width = x! + w! > cW ? cW - x! : w
      const height = y! + h! > cH ? cH - y! : h
      setPointStyle({ uuid, key: 'transform', value: `translate(${x}px,${y}px)` })
      setPointStyle({ uuid, key: 'width', value: `${width}px` })
      setPointStyle({ uuid, key: 'height', value: `${height}px` })

      return { width, height }
    }

    // 当被鼠标拖动的对象进入其容器范围内时触发此事件
    function handleDragenter() {
      panelStyle.opacity = 0.7
    }

    // 当被鼠标拖动的对象离开其容器范围内时触发此事件
    function handleDragleave() {
      panelStyle.opacity = 1
    }

    // 处理移动
    function handleMove({ uuid, x, y, type }: Move) {
      const mapState = {
        mouse: () => {
          const pos = handlePosition({ x, y }, uuid)
          // 记录位置
          curState.pos = pos
          // 设置样式
          setPointTransform({ uuid, x: pos.x, y: pos.y })
        },
        ew: () => {
          const { width } = handleWidth({ x }, uuid)
          // 设置样式
          setPointStyle({ uuid, key: 'width', value: `${width}px` })
        },
        ns: () => {
          const { height } = handleHeight({ y }, uuid)
          // 设置样式
          setPointStyle({ uuid, key: 'height', value: `${height}px` })
        },
        se: () => {
          mapState['ns']()
          mapState['ew']()
        }
      }
      mapState[type]()
    }

    // 处理移动结束
    function handleMoveEnd({ uuid, x, y, type }: Move) {
      // 设置鼠标弹起
      curState.isMove = false
      curState.uuid = ''

      const mapState = {
        mouse: () => {
          // 没有移动不更新
          if (x === 0 && y === 0) return
          // 更新数据
          handleStore('u', { uuid, key: 'x', value: curState.pos?.x })
          handleStore('u', { uuid, key: 'y', value: curState.pos?.y })
        },
        ew: () => {
          const { width } = handleWidth({ x }, uuid)
          // 检查大小
          validSize({ key: 'width', value: width })
        },
        ns: () => {
          const { height } = handleHeight({ y }, uuid)
          // 检查大小
          validSize({ key: 'height', value: height })
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
      curState.isMove = true
      // 判断移动的类型
      curState.uuid = uuid
      // 传递数据
      setSelectPoint(uuid)
    }

    // 处理 宽度
    function handleWidth(pos: { x: number }, uuid: string) {
      const { clientWidth } = panelRef.value!
      const point = unref(pointData).find((el) => el.uuid === uuid)
      const x = point?.x || 0
      let width = (point?.width || 0) + pos.x
      width = x + width > clientWidth ? clientWidth - x : width

      return { width, height: point?.height, x: point?.x, y: point?.y }
    }
    // 处理 高度
    function handleHeight(pos: { y: number }, uuid: string) {
      const { clientHeight } = panelRef.value!
      const point = unref(pointData).find((el) => el.uuid === uuid)
      const y = point?.y || 0
      let height = (point?.height || 0) + pos.y
      height = y + height > clientHeight ? clientHeight - y : height

      return { height, width: point?.width, x: point?.x, y: point?.y }
    }

    // 位置信息处理
    function handlePosition(pos: { x: number; y: number }, uuid: string) {
      const { clientHeight, clientWidth } = panelRef.value!
      const point = unref(pointData).find((el) => el.uuid === uuid)
      const width = point?.width
      const height = point?.height
      let x = pos.x + (point?.x || 0)
      let y = pos.y + (point?.y || 0)
      x = x > clientWidth - width! ? clientWidth - width! : x <= 0 ? 0 : x
      y = y > clientHeight - height! ? clientHeight - height! : y <= 0 ? 0 : y

      return { x, y, width, height }
    }

    // 设置样式
    function setPointStyle(options: { uuid: string; key: string; value: string }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (pointStyle[options.uuid]! as any)[options.key] = options.value
    }

    // 设置 transform
    function setPointTransform({ uuid, x, y }: { uuid: string; x: number; y: number }) {
      curState.pos!.x = x <= 0 ? 0 : x
      curState.pos!.y = y <= 0 ? 0 : y
      const key = 'transform'
      const value = `translate(${curState.pos!.x}px,${curState.pos!.y}px)`
      setPointStyle({ uuid, key, value })
    }

    // 处理鼠标进入
    function mouseenter(uuid: string) {
      !curState.isMove && (curState.hover = uuid)
    }

    // 处理鼠标离开
    function mouseleave() {
      !curState.isMove && (curState.hover = '')
    }

    // 设置数据
    function setSelectPoint(uuid: string) {
      // 传递数据
      emit('on-click-point', { uuid })
      // 设置选中
      curState.select = uuid
    }

    // 右键
    function handleContextmenu() {
      setSelectPoint('')
    }

    return {
      panelRef,
      curState,
      pointData,
      pointStyle,
      panelStyle,
      mouseenter,
      mouseleave,
      handleMove,
      handleMoveEnd,
      handleMoveStart,
      handleDrag,
      handleDragenter,
      handleDragleave,
      handleContextmenu,
      setPointTransform
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

  &-panel {
    width: 90%;
    min-height: 100%;
    background: #fff;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  }

  .view-item {
    border: 1px solid transparent;
    box-sizing: border-box;

    &[hover='true'] {
      cursor: move;
      border-color: @primary-color;
    }

    &[select='true'] {
      border-color: @primary-color;
    }
  }
}
</style>
