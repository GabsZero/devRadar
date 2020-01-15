module.exports = function parseStringAsArray(stringAsArray){
    return stringAsArray.split(',').map(string => string.trim())
}