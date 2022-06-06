import {fitChartSize} from "@/utils/dataUtil.js"

export const basicOption = {
		legend: {
			show:false
		},
		tooltip: {},
		dataset: {
		},
		xAxis: { type: 'category' },
		yAxis: {},
	  series: [
			{ type: 'bar', seriesLayoutBy: 'row' },
			{ type: 'bar', seriesLayoutBy: 'row' },
			{ type: 'bar', seriesLayoutBy: 'row' },
		]
}