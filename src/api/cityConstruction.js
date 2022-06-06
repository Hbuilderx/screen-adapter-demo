import request from '@/utils/request'


//已建项目
const getBuiltProject = (data) => {
  return request({
    url: '/jone-map-wztaihu/data-api/dynamicExecuteClient/CX1647568416962',
    method: 'post',
    data
  })
}

//在建项目
const getUnderBuildProject = (data) => {
  return request({
    url: '/jone-map-wztaihu/data-api/dynamicExecuteClient/CX1647568469583',
    method: 'post',
    data
  })
}

//拟建项目
const getUnderPlanProject = (data) => {
  return request({
    url:'/jone-map-wztaihu/data-api/dynamicExecuteClient/CX1647568518588',
    method: 'post',
    data
  })
}

//在建项目面积排行
const getUnderBuildProjectArea = (data) => {
  return request({
    url:  '/jone-map-wztaihu/data-api/dynamicExecuteClient/CX1647573165754',
    method: 'post',
    data
  })
}

export {
  getBuiltProject,
  getUnderBuildProject,
  getUnderPlanProject,
  getUnderBuildProjectArea
}