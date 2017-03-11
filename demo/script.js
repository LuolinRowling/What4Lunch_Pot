var echarts = require('echarts');
require('./shine.js');
var topics = require('./mock.json');

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'), 'shine');

var option = {
    // title : {
    //     text: '人物关系：乔布斯',
    //     subtext: '数据来自人立方',
    //     x:'right',
    //     y:'bottom'
    // },
    tooltip : {
        trigger: 'item',
        formatter: '{a} : {b}'
    },
    toolbox: {
        show : true,
        feature : {
            restore : {show: true},
            magicType: {show: true, type: ['force', 'chord']},
            saveAsImage : {show: true}
        }
    },
    series : [
        {
            type:'graph',
            layout: 'force',
            name : "人物关系",
            draggable: true,
            hoverAnimation: true,
            focusNodeAdjacency: true,
            categories : [
                {
                    name: 'blue',
                    itemStyle: {
                        normal: {
                            color: "#4285F4"
                        },
                        emphasis: {
                            borderColor: 'rgba(66, 133, 244, 0.6)',
                            borderWidth: 3,
                            borderType: "solid",
                            shadowColor: 'rgba(66, 133, 244, 0.9)',
                            shadowBlur: 10
                        }
                    }
                },
                {
                    name: 'green',
                    itemStyle: {
                        normal: {
                            color: "#34A853"
                        },
                        emphasis: {
                            borderColor: 'rgba(52, 168, 83, 0.6)',
                            borderWidth: 3,
                            borderType: "solid",
                            shadowColor: 'rgba(52, 168, 83, 0.9)',
                            shadowBlur: 10
                        }
                    }
                },
                {
                    name: 'yellow',
                    itemStyle: {
                        normal: {
                            color: "#FBBC05"
                        },
                        emphasis: {
                            borderColor: 'rgba(251, 188, 5, 0.6)',
                            borderWidth: 3,
                            borderType: "solid",
                            shadowColor: 'rgba(251, 188, 5, 0.9)',
                            shadowBlur: 10
                        }
                    }                    
                },
                {
                    name: 'red',
                    itemStyle: {
                        normal: {
                            color: "#EA4335"
                        },
                        emphasis: {
                            borderColor: 'rgba(203, 36, 49, 0.6)',
                            borderWidth: 3,
                            borderType: "solid",
                            shadowColor: 'rgba(203, 36, 49, 0.9)',
                            shadowBlur: 10
                        }
                    }                    
                }         
            ],
            legendHoverLink: true,
            force: {
                edgeLength: [200, 300],
                gravity: 1.1
            },
            symbolSize: 50,
            itemStyle: {
                normal: {

                },
                emphasis: {
                    label: {
                        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    },
                    nodeStyle : {
                        r: 100
                    },
                    linkStyle : {}
                }
            },
            lineStyle: {
                normal: {
                    curveness: 0
                },
                emphasis: {
                    curveneww: 0
                }
            },
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#333'
                    }
                },
                emphasis: {
                    show: true
                }
            },
            minRadius : 50,
            maxRadius : 80,

            scaling: 1.1,
            roam: 'move',
            nodes:[
                {category:0, name: '乔布斯', value : 10, symbolSize: 200, label: '乔布斯\n（主要）'},
                {category:1, name: '丽萨-乔布斯', symbolSize: 60, value : 2},
                {category:1, name: '保罗-乔布斯', symbolSize: 50, value : 3},
                {category:1, name: '克拉拉-乔布斯',value : 3},
                {category:1, name: '劳伦-鲍威尔',value : 7},
                {category:2, name: '史蒂夫-沃兹尼艾克',value : 5},
                {category:2, name: '奥巴马',value : 8},
                {category:2, name: '比尔-盖茨',value : 9},
                {category:2, name: '乔纳森-艾夫',value : 4},
                {category:2, name: '蒂姆-库克',value : 4},
                {category:2, name: '龙-韦恩',value : 1},
            ],
            links : [
                {source : '丽萨-乔布斯', target : '乔布斯', value : 1, name: '女儿'},
                {source : '保罗-乔布斯', target : '乔布斯', value : 2, name: '父亲'},
                {source : '克拉拉-乔布斯', target : '乔布斯', value : 1, name: '母亲'},
                {source : '劳伦-鲍威尔', target : '乔布斯', value : 2},
                {source : '史蒂夫-沃兹尼艾克', target : '乔布斯', value : 3, name: '合伙人'},
                {source : '奥巴马', target : '乔布斯', value : 1},
                {source : '比尔-盖茨', target : '乔布斯', value : 6, name: '竞争对手'},
                {source : '乔纳森-艾夫', target : '乔布斯', value : 1, name: '爱将'},
                {source : '蒂姆-库克', target : '乔布斯', value : 1},
                {source : '龙-韦恩', target : '乔布斯', value : 1},
                {source : '克拉拉-乔布斯', target : '保罗-乔布斯', value : 1},
                {source : '奥巴马', target : '保罗-乔布斯', value : 1},
                {source : '奥巴马', target : '克拉拉-乔布斯', value : 1},
                {source : '奥巴马', target : '劳伦-鲍威尔', value : 1},
                {source : '奥巴马', target : '史蒂夫-沃兹尼艾克', value : 1},
                {source : '比尔-盖茨', target : '奥巴马', value : 6},
                {source : '比尔-盖茨', target : '克拉拉-乔布斯', value : 1},
                {source : '蒂姆-库克', target : '保罗-乔布斯', value : 1}
            ],
            animationDuration: 2000
        }
    ]
};

var nodes = [];

myChart.setOption(option);

//var ecConfig = require('echarts/config');
function focus(param) {
    var data = param.data;
    var links = option.series[0].links;
    var nodes = option.series[0].nodes;
    if (
        data.source !== undefined
        && data.target !== undefined
    ) { //点击的是边
        var sourceNode = nodes.filter(function (n) {return n.name == data.source})[0];
        var targetNode = nodes.filter(function (n) {return n.name == data.target})[0];
        console.log("选中了边 " + sourceNode.name + ' -> ' + targetNode.name + ' (' + data.weight + ')');
    } else { // 点击的是点
        console.log("选中了" + data.name + '(' + data.value + ')');
    }
}
myChart.on('click', focus)

// myChart.on(ecConfig.EVENT.FORCE_LAYOUT_END, function () {
//     console.log(myChart.chart.force.getPosition());
// });


                    
// // 绘制图表
// myChart.setOption({
//     title: { text: 'ECharts 入门示例' },
//     tooltip: {},
//     xAxis: {
//         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
//     },
//     yAxis: {},
//     series: [{
//         name: '销量',
//         type: 'bar',
//         data: [5, 20, 36, 10, 10, 20]
//     }]
// });