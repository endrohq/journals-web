function _arrayBufferToString(buf: any) {
  return Buffer.from(buf).toString('hex');
}

export const normalize = (input: object) => {
  const obj = { ...input };
  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (obj[property] instanceof Uint8Array) {
        obj[property] = _arrayBufferToString(obj[property]);
      } else if (typeof obj[property] === 'bigint') {
        obj[property] = obj[property]?.toString();
      } else if (Array.isArray(obj[property])) {
        obj[property] = obj[property].map((item: any) =>
          typeof item === 'object' ? normalize(item) : item
        );
      } else if (typeof obj[property] === 'object') {
        if (obj[property]?.type === 'Buffer') {
          obj[property] = _arrayBufferToString(obj[property].data);
        } else {
          obj[property] = normalize(obj[property]);
        }
      }
    }
  }
  return obj;
};
