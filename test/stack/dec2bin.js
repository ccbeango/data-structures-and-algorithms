const Stack = require('../../lib/Stack')

/**
 * 栈应用 十进制转二进制
 */
function dec2bin(decNumber) {
  const stack = new Stack()

  let remainer

  while (decNumber) {
    remainer = decNumber % 2
    decNumber = Math.floor(decNumber / 2)

    stack.push(remainer)
  }

  let binStr = ""

  while(!stack.isEmpty()) {
    binStr += stack.pop()
  }
  return binStr 
}

/**
 * 拼接字符串
 * @param {*} decNumber 
 * @returns 
 */
function dec2bin2(decNumber) {
  let binStr = ""

  let remainer
  while (decNumber) {
    remainer = decNumber % 2
    decNumber = Math.floor(decNumber / 2)

    binStr = `${remainer}${binStr}`
  }

  return binStr 
}

console.log(dec2bin(10))
console.log(dec2bin(14))
console.log(dec2bin(233))

console.log(dec2bin2(10))
console.log(dec2bin2(14))
console.log(dec2bin2(233))