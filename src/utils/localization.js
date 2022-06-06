/* 
 本地数据存储
 */

export const saveToLocal=(name,content)=> {
  if(!name){
    return
  }
  if(typeof content!=="string"){
    content=JSON.stringify(content)
  }
  window.localStorage.setItem(name,content)
  
}

/* 
 本地数据获取
 */
export  const getFromLocal=(name)=> {
  if(!name){
    return
  }else{
    return window.localStorage.getItem(name)
  }
}

/* 
 本地数据删除
 */

export  const removeFromLocal=(name)=> {
  if(!name){
    return
  }else{
		//console.log(name)
    window.localStorage.removeItem(name)
  }
}
