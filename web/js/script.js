var echarts = require('echarts');

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

$('.mdl-navigation__link').on('click',function(){
	$(this).addClass('navigation-border');
	$(this).siblings('a').removeClass('navigation-border');
	if($('#topics').hasClass('navigation-border')){
		$('#anotherMe').css('display','none');
		$('#main').css('display','block');
	}
	if($('#another').hasClass('navigation-border')){
		$('#anotherMe').css('display','block');
		$('#main').css('display','none');
	}
});

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
                repulsion:200,
                edgeLength: [300, 500],
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
            nodes: [],
            links : [],

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
    }
};

$(document).ready(function(){
	$('#topics').addClass('navigation-border');
	$('#anotherMe').css('display','none');
    updateForceGraphForTopic("");
});

$('#search-field').keypress(function(e) {
	if (e.which == 13) {
		e.preventDefault();
        updateForceGraphForTopic($(e.target).val());
	}
});

function updateForceGraphForTopic(topic) {
    console.log("Topic: " + topic);
    var data = {
        specificTopic: topic
    }
    $.ajax({
        type: 'POST',
        url: 'http://jiangdongyu.space:4000/topicTOtopic',
        data: data,
        dataType: 'json',
        success: function(data){
            console.log(data)
            if (Object.keys(data["SelfList"]).length == 0) {
                $('#main').hide();
                $('#js-notopic').show();
            } else {
                $("#main").show();
                $('#js-notopic').hide();

                var topics = data,
                    nodes = [],
                    tempCount = 1;

                var standardSize = 120,
                    hotList = topics["SelfList"],
                    maxHot = Object.keys(hotList)[0];

                for (var topic in topics["SelfList"]) {
                    var obj = {
                        category: tempCount % 5,
                        name: topics["SelfList"][topic],
                        // symbolSize: standardSize * hotList[topic] / hotList[maxHot]
                        symbolSize: standardSize - tempCount * 3
                    }
                    nodes.push(obj);
                    tempCount++;
                }

                console.log(nodes)

                var links = [],
                    firstTopic = "",
                    secondTopic = "",
                    weightList = topics["EdgeWeight"];

                for (firstTopic in weightList) {
                    for (secondTopic in weightList[firstTopic]) {
                        if (firstTopic == secondTopic) continue;

                        if (weightList[firstTopic][secondTopic] < 0.81) continue;
                        var obj = {
                            source: firstTopic,
                            target: secondTopic,
                            value: weightList[firstTopic][secondTopic] // value越大关系越近
                        }
                        links.push(obj);
                    }
                }

                // console.log(link);
                option.title = {
                    show: false
                }
                option.series[0].nodes = nodes;
                option.series[0].links = links;
                // console.log(option.series)
                myChart.setOption(option);



                myChart.on('click', focus);
            }

        },
        error: function(xhr, type) {
            console.log(xhr);
        }
    });
}

function focus(param) {
    var data = param.data;
    var links = option.series[0].links;
    var nodes = option.series[0].nodes;
    if (
        data.source !== undefined
        && data.target !== undefined
    ) { //点击的是边

    } else { // 点击的是点
        console.log(data.name);
        updateForceGraphForPerson(data.name);
    }
}

function searchPerson(param) {
     var data = param.data;
    var links = option.series[0].links;
    var nodes = option.series[0].nodes;
    if (
        data.source !== undefined
        && data.target !== undefined
    ) { //点击的是边

    } else { // 点击的是点
        console.log(data.name);
        window.open('https://news.ycombinator.com/threads?id=' + data.name, '', '' , false);
    }  
}

function updateForceGraphForPerson(topic) {
    var data = {
        concreteTopic: topic
    }
    $.ajax({
        type: 'POST',
        url: 'http://jiangdongyu.space:4000/topicUser',
        data: data,
        dataType: 'json',
        success: function(data){

            var people = data,
                nodes = [],
                tempCount = 1;

            var standardSize = 120,
                userList = people["userlist"];

            for (var index in userList) {
                var obj = {
                    category: tempCount % 5,
                    name: userList[index]["author"],
                    // symbolSize: standardSize * hotList[topic] / hotList[maxHot]
                    symbolSize: standardSize - tempCount * 3
                }
                nodes.push(obj);
                tempCount++;
            }

            console.log(nodes);
            var links = [],
                firstPerson = "",
                secondPerson = "",
                weightList = people["similarity"];

            for (firstPerson in weightList) {
                for (secondPerson in weightList[firstPerson]) {
                    if (firstPerson == secondPerson) continue;
                    
                    if (weightList[firstPerson][secondPerson] < 0.98) continue;

                    var obj = {
                        source: firstPerson,
                        target: secondPerson,
                        value: weightList[firstPerson][secondPerson] // value越大关系越近
                    }
                    links.push(obj);
                }
            }

            console.log(links);
            
            option.title = {
                show: true,
                text: "Hot users in topic : " + topic,
                textAlign: "center",
                textBaseline: "top",
                left: "15%",
                top: "10%",
                textStyle: {
                    fontSize: 26
                }
            }
            option.series[0].nodes = nodes;
            option.series[0].links = links;
            // console.log(option.series)
            myChart.setOption(option);

            myChart.on('click', searchPerson);
        },
        error: function(xhr, type) {
            console.log(xhr);
        }
    });
}