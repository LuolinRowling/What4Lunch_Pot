"use strict"

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var fileTopics = "topics.json";
var fileComments = "selected_comments.json";
var fileUserTopic = "author_feature.json";
var fileToUser = "author_mat.json";
// var jsonTopic = JSON.parse(fs.readFileSync(fileTopics));
var jsonTopic = require('./topics.json');
var jsonComments = JSON.parse(fs.readFileSync(fileComments));
var jsonUserTopic = require('./author_feature.json');
var jsonToUser = require('./author_mat.json');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// var jsonUserTopic = {
// "topic":["Google","Microsoft"],
// "feature_map":[{"author":"xiaoming","feature": [0.6,0.8]},
//                 {"author":"xiaohong","feature": [0.2,0.7]},
//                 {"author":"xiaofang","feature": [0.9,0.2]}
//                ]
// };

// var jsonToUser = {
// 	"similarity": {
// 		"xiaoming": {"xiaoming": 1, "xiaofang": 0.2, "xiaolan": 0.8},
// 		"xiaofang": {"xiaofang": 1, "xiaoming": 0.2, "xiaolan": 0.5},
// 		"xiaolan": {"xiaolan": 1,"xiaoming": 0.8, "xiaofang": 0.5}
// 	}
// };

function sortJson_Sin(json_data){
  var arr = [];
  for (var k in json_data){
     var tmpjson = {};
     tmpjson[k] = json_data[k];
     arr.push(tmpjson);
  }
  //然后此时对这个数组进行排序
  arr.sort(function(json1,json2){
    var n1 = 0,n2 = 0;
    for(var k in json1){
      n1 = parseInt(json1[k]);
    }
    for(var kk in json2){
      n2 = parseInt(json2[kk]);
    }
    if((n1 - n2) == 0){
      for(var mm in json1){
        n1 = mm;
      }
      for(var mmm in json2){
        n2 = mmm;
      }
      if(n1 > n2){
        return -1;
      }else{
        return 1;
      }
    }else{
      return n2 - n1;
    }
  });
  return arr;
}

var cloudResultAll = sortJson_Sin(jsonTopic.SelfList);
var heatTopicAll = [];

for(var i = 0;i < cloudResultAll.length;i++){
	for(var key in cloudResultAll[i]){
		heatTopicAll[i] = key;
	}
}

var cloudResult = sortJson_Sin(jsonTopic.SelfList).slice(0,20);//最热的20个话题
var heatTopic = [];

for(var i = 0;i < cloudResult.length;i++){
	for(var key in cloudResult[i]){
		heatTopic[i] = key;
	}
}

//显示前20个最热的topic
app.get('/topicCloud', function (req, res) {
    res.send(heatTopic);
});

//显示最热门topic及与之相关的topic（用户自定义topic）
app.post('/topicTOtopic', function (req, res) {
	var specificTopic = req.body.specificTopic;
	var htRelation = {};

	if(specificTopic == null || specificTopic.length == 0){
    console.log("here1")
		htRelation["SelfList"] = heatTopic;
		console.log(heatTopic);
		htRelation["EdgeWeight"] = {};
		for(var i = 0;i < heatTopic.length;i++){
			htRelation["EdgeWeight"][heatTopic[i]] = {};
			for(var j = 0;j < heatTopic.length;j++){
				htRelation["EdgeWeight"][heatTopic[i]][heatTopic[j]] = jsonTopic["EdgeWeight"][heatTopic[i]][heatTopic[j]];
			}
		}
	}else if(heatTopicAll.indexOf(specificTopic) == -1){//topic不存在
    console.log("here2")
		htRelation["SelfList"] = "";
		htRelation["EdgeWeight"] = "";

	}
	else{//存在用户自定义topic
    console.log("here3")
    function down(x, y) {
        return (x[Object.keys(x)[0]] < y[Object.keys(y)[0]]) ? 1 : -1
    }

    var arr = [];

    for (var i = 0; i < Object.keys(jsonTopic["EdgeWeight"][specificTopic]).length; i++) {
      var obj = {};
      var key = Object.keys(jsonTopic["EdgeWeight"][specificTopic])[i],
          value = jsonTopic["EdgeWeight"][specificTopic][key];
      obj[key] = value;
      arr.push(obj)
    }

    // console.log(arr)

    var relatedResult = arr.sort(down).slice(0, 20)

    var heatTopicRelated = [];

    for(var i = 0;i < relatedResult.length;i++){
      for(var key in relatedResult[i]){
        heatTopicRelated.push(key);//话题相关的数组
      }
    }

    var htrResult = [];
    for(var i = 0;i < heatTopicAll.length;i++){
    	if(heatTopicRelated.indexOf(heatTopicAll[i]) < 0){
    		continue;
    	}else{
    		htrResult.push(heatTopicAll[i]);
    	}
    }


		htRelation["SelfList"] = htrResult;
		htRelation["EdgeWeight"] = {};
		for(var i = 0;i < heatTopicRelated.length;i++){
			htRelation["EdgeWeight"][heatTopicRelated[i]] = {};
			// console.log(heatTopicRelated[i]);
			// if(htRelation["EdgeWeight"][heatTopicRelated[i]] == undefined){
			// 	continue;
			// }
			for(var j = 0;j < heatTopicRelated.length;j++){
        // console.log(jsonTopic["EdgeWeight"][heatTopicRelated[i]]);

				htRelation["EdgeWeight"][heatTopicRelated[i]][heatTopicRelated[j]] = jsonTopic["EdgeWeight"][heatTopicRelated[i]][heatTopicRelated[j]];
			}

		}

    // console.log(htRelation)

	}

	res.send(htRelation);
  // res.send({success: true});

});

//显示某一个topic下的大牛用户及其之间的关系
app.post('/topicUser', function (req, res) {
  var concreteTopic = "Google";
	var t_index = jsonUserTopic["topic"].indexOf(concreteTopic);

	function down(x, y) {
        return (x["feature"][t_index] < y["feature"][t_index]) ? 1 : -1
    }

    jsonUserTopic["feature_map"].sort(down);

    var topicUserResult = jsonUserTopic["feature_map"].slice(0,20);//选择话题下的20位大牛用户

    var authorArr = [];

    for (var i = 0; i < topicUserResult.length; i++) {
    	authorArr.push(topicUserResult[i].author);

      topicUserResult[i]["feature"] = topicUserResult[i]["feature"].slice(t_index, t_index + 1);
    }

    var tuRes = {};
    tuRes["userlist"] = topicUserResult;

    var similarity = {};

    for (var i = 0; i < authorArr.length; i++) {
      similarity[authorArr[i]] = {};
    	
    	var person = similarity[authorArr[i]];
      // console.log(similarity);

    	for (var j = 0; j < authorArr.length; j++) {
        if (i == j) continue;
        // console.log(authorArr[i])
        
    		person[authorArr[j]] = jsonToUser[authorArr[i]][authorArr[j]];
    	}
    }

    tuRes["similarity"] = similarity;

    res.send(tuRes);
});

//显示和我评论或topic相近的人
app.post('/userTOuser', function (req, res) {
	var userResult = sortJson_Sin(jsonToUser["DannoHung"]).slice(0,4);//关系最近的四个人
    var userClose = [];

    for(var i = 0;i < userResult.length;i++){
	    for(var key in userResult[i]){
		    userClose[i] = key;
	    }
    }

    var userInfo = {};
    userInfo["userClose"] = userClose;
    userInfo["topics"] = heatTopic;
    userInfo["comments"] = jsonComments;

    res.send(userInfo);

});


var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});