export function ConvertStringToHex(str: string) {
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    arr[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return "\\u" + arr.join("\\u");
}

/**
 * Converts an array buffer to a string
 *
 * @private
 * @param {ArrayBuffer} buf The buffer to convert
 * @param {Function} callback The function to call when conversion is complete
 */

export function _arrayBufferToString(buf: any) {
  return Buffer.from(buf).toString('hex')
}
