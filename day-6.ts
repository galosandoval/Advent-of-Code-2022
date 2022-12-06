import fs from 'fs'

const file = fs.readFileSync('day-6.txt', 'utf8')

// Part 1 => 4 distinct chars
// Part 2
const DISTINCT_CHARS = 14

const findStartOfPacket = (datastream: string) => {
  const charDict = createWindow(datastream)
  for (let i = DISTINCT_CHARS; i < datastream.length; i++) {
    console.log(charDict)
    if (Object.values(charDict).every((num) => num === 1)) {
      console.log(i)
      return i
    }
    const char = datastream[i]
    if (!(char in charDict)) {
      charDict[char] = 0
    }
    charDict[char]++
    const charToRemove = datastream[i - DISTINCT_CHARS]
    if (charDict[charToRemove] === 1) {
      delete charDict[charToRemove]
    } else {
      charDict[charToRemove]--
    }
  }
}

const createWindow = (datastream: string) => {
  const charDict: { [char: string]: number } = {}

  for (let i = 0; i < DISTINCT_CHARS; i++) {
    const char = datastream[i]
    if (!(char in charDict)) {
      charDict[char] = 0
    }
    charDict[char]++
  }
  return charDict
}

findStartOfPacket(file)
