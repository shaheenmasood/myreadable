export const arrayToObject = (array, keyField) =>
   array.reduce((obj, item) => {
     obj[item[keyField]] = item
     return obj
   }, {})

export const BASE_URL = `${process.env.REACT_APP_BACKEND}`