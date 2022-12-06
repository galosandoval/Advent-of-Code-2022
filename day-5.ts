import fs from 'fs'

const file = fs.readFileSync('day-5.txt', 'utf8')

type Procedure = {
  move: number
  from: number
  to: number
}

const inputProcedure = file.split('\n').map((procedure) => {
  const content = procedure.split(' ')
  return {
    move: parseInt(content[1]),
    from: parseInt(content[3]),
    to: parseInt(content[5])
  }
})

type Stack = {
  [stack: number]: string[]
}

const inputStacks = {
  1: ['B', 'S', 'V', 'Z', 'G', 'P', 'W'],
  2: ['J', 'V', 'B', 'C', 'Z', 'F'],
  3: ['V', 'L', 'M', 'H', 'N', 'Z', 'D', 'C'],
  4: ['L', 'D', 'M', 'Z', 'P', 'F', 'J', 'B'],
  5: ['V', 'F', 'C', 'G', 'J', 'B', 'Q', 'H'],
  6: ['G', 'F', 'Q', 'T', 'S', 'L', 'B'],
  7: ['L', 'G', 'C', 'Z', 'V'],
  8: ['N', 'L', 'G'],
  9: ['J', 'F', 'H', 'C']
}

const getTopCratesAfterProcedure = (stacks: Stack, procedure: Procedure[]) => {
  const rearranged = rearrangeCrates(stacks, procedure)
  const stacksLength = Object.keys(stacks).length

  let topCrates = ''
  for (let stackId = 1; stackId < stacksLength + 1; stackId++) {
    const stack = rearranged[stackId]
    const length = stack.length

    topCrates += stack[length - 1]
  }
  console.log(topCrates)
}

function rearrangeCrates(stacks: Stack, procedure: Procedure[]) {
  for (const step of procedure) {
    const toRemoveLength = stacks[step.from].length - step.move
    const removed = stacks[step.from].splice(toRemoveLength)

    stacks[step.to].push(...removed.reverse())
  }

  return stacks
}

// Part 2

function rearrangeCratesReversed(stacks: Stack, procedure: Procedure[]) {
  for (const step of procedure) {
    const toRemoveLength = stacks[step.from].length - step.move
    const removed = stacks[step.from].splice(toRemoveLength)

    stacks[step.to].push(...removed)
  }

  return stacks
}

getTopCratesAfterProcedure(inputStacks, inputProcedure)
