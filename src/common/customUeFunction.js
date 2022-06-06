/**
 * 文件说明
 * @Author: zhuds
 * @Description: 自定义UE4函数,独立于mapmost-ue之外
 * @Date: 1/19/2022, 5:04:37 PM
 * @LastEditDate: 1/19/2022, 5:04:37 PM
 * @LastEditor:
 */

function ue4Func(functionName, data = {}){
  ue4("CustomFunction", {functionName, data})
}

//切换天气
function changeWeather (data = {}) {
    ue4Func('ChangeWeather', data)
}

//切换季节
function changeSeason (data = {}) {
    ue4Func('ChangeSeason', data)
}

//切换时间
function changeTime (data = {}) {
    ue4Func('ChangeTime', data)
}



export {
    ue4Func,
    changeWeather,
    changeSeason,
    changeTime
}
