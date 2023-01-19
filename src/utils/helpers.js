export const groupByProperty = (items, key) => {
	const groupingArray = key.split('.')

  return items.reduce(
  (result, item) => ({
    ...result,
    [item[groupingArray[0]][groupingArray[1]][groupingArray[2]]]: [
      ...(result[item[groupingArray[0]][groupingArray[1]][groupingArray[2]]] || []),
      item,
    ],
  }), 
  {},
  );
}

export const uniqBy = (arr, predicate) => {
  const cb = typeof predicate === 'function' ? predicate : (o) => o[predicate];
  
  return [...arr.reduce((map, item) => {
    const key = (item === null || item === undefined) ? 
      item : cb(item);
    
    map.has(key) || map.set(key, item);
    
    return map;
  }, new Map()).values()];
};