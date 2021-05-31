import { cloneDeep } from 'lodash-es'
// 由于对象是 浅拷贝, 需要数据 与 原数据脱离关系

/**
 * 节点类型
 */
class Node<T> {
  // 元素对象本身的值
  element: T | null = null
  // 指向前一项
  prev: Node<T> | null = null
  // 指向下一项
  next: Node<T> | null = null
  constructor(element: T | null = null) {
    this.element = element
  }
}

export default class LinkedList<T> {
  // 头部节点
  private head: Node<T>
  // 尾部节点
  private tail: Node<T>
  // 当前节点
  private _current: Node<T> | null = null

  constructor() {
    this.head = new Node<T>()
    this.tail = new Node<T>()

    // 初始化,头节点尾接点
    this.head.next = this.tail
    this.tail.prev = this.head
  }
  // 删除数据
  private remove(node: Node<T>) {
    // 把当前节点的 prev、next 都存起来
    const prev = node.prev
    const next = node.next
    // 将前一个节点指向 node 的后一个节点
    node.prev!.next = next
    // 把后一个节点的 prev 指向 node 的前一个节点
    next!.prev = prev
  }

  // 获取当前节点
  get current(): Node<T> | null {
    return this._current
  }

  // 是否可以后退
  get isUndo(): boolean {
    return !!this.current
  }

  // 是否可以前进
  get isRedo(): boolean {
    if (!this.current) {
      return !!this.head.next?.next
    }
    return !!this.current?.next?.next
  }

  // 添加数据 从当前节点添加 尾部抛弃
  add(element: T): void {
    if (!this._current) {
      // 为空 重新初始化
      this.head.next = this.tail
      this.tail.prev = this.head
      // 判断为空, 从尾部添加
      this.push(element)
    } else {
      const node = new Node<T>(cloneDeep(element))
      // 中间添加, 将尾部抛弃 next 指向尾节点
      node.next = this.tail
      node.prev = this._current

      this.tail.prev = node
      this._current.next = node

      this._current = node
    }
  }
  // 后退
  undo(): Node<T> | null {
    if (!this._current) {
      return null
    }
    if (this.current?.prev?.prev) {
      // 判断是否第 0 个
      this._current = this._current.prev
    } else {
      this._current = null
    }
    return this._current
  }
  // 前进
  redo(): Node<T> | null {
    if (!this._current) {
      if (this.head?.next?.next) {
        this._current = this.head.next
        return this._current
      }
      return null
    }
    this._current = this._current.next
    return this._current
  }
  // 尾部添加
  push(element: T): void {
    const node = new Node<T>(cloneDeep(element))
    node.next = this.tail
    node.prev = this.tail.prev

    // 把原来的上一个的下一个指向 当前
    this.tail.prev!.next = node
    // 未接点的上一个指向当前
    this.tail.prev = node
    // 设置当前节点
    this._current = node
  }
  // 头部添加
  unshift(element: T): void {
    const node = new Node<T>(cloneDeep(element))
    node.next = this.head.next
    node.prev = this.head

    // 把原来的上一个的下一个指向 当前
    this.head.next!.prev = node
    // 头接点的上一个指向当前
    this.head.next = node
    // 设置当前节点
    this._current = node
  }
  // 尾部删除
  pop(): void {
    const node = this.tail.prev
    this.remove(node!)
    this._current = this.tail.prev!
  }
  // 头部删除
  shift(): void {
    const node = this.head.next
    this.remove(node!)
    this._current = this.head.next!
  }
  // 查找
  find(index: number): T | null {
    let node = this.head.next
    for (let i = 0; i < index; i++) {
      node = node!.next
    }

    return node!.element
  }
}
