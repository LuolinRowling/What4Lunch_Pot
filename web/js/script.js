var echarts = require('echarts');
var topics = require('../mock.json');

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

var nodes = [],
    tempCount = 1;

var standardSize = 120,
    hotList = topics["SelfList"],
    maxHot = Object.keys(hotList)[0];

for (var topic in topics["SelfList"]) {
    console.log(topic)
    var obj = {
        category: tempCount % 5,
        name: topic,
        // symbolSize: standardSize * hotList[topic] / hotList[maxHot]
        symbolSize: standardSize - tempCount * 3
    }
    nodes.push(obj);
    tempCount++;
}

console.log(nodes)

var link = [],
    firstTopic = "",
    secondTopic = "",
    weightList = topics["EdgeWeight"];

for (firstTopic in weightList) {
    for (secondTopic in weightList[firstTopic]) {
        if (firstTopic == secondTopic) continue;
        var obj = {
            source: firstTopic,
            target: secondTopic,
            value: weightList[firstTopic][secondTopic] // value越大关系越近
        }
        link.push(obj);
    }
}

console.log(link);

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
            name : "Topic",
            draggable: true,
            hoverAnimation: true,
            focusNodeAdjacency: false,
            categories : [
                // {
                //     name: 'blue',
                //     itemStyle: {
                //         normal: {
                //             color: "#4285F4"
                //         },
                //         emphasis: {
                //             borderColor: 'rgba(66, 133, 244, 0.6)',
                //             borderWidth: 3,
                //             borderType: "solid",
                //             shadowColor: 'rgba(66, 133, 244, 0.9)',
                //             shadowBlur: 10
                //         }
                //     }
                // },
                // {
                //     name: 'green',
                //     itemStyle: {
                //         normal: {
                //             color: "#34A853"
                //         },
                //         emphasis: {
                //             borderColor: 'rgba(52, 168, 83, 0.6)',
                //             borderWidth: 3,
                //             borderType: "solid",
                //             shadowColor: 'rgba(52, 168, 83, 0.9)',
                //             shadowBlur: 10
                //         }
                //     }
                // },
                // {
                //     name: 'yellow',
                //     itemStyle: {
                //         normal: {
                //             color: "#FBBC05"
                //         },
                //         emphasis: {
                //             borderColor: 'rgba(251, 188, 5, 0.6)',
                //             borderWidth: 3,
                //             borderType: "solid",
                //             shadowColor: 'rgba(251, 188, 5, 0.9)',
                //             shadowBlur: 10
                //         }
                //     }                    
                // },
                // {
                //     name: 'red',
                //     itemStyle: {
                //         normal: {
                //             color: "#EA4335"
                //         },
                //         emphasis: {
                //             borderColor: 'rgba(203, 36, 49, 0.6)',
                //             borderWidth: 3,
                //             borderType: "solid",
                //             shadowColor: 'rgba(203, 36, 49, 0.9)',
                //             shadowBlur: 10
                //         }
                //     }                    
                // }        
                {
                    name: 'one',
                    itemStyle: {
                        normal: {
                            color: "rgba(36, 79, 117, 1)"
                        },
                        emphasis: {
                            borderColor: 'rgba(36, 79, 117, 0.6)',
                            borderWidth: 3,
                            borderType: "solid",
                            shadowColor: 'rgba(36, 79, 117, 0.9)',
                            shadowBlur: 10
                        }
                    }                    
                },
                {
                    name: 'two',
                    itemStyle: {
                        normal: {
                            color: "rgba(96, 191, 191, 1)"
                        },
                        emphasis: {
                            borderColor: 'rgba(96, 191, 191, 0.6)',
                            borderWidth: 3,
                            borderType: "solid",
                            shadowColor: 'rgba(96, 191, 191, 0.9)',
                            shadowBlur: 10
                        }
                    }                    
                },
                {
                    name: 'three',
                    itemStyle: {
                        normal: {
                            color: "rgba(140, 75, 126, 1)"
                        },
                        emphasis: {
                            borderColor: 'rgba(140, 75, 126, 0.6)',
                            borderWidth: 3,
                            borderType: "solid",
                            shadowColor: 'rgba(140, 75, 126, 0.9)',
                            shadowBlur: 10
                        }
                    }                    
                },
                {
                    name: 'four',
                    itemStyle: {
                        normal: {
                            color: "rgba(248, 187, 68, 1)"
                        },
                        emphasis: {
                            borderColor: 'rgba(248, 187, 68, 0.6)',
                            borderWidth: 3,
                            borderType: "solid",
                            shadowColor: 'rgba(248, 187, 68, 0.9)',
                            shadowBlur: 10
                        }
                    }                    
                },
                {
                    name: 'five',
                    itemStyle: {
                        normal: {
                            color: "rgba(242, 75, 75, 1)"
                        },
                        emphasis: {
                            borderColor: 'rgba(242, 75, 75, 0.6)',
                            borderWidth: 3,
                            borderType: "solid",
                            shadowColor: 'rgba(242, 75, 75, 0.9)',
                            shadowBlur: 10
                        }
                    }                    
                }

            ],
            legendHoverLink: true,
            force: {
                repulsion: [70, 100],
                edgeLength: [250, 400],
                gravity: 0.1,
                layoutAnimation: true
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
                    curveness: 0,
                    width: 2,
                    opacity: 0.5
                },
                emphasis: {
                    curveneww: 0,
                    width: 2,
                    opacity: 0.5
                }
            },
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#ffffff',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        color: '#ffffff',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                }
            },
            // animationDuration: 20000,
            // animationDurationUpdate: 5000,
            // animationEasing: "qunitiInOut",

            // scaling: 1.1,
            roam: 'move',
            nodes: nodes,
            links : link,

        }
    ],
    animationDuration: function (idx) {
        return idx * 200;
    },
    animationDurationUpdate: function (idx) {
        return idx * 15;
    },
    animationEasing: "qunitiInOut",
    animationDelay: function (idx) {
        return idx * 15;
    },
    animationDelayUpdate: function (idx) {
        return idx * 15;
    },
};


// var canvas = document.getElementById("main"),
//     ctx = canvas.getContext("2d"),
//     pic = new Image();

//     pic.src = "./bg.jpg";

//     ctx.drawImage(pic, 0, 0);


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