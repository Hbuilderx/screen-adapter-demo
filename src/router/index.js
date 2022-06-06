import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const showRoutes = [



	{
		path: "/dashboard",
		name: "dashboard",
		redirect: "/building",
		component: () => import("../views/Dashboard/index.vue"), // 总览
		meta: {title: '全局总览', index: 1},
		children: [
			{
				path: "/building",
				name: "building",
				component: () => import("../views/Dashboard/Building/Building.vue"), // 总览
				meta: {title: '大厦总览',index: 1},
			},
			{
				path: "/around",
				name: "around",
				component: () => import("../views/Dashboard/Around/Around.vue"), // 总览
				meta: {title: '周边可视化',index: 2},
			},
			{
				path: "/region",
				name: "region",
				component: () => import("../views/Dashboard/Region/Region.vue"), // 总览
				meta: {title: '功能区域可视化',index: 3},
			},
		]

	},
	{
		path: "/operation-manage",
		name: "operation-manage",
		redirect: "/iot",
		component: () => import("../views/OperationManage/index.vue"),  // 数字运营管理
		meta: {title: '数字运营管理',index: 2},
		children: [
			{
				path: "/iot",
				name: "iot",
				component: () => import("../views/OperationManage/IOT/IOT.vue"), // 总览
				meta: {title: '物联监测',index: 1},
			},
		]
	},
	{
		path: "/industrial-develop",
		name: "industrial-develop",
		redirect: "/industry",
		component: () => import("../views/IndustrialDevelop/index.vue"),  // 数字产业发展
		meta: {title: '数字产业发展',index: 3},
		children: [
			{
				path: "/industry",
				name: "industry",
				component: () => import("../views/IndustrialDevelop/Industry/Industry.vue"),
				meta: {title: '产业发展',index: 1},
			},
		]
	},
]

const routes = [
	{
		path: '/',
		redirect: "/dashboard",
	},
	...showRoutes,
  	{ path: '*', redirect: '/', hidden: true }
  

]

const router = new VueRouter({
  routes
})
export {
	showRoutes
}

export default router
