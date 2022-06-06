/**
 判断是否为对象
 **/
export const isObject = (value) => {
	const type = typeof value
	return value !== null && (type === 'object' || type === 'function')
}


/**
 引用类型合并合并
 **/
export const merge  = (source, other) => {
	if (!isObject(source) || !isObject(other)) {
	    return other === undefined ? source : other
	  }
	  // 合并两个对象的 key，另外要区分数组的初始值为 []
	  return Object.keys({
	    ...source,
	    ...other
	  }).reduce((acc, key) => {
	    // 递归合并 value
	    acc[key] = merge(source[key], other[key])
	    return acc
	  }, Array.isArray(source) ? [] : {})

}


//引用类型深拷贝
export const deepClone = (origin) => {
	   var isObject = any => typeof any == 'object' && any != null
	    var isArray = any => Object.prototype.toString.call(any) === '[object Array]'
	    if(!isObject(origin)) return origin
	    var target = isArray(origin) ? [] : {}
	    for (var prop in origin) {
	        if (origin.hasOwnProperty(prop)) {
	            var value = origin[prop]
	            if(isObject(value)){
	                target[prop] = deepClone(value)
	            }else{
	                target[prop] = value
	            }
	        }
	    }
	    return target
}

/* 生成指定长度的UUID */
export const genUuid2 = (len, radix) => {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}


/* 对象数组去重
 适用于一层的对象数组，根据对象里面特定的key去重
 *[
	 {id:1},
	 {id:2},
	 {id:1}
 ]
 */

export const uniqueObjArray = (array, key) => {
	let result = [];
	let obj = {};
	for(let i =0; i<array.length; i++){
		if(!obj[array[i][key]]){
			result.push(array[i]);
			obj[array[i][key]] = true;
		}
	}

	return result;
}


/*
 Echarts图表宽高自适应
 传入图表的父容器以及图表实例
 */
export const  fitChart =(container, chart) => {
		function getStyle(el)
		{
			if (window.getComputedStyle) {
				return window.getComputedStyle(el, null);
			} else {
				return el.currentStyle;
			}
		}
		let elWidth = getStyle(container).width || 300;
		let elHeight = getStyle(container).height || 300;
		chart.style.height = elHeight;
		chart.style.width = elWidth;
}

/* Echarts图表单位自适应 */
export const fitChartSize = (size,defalteWidth = 1920) => {
		let clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
		if (!clientWidth) return size/2;
		let scale = (clientWidth / defalteWidth);
		return Number((size/2*scale).toFixed(3));
}
export const fitChartSizeVh = (size,defalteHeight = 1976) => {
		let clientHeight = window.innerHeight||document.documentElement.clientHeight||document.body.clientheight;
		if (!clientHeight) return size/2;
		let scale = (clientHeight / defalteHeight);
		return Number((size/2*scale).toFixed(3));
}

/* Mock参数转为对象 */
export const  param2Obj = (url) => {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}
