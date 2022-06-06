
const weatherData = [
  {title:'晴天',value:'Sunlight'},
  {title:'阴天',value:'Cloudy'},
  {title:'雨天',value:'Rain'},
  {title:'雪天',value:'Snow'},
]
const seasonData = [
  {title:'晴天',value:'Sunlight'},
  {title:'阴天',value:'Cloudy'},
  {title:'雨天',value:'Rain'},
  {title:'雪天',value:'Snow'},
]

const timeData = [
  {title:'早上',value:'早上'},
  {title:'中午',value:'中午'},
  {title:'傍晚',value:'傍晚'},
  {title:'黑夜',value:'黑夜'},
]

const _roamData = [
  {
    location: [106.45018768310547, 29.51715660095215, 223.9580535888672],
    rotation: [0, -36.57720184326172, 51.07158279418945],
    time:3
  },
  {
    location: [106.45001220703125, 29.513347625732422, 233.78604125976562],
    rotation: [0, -38.508506774902344, -48.007728576660156],
    time:3
  },
  {
    location: [106.45430755615234, 29.513919830322266, 313.9778137207031],
    rotation: [0, -49.41191864013672, -144.8321075439453],
    time:3
  },
  {
    location: [106.45401763916016, 29.51737403869629, 256.0672302246094],
    rotation: [0, -37.0806770324707, 129.01907348632812],
    time:3
  }
]

const menuData = [
  {menu: 'roma', name: '漫游'},
  {menu: 'time', name: '昼夜'},
  {menu: 'weather', name: '天气'},
  {menu: 'season', name: '四季'}
]

//漫游路线
const roamData = [
  {
    name: '路线一',
    data: [
      {
        location: [106.45018768310547, 29.51715660095215, 223.9580535888672],
        rotation: [0, -36.57720184326172, 51.07158279418945],
        time:3
      },
      {
        location: [106.45001220703125, 29.513347625732422, 233.78604125976562],
        rotation: [0, -38.508506774902344, -48.007728576660156],
        time:3
      },
      {
        location: [106.45430755615234, 29.513919830322266, 313.9778137207031],
        rotation: [0, -49.41191864013672, -144.8321075439453],
        time:3
      },
      {
        location: [106.45401763916016, 29.51737403869629, 256.0672302246094],
        rotation: [0, -37.0806770324707, 129.01907348632812],
        time:3
      }
    ]
  },
  {
    name: '路线二',
    data: [
      {
        location: [106.45018768310547, 29.51715660095215, 223.9580535888672],
        rotation: [0, -36.57720184326172, 51.07158279418945],
        time:3
      },
      {
        location: [106.45001220703125, 29.513347625732422, 233.78604125976562],
        rotation: [0, -38.508506774902344, -48.007728576660156],
        time:3
      },
      {
        location: [106.45430755615234, 29.513919830322266, 313.9778137207031],
        rotation: [0, -49.41191864013672, -144.8321075439453],
        time:3
      },
      {
        location: [106.45401763916016, 29.51737403869629, 256.0672302246094],
        rotation: [0, -37.0806770324707, 129.01907348632812],
        time:3
      }
    ]
  },
  {
    name: '路线三',
    data: [
      {
        location: [106.45018768310547, 29.51715660095215, 223.9580535888672],
        rotation: [0, -36.57720184326172, 51.07158279418945],
        time:3
      },
      {
        location: [106.45001220703125, 29.513347625732422, 233.78604125976562],
        rotation: [0, -38.508506774902344, -48.007728576660156],
        time:3
      },
      {
        location: [106.45430755615234, 29.513919830322266, 313.9778137207031],
        rotation: [0, -49.41191864013672, -144.8321075439453],
        time:3
      },
      {
        location: [106.45401763916016, 29.51737403869629, 256.0672302246094],
        rotation: [0, -37.0806770324707, 129.01907348632812],
        time:3
      }
    ]
  },
  {
    name: '路线四',
    data: [
      {
        location: [106.45018768310547, 29.51715660095215, 223.9580535888672],
        rotation: [0, -36.57720184326172, 51.07158279418945],
        time:3
      },
      {
        location: [106.45001220703125, 29.513347625732422, 233.78604125976562],
        rotation: [0, -38.508506774902344, -48.007728576660156],
        time:3
      },
      {
        location: [106.45430755615234, 29.513919830322266, 313.9778137207031],
        rotation: [0, -49.41191864013672, -144.8321075439453],
        time:3
      },
      {
        location: [106.45401763916016, 29.51737403869629, 256.0672302246094],
        rotation: [0, -37.0806770324707, 129.01907348632812],
        time:3
      }
    ]
  },

]


export {
  weatherData,
  seasonData,
  timeData,
  roamData,
  menuData
}
