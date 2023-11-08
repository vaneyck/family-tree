export const getPersonPath = function (uuid: string) {
  return `/users/${uuid}/persons`;
};

export const getRelationsPath = function (uuid: string) {
  return `/users/${uuid}/relations`;
};
