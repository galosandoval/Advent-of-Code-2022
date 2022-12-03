import fs from 'fs'

// const input = [
//   'vJrwpWtwJgWrhcsFMMfFFhFp',
//   'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
//   'PmmdzqPrVvPwwTWBwg',
//   'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
//   'ttgJtRGJQctTZtZT',
//   'CrZsJsPPZsGzwwsLwLmpwMDw'
// ]

// const lowerRange = 'az'
// console.log('a', lowerRange.charCodeAt(0))
// console.log('z', lowerRange.charCodeAt(1))
// const higherRange = 'AZ'
// console.log('A', higherRange.charCodeAt(0))
// console.log('Z', higherRange.charCodeAt(1))

// const getSumOfPriorities = (ruckSacks: string[]) => {
//   const priorities = findPriorities(ruckSacks)
//   let sum = 0
//   for (const priority of priorities) {
//     const code = priority.charCodeAt(0)
//     if (code >= 97 && code <= 122) {
//       const toAdd = code - 96
//       sum += toAdd
//     }
//     if (code >= 65 && code <= 90) {
//       const toAdd = code - 64 + 26
//       sum += toAdd
//     }
//   }
//   console.log('sum', sum)
// }

// function findPriorities(ruckSacks: string[]) {
//   const priorities: string[] = []
//   for (const ruckSack of ruckSacks) {
//     const half = ruckSack.length / 2
//     const first = ruckSack.slice(0, half)
//     const second = ruckSack.slice(half)

//     const priorityDict: { [priority: string]: boolean } = {}
//     for (const char of first) {
//       if (!(char in priorityDict)) {
//         priorityDict[char] = false
//       }
//     }
//     for (const char of second) {
//       if (char in priorityDict && !priorityDict[char]) {
//         priorityDict[char] = true
//         priorities.push(char)
//       }
//     }
//   }
//   return priorities
// }

// try {
//   const data = fs.readFileSync('day-3.txt', 'utf8')
//   const input = data.split('\n')
//   getSumOfPriorities(input)
// } catch (e) {
//   console.log('Error:', e.stack)
// }

const getSumOfPriorities = (ruckSacks: string[]) => {
  const badges = findBadges(ruckSacks)
  let sum = 0
  console.log('badges', badges)

  for (const priority of badges) {
    const code = priority.charCodeAt(0)
    if (code >= 97 && code <= 122) {
      const toAdd = code - 96
      sum += toAdd
    }
    if (code >= 65 && code <= 90) {
      const toAdd = code - 64 + 26
      sum += toAdd
    }
  }
  console.log('sum', sum)
}

type ItemOccurences = { [item: string]: number }

function findBadges(ruckSacks: string[]) {
  const badges: string[] = []
  let itemDict: ItemOccurences = {}
  let group = 1
  for (const ruckSack of ruckSacks) {
    console.log('itemDict', itemDict)

    for (const item of ruckSack) {
      if (!(item in itemDict)) {
        itemDict[item] = 0
      }
      if (itemDict[item] === group - 1) {
        itemDict[item]++
      }
    }

    group++

    if (group > 3) {
      for (const item in itemDict) {
        if (itemDict[item] === 3) {
          badges.push(item)
        }
      }
      itemDict = {}
      group = 1
    }
  }
  return badges
}

const input = [
  'vJrwpWtwJgWrhcsFMMfFFhFp',
  'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
  'PmmdzqPrVvPwwTWBwg',
  'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
  'ttgJtRGJQctTZtZT',
  'CrZsJsPPZsGzwwsLwLmpwMDw'
]

try {
  const data = fs.readFileSync('day-3.txt', 'utf8')
  const input = data.split('\n')
  getSumOfPriorities(input)
} catch (e) {
  console.log('Error:', e.stack)
}
