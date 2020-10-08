export const getAssetImage = asset => {
  return require(`./${asset}.svg`);
};
