module.exports = check

function check(str, bracketsConfig) {
  const bracketPairs = bracketsConfig.map(pair => pair.join(''))
  for (let i = 0; i < bracketPairs.length; ) {
    if (str.includes(bracketPairs[i])) {
      str = str.replace(bracketPairs[i], '')
      i = 0
    }
    else i++
  }
  return str === ''
}