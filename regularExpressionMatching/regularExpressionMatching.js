// https://leetcode.com/problems/regular-expression-matching

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  const p_ = [...p].reduce((acc, val) => {
    if (val === '*')
      return [...acc.slice(0, -1), acc.slice(-1)[0] + val]
    else
      return [...acc, val]
  }, [])

  const dp = []
  for (let i = 0; i < p_.length + 1; i++) {
    const arr = []
    for (let j = 0; j < s.length + 1; j++) {
      if (j === s.length ) {
        if (i === p_.length || p_[i].includes('*'))
          arr.push(1)
        else
          arr.push(0)
      } else {
        if (i === p_.length)
          arr.push(0)
        else
          arr.push(null)
      }
    }
    dp.push(arr)
  }

  // fix * last column problem
  for (let i = p_.length - 1; i >= 0; i--) {
    if (p_[i].includes('*'))
      dp[i][s.length] = dp[i + 1][s.length] === 1 ? 1 : 0
  }

  for (let i = p_.length - 1; i >= 0; i--) {
    for (let j = s.length - 1; j >= 0; j--) {
      if (p_[i].includes('*')) {
        const currMatch = p_[i][0] === '.' || s[j] === p_[i][0]
        //const nextMatch = j + 1 < s.length ? s[j + 1] === p_[i][0] : true
        if ( p_[i][1] === '*' && dp[i + 1][j] === 1 || currMatch && (dp[i + 1][j + 1] === 1 || dp[i][j + 1] === 1) )
          dp[i][j] = 1
        else
          dp[i][j] = 0
      } else if (p_[i] === '.' || p_[i] === s[j]) {
        dp[i][j] = dp[i + 1][j + 1] // diagonal check
      } else {
        dp[i][j] = 0
      }
    }
  }

  //console.log(p_)
  //console.log(dp)
  return dp[0][0] === 1
};

console.log(isMatch("ab", ".*"))
console.log(isMatch("abaa", "ab*a*"))
console.log(isMatch("abba", "ab*."))
console.log(isMatch("abba", "ab*.c"))

