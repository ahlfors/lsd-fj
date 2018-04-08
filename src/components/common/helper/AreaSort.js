/**
 * 给指定的地市排序
 * @param propertyName
 * @returns {Function}
 */

function areaSort(propertyName) {
  return function(object1, object2) {
    let regionMap = { '福州': 1, '福州市': 1, '厦门': 2, '厦门市': 2, '宁德': 3, '宁德市': 3, '莆田': 4, '莆田市': 4, '泉州市': 5, '漳州市': 6, '龙岩市': 7, '三明市': 8, '南平市': 9, '泉州': 5, '漳州': 6, '龙岩': 7, '三明': 8, '南平': 9 };
    let value1 = regionMap[object1[propertyName]];
    let value2 = regionMap[object2[propertyName]];
    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  }
}

export default areaSort;
