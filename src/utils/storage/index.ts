import type { CreateStorage } from './Storage'
import { createStorage as create } from './Storage'

const createOptions = (storage = sessionStorage) => {
  return {
    storage
  }
}

export const createStorage = (storage: Storage = sessionStorage): CreateStorage => {
  return create(createOptions(storage))
}
