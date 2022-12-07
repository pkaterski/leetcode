// https://leetcode.com/problems/wildcard-matching

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  const dp = []
  for (let i = 0; i < p.length + 1; i++) {
    const arr = []
    for (let j = 0; j < s.length + 1; j++) {
      if (j === s.length ) {
        if (i === p.length || p[i] === '*')
          arr.push(1)
        else
          arr.push(0)
      } else {
        if (i === p.length)
          arr.push(0)
        else
          arr.push(null)
      }
    }
    dp.push(arr)
  }

  // fix * last column problem
  for (let i = p.length - 1; i >= 0; i--) {
    if (p[i] === '*')
      dp[i][s.length] = dp[i + 1][s.length] === 1 ? 1 : 0
  }

  for (let i = p.length - 1; i >= 0; i--) {
    for (let j = s.length - 1; j >= 0; j--) {
      if (p[i] === '*') {
        let foundOne = false
        for (let k = j; k < s.length + 1; k++) {
          if (dp[i + 1][k] === 1) {
            foundOne = true
            break
          }
        }
        dp[i][j] = foundOne ? 1 : 0
      } else if (p[i] === '?' || p[i] === s[j]) {
        dp[i][j] = dp[i + 1][j + 1] // diagonal check
      } else {
        dp[i][j] = 0
      }
    }
  }

  return dp[0][0] === 1
};

console.log(isMatch("aa", "a*a"))

