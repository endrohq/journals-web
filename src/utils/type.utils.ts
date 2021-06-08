export const isArrayWithElements = (arr: any[]) => {
  return arr && Array.isArray(arr) && arr.length > 0
}

export const isObjectWithFields = (obj: object) => {
  return typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0
}

export const arrayContains = (arr: any[], val: any) => arr.includes(val)
