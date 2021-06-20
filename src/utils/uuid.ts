const hexList: string[] = []
for (let i = 0; i <= 15; i++) {
  hexList[i] = i.toString(16)
}
export function buildUUID(): string {
  let uuid = ''
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += '-'
    } else if (i === 15) {
      uuid += 4
    } else if (i === 20) {
      uuid += hexList[(Math.random() * 4) | (0 + 8)]
    } else {
      uuid += hexList[(Math.random() * 16) | 0]
    }
  }
  return uuid
}

export function buildShortUUID(): string {
  let uuid = ''
  for (let i = 1; i <= 16; i++) {
    if (i === 5 || i === 12) {
      uuid += '-'
    } else {
      uuid += hexList[(Math.random() * 16) | 0]
    }
  }
  return uuid
}
