var echarts = require('echarts');

// var topics = require('../mock.json');

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

var data = {
    specificTopic: "Google"
}

$.ajax({
    type: 'POST',
    url: 'http://jiangdongyu.space:3000/topicTOtopic',
    dataType: 'json',
    success: function(data){
        console.log(data)

        var topics = data,
            nodes = [],
            tempCount = 1;

        var standardSize = 120,
            hotList = topics["SelfList"],
            maxHot = Object.keys(hotList)[0];

        for (var topic in topics["SelfList"]) {
            var obj = {
                category: tempCount % 5,
                name: Object.keys(topics["SelfList"][topic])[0],
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

        // console.log(link);

        var option = {
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
                    focusNodeAdjacency: true,
                    categories : [      
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
                        repulsion: 200,
                        edgeLength: [150, 400],
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
                            color: "#b2b19d",
                            curveness: 0,
                            width: 1,
                            opacity: 0.5
                        },
                        emphasis: {
                            color: "#b2b19d",
                            curveneww: 0,
                            width: 2,
                            type: "solid",
                            opacity: 0.5
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#ffffff',
                                fontSize: 16,
                                fontWeight: 'bold'
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: '#ffffff',
                                fontSize: 16,
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

        myChart.setOption(option);

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
                // console.log("选中了边 " + sourceNode.name + ' -> ' + targetNode.name + ' (' + data.weight + ')');
            } else { // 点击的是点
                // console.log("选中了" + data.name + '(' + data.value + ')');
            }
        }
        myChart.on('click', focus);
    },
    error: function(xhr, type){
        console.log(xhr);
    }
});

