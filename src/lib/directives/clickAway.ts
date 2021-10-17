import type { App, DirectiveBinding, ComponentPublicInstance } from 'vue';

type DocumentHandler = <T extends MouseEvent>(mouseup: T, mousedown: T) => void;
type FlushList = Map<
  HTMLElement,
  {
    documentHandler: DocumentHandler;
    bindingFn: (...args: unknown[]) => unknown;
  }[]
>;

type Popper = ComponentPublicInstance<{ popper: HTMLNULL }>;

const nodeList: FlushList = new Map();

let startClick: MouseEvent;

document.addEventListener('mousedown', (e: MouseEvent) => {
  startClick = e;
});

document.addEventListener('mouseup', (e) => {
  for (const handlers of nodeList.values()) {
    for (const { documentHandler } of handlers) {
      documentHandler(e, startClick);
    }
  }
});

function createDocumentHandler(el: HTMLElement, binding: DirectiveBinding): DocumentHandler {
  return function (mouseup, mousedown) {
    const popper = (binding.instance as Popper).popper;

    const upTarget = mouseup.target as Node;
    const downTarget = mousedown.target as Node;

    const isBound = !binding?.instance;

    const isContainedByEl = el.contains(upTarget) || el.contains(downTarget);

    const isContainedByPopper = popper?.contains(upTarget) || popper?.contains(downTarget);

    const isSelf = el === upTarget;

    if (isSelf || isBound || isContainedByEl || isContainedByPopper) return;

    binding.value(mouseup, mousedown);
  };
}

export default function (app: App): void {
  app.directive('click-away', {
    beforeMount(el: HTMLElement, binding: DirectiveBinding) {
      if (!nodeList.has(el)) {
        nodeList.set(el, []);
      }

      nodeList.get(el)!.push({
        documentHandler: createDocumentHandler(el, binding),
        bindingFn: binding.value
      });
    },

    updated(el: HTMLElement, binding: DirectiveBinding) {
      if (!nodeList.has(el)) {
        nodeList.set(el, []);
      }

      const handlers = nodeList.get(el) ?? [];
      const oldHandlerIndex = handlers.findIndex((item) => item.bindingFn === binding.oldValue);
      const newHandler = {
        documentHandler: createDocumentHandler(el, binding),
        bindingFn: binding.value
      };

      if (oldHandlerIndex >= 0) {
        handlers.splice(oldHandlerIndex, 1, newHandler);
      } else {
        handlers.push(newHandler);
      }
    },
    unmounted(el: HTMLElement) {
      nodeList.delete(el);
    }
  });
}
