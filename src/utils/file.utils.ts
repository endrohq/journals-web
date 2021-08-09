export const isImage = (type: string) => {
  return ['PNG', 'JPG'].includes(type);
};

export const isVideo = (type: string) => {
  return ['MOV'].includes(type);
};
