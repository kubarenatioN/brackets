module.exports = check

function checkDeep(str, index, bracketsConfig) {
  isEnd = true
  f = false
  res = false
  bracketsConfig.forEach(el => {
    if (str[index] == el[0]) {
      f = true
    }
  })
  if (f) {
    [res, end, index] = checkDeep(str, index + 1, bracketsConfig)
  }
  else {
    isSimetry = false
    bracketsConfig.forEach(el => {
      if (str[index] == el[1] && str[str.substr(0, index*2).length - 1 - index] == el[0]) isSimetry = true
    })

    // isSimetryArr = []
    // for (let i = 0; i < index; i++) {
    //   isSimetryArr[i] = false
    // }
    // for (let i = index - 1; i >= 0; i--) {
    //   bracketsConfig.forEach((el, bracketsIndex) => {
    //     if (str[i] == el[0] && str[str.substr(0, index * 2).length - 1 - i] == el[1]) {
    //       isSimetryArr[i] = true
    //     }
    //   })
    // }
    // let isSimetry = true
    // isSimetryArr.forEach(el => {
    //   if (el == false) {
    //     isSimetry = false
    //   }
    // })
    if (index * 2 != str.length) {
      isEnd = false
    }
    return [isSimetry, isEnd, index * 2]
  }
  return [res, end, index]
}

function check(str, bracketsConfig) {
  if (str.length % 2 == 1) {
    return false
  }

  let siblingBrackets = []
  bracketsConfig.forEach(el => {
    if (el[0] == el[1]) {
      siblingBrackets.push(el)
    }
  })
  siblingBrackets.forEach(el => {
    for (let i = 0; i < str.length - 1;) {
      if (str[i] == el[0] && str[i + 1] == el[0]) {
        str = str.substring(0, i) + str.substring(i + 2)
      }
      else {
        i++
      }
    }
  })
  if (str.length == 0) {
    return true
  }
  let res = checkDeep(str, 0, bracketsConfig)
  if (!res[1] && res[0]) {
    res = checkDeep(str.substr(res[2]), 0, bracketsConfig)
  }
  return res[0]
}