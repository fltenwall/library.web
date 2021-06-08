declare interface ChangeEvent extends Event {
  target: HTMLInputElement
}

interface Mouse extends MouseEvent {
  button: 0 | 1 | 2
}
