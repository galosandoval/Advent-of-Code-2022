import fs from 'fs'

export class MaxHeap {
  heap: number[]

  constructor(array: number[]) {
    this.heap = this.buildHeap(array)
  }

  private buildHeap(array: number[]) {
    const firstParentIdx = Math.floor((array.length - 2) / 2)

    for (let i = firstParentIdx; i >= 0; i--) {
      this.siftDown(i, array.length - 1, array)
    }

    return array
  }

  private siftDown(startIdx: number, endIdx: number, heap: number[]) {
    let childOneIdx = startIdx * 2 + 1

    while (childOneIdx <= endIdx) {
      let childTwoIdx = startIdx * 2 + 2 <= endIdx ? startIdx * 2 + 2 : -1

      let idxToSwap: number
      if (childTwoIdx !== -1 && heap[childOneIdx] < heap[childTwoIdx]) {
        idxToSwap = childTwoIdx
      } else {
        idxToSwap = childOneIdx
      }
      if (heap[idxToSwap] > heap[startIdx]) {
        this.swap(idxToSwap, startIdx, heap)
        startIdx = idxToSwap
        childOneIdx = startIdx * 2 + 1
      } else {
        break
      }
    }
  }

  private siftUp(currentIdx: number, heap: number[]) {
    let parentIdx = this.getParentIdx(currentIdx)
    while (heap[parentIdx] < heap[currentIdx] && currentIdx > 0) {
      this.swap(parentIdx, currentIdx, heap)
      currentIdx = parentIdx
      parentIdx = this.getParentIdx(currentIdx)
    }
  }

  private getParentIdx(childIdx: number) {
    return Math.floor((childIdx - 1) / 2)
  }

  peek() {
    return this.heap[0]
  }

  remove() {
    let endIdx = this.heap.length - 1
    this.swap(0, endIdx, this.heap)
    const nodeRemoved = this.heap.pop()

    this.siftDown(0, endIdx - 1, this.heap)

    return nodeRemoved
  }

  insert(value: number) {
    this.heap.push(value)
    let i = this.heap.length - 1
    this.siftUp(i, this.heap)
  }

  private swap(i: number, j: number, heap: number[]) {
    const temp = heap[i]
    heap[i] = heap[j]
    heap[j] = temp
  }
}

try {
  const data = fs.readFileSync('day-one.txt', 'utf8')
  const input = data.split('\n')

  const flattenedCalories = parseCalories(input)
  const heap = new MaxHeap(flattenedCalories)
  const first = heap.remove()!
  const second = heap.remove()!
  const third = heap.remove()!
  console.log(first + second + third)
} catch (e) {
  console.log('Error:', e.stack)
}

function parseCalories(stringArr: string[]) {
  const calories: number[] = []

  let currentTotalCalories = 0
  for (const current of stringArr) {
    if (!!parseInt(current)) {
      currentTotalCalories += parseInt(current)
    } else {
      calories.push(currentTotalCalories)
      currentTotalCalories = 0
    }
  }
  return calories
}
