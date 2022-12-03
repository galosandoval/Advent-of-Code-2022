import fs from 'fs'

// choice points: {rock: 1, paper: 2, scissors: 3}
// round points: {lose: 0, draw: 3, win: 6}

type Rules = {
  win: 'X' | 'Y' | 'Z'
  draw: 'X' | 'Y' | 'Z'
  lose: 'X' | 'Y' | 'Z'
}

const roundPoints = {
  win: 6,
  draw: 3,
  lose: 0
}

const opponentMoveInfo: { [opponent: string]: Rules } = {
  A: { win: 'Y', draw: 'X', lose: 'Z' },
  B: { win: 'Z', draw: 'Y', lose: 'X' },
  C: { win: 'X', draw: 'Z', lose: 'Y' }
}
const myMoveInfo = {
  X: 'lose',
  Y: 'draw',
  Z: 'win'
}

const movePoints = {
  X: 1,
  Y: 2,
  Z: 3
}

const getMyTotalScore = (guide: [string, string][]) => {
  let myPoints = 0

  for (const [opponent, response] of guide) {
    const objective = myMoveInfo[response]
    const guidePoints = roundPoints[objective]

    myPoints += guidePoints
    myPoints += movePoints[opponentMoveInfo[opponent][objective]]
  }

  return myPoints
}

try {
  const data = fs.readFileSync('day-2.txt', 'utf8')
  const input = data.split('\n')
  const guide: [string, string][] = input.map((pair) => {
    const split = pair.split(' ')
    return [split[0], split[1]]
  })

  const totalScore = getMyTotalScore(guide)
  console.log(totalScore)
} catch (e) {
  console.log('Error:', e.stack)
}

// First part
// type Rules = {
//   winningResponse: 'X' | 'Y' | 'Z'
//   drawResponse: 'X' | 'Y' | 'Z'
// }

// const roundPoints = {
//   win: 6,
//   draw: 3,
//   loss: 0
// }

// const opponentMoveInfo: { [opponent: string]: Rules } = {
//   A: { winningResponse: 'Y', drawResponse: 'X' },
//   B: { winningResponse: 'Z', drawResponse: 'Y' },
//   C: { winningResponse: 'X', drawResponse: 'Z' }
// }
// const myMoveInfo = {
//   X: 1,
//   Y: 2,
//   Z: 3
// }

// const getMyTotalScore = (guide: [string, string][]) => {
//   let myPoints = 0
//   for (const [opponent, response] of guide) {
//     myPoints += myMoveInfo[response]
//     const { winningResponse, drawResponse } = opponentMoveInfo[opponent]
//     if (winningResponse === response) {
//       myPoints += roundPoints.win
//     } else if (drawResponse === response) {
//       myPoints += roundPoints.draw
//     } else {
//       myPoints += roundPoints.loss
//     }
//   }
//   return myPoints
// }

// try {
//   const data = fs.readFileSync('day-two.txt', 'utf8')
//   const input = data.split('\n')
//   const guide: [string, string][] = input.map((pair) => {
//     const split = pair.split(' ')
//     return [split[0], split[1]]
//   })

//   const totalScore = getMyTotalScore(guide)
//   console.log(totalScore)
// } catch (e) {
//   console.log('Error:', e.stack)
// }
