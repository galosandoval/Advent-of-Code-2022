import fs from 'fs'

const file = fs.readFileSync('day-4.txt', 'utf8')
const splitFile = file.split('\n').map((pair) => pair.split(','))
const input = splitFile.map((pair) => {
  const toReturn: [number, number][] = []
  for (const section of pair) {
    const split = section.split('-')
    const parsed = split.map((string) => parseInt(string))
    toReturn.push(parsed as [number, number])
  }

  return toReturn
})

const findDuplicateAssignments = (input: [number, number][][]) => {
  let duplicateCount = 0

  for (const assignments of input) {
    let firstPair = assignments[0]
    let secondPair = assignments[1]

    if (firstPair[1] - firstPair[0] < secondPair[1] - secondPair[0]) {
      const temp = secondPair
      secondPair = firstPair
      firstPair = temp
    }
    if (firstPair[0] <= secondPair[0] && firstPair[1] >= secondPair[1]) {
      duplicateCount++
    }
  }
  return duplicateCount
}

// Part 2
const findOverlapAssignments = (input: [number, number][][]) => {
  let overlapCount = 0

  for (const assignments of input) {
    let smallerPair = assignments[0]
    let greaterPair = assignments[1]

    if (smallerPair[0] > greaterPair[0]) {
      const temp = smallerPair
      smallerPair = greaterPair
      greaterPair = temp
    }

    if (!(smallerPair[1] < greaterPair[0])) {
      overlapCount++
    }
  }
  return overlapCount
}

console.log(findOverlapAssignments(input))
