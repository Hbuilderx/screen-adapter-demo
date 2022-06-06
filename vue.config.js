const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 8081 // dev port

module.exports={
	publicPath: '', //dev ./   prod /
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: false,//process.env.NODE_ENV === 'development',
	productionSourceMap: false,
	devServer: {	  
	  port: port,
	  open: true,
	  overlay: {
	    warnings: false,
	    errors: true
	  },
		proxy: {
		  '/api': {     //这里最好有一个 /
			target: '58.210.9.131:8280',  // 后台接口域名
			ws: true,        //如果要代理 websockets，配置这个参数
			secure: false,  // 如果是https接口，需要配置这个参数
			changeOrigin: true,  //是否跨域
			pathRewrite:{
			  '^/api':''
			}
		  }
		},
	},
	configureWebpack: {
	  // provide the app's title in webpack's name field, so that
	  // it can be accessed in index.html to inject the correct title.
	  name: "数字孪生平台",
	  resolve: {
	    alias: {
	      '@': resolve('src')
	    }
	  }
	},
	css:{
		//全局配置utils.scss
		loaderOptions:{
			sass:{
				 prependData:`@import "@/styles/utils.scss";`
			}
		}
	}
}