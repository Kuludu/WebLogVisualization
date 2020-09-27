var refresh;
var page_visit = echarts.init(document.getElementById('page_visit'));
var page_status = echarts.init(document.getElementById('page_status'));

var api_server = "";

$(document).ready(function() {
	fetch_page_data();
	refresh = setInterval('fetch_page_data()', 10000);
});

function auto_refresh_state() {
	var auto_refresh = document.getElementById("auto-refresh");
	if (document.getElementById("auto-refresh").className == "btn btn-primary active") {
		auto_refresh.className = "btn btn-default";
		auto_refresh.innerHTML = "自动刷新（点击开启）";
		clearInterval(refresh);
	} else {
		auto_refresh.className = "btn btn-primary active";
		auto_refresh.innerHTML = "自动刷新（点击关闭）";
		refresh = setInterval('fetch_page_data()', 10000);
	}
}

function search_text() {
	var content = $('#content').html();
	$('#content').html(content);
	var searchText = $('#search').val();
	if (searchText.length == 0) {
		return false;
	}
	var regExp = new RegExp(searchText, 'g');
	var newHtml = content.replace(regExp, '<span id="result" style="color:red;">' + searchText + '</span>');
	$('#content').html(newHtml);
}

function fetch_page_data() {
	$.ajax({
		url:api_server + "/api/page/visit",
		type:"get",
		dataType:"json",
		success: function(data) {
			var page_visit_legend = [];
			var page_visit_value = [];

			data[0].forEach (function(visit) {
				page_visit_legend.push(visit[0]);
				page_visit_value.push({
										"name":visit[0], 
										"value":visit[1]
									 })
			});

			page_visit_option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: '{a} <br/>{b} : {c} ({d}%)'
			    },
			    legend: {
			        left: 'center',
			        top: 'bottom',
			        data: page_visit_legend
			    },
			    toolbox: {
			        show: true,
			        feature: {
			            mark: {show: true},
			            dataView: {show: true, readOnly: false},
			            magicType: {
			                show: true,
			                type: ['pie', 'funnel']
			            },
			            restore: {show: true},
			            saveAsImage: {show: true}
			        }
			    },
			    series: [
			        {
			            name: '访问量',
			            type: 'pie',
			            radius: [30, 110],
			            roseType: 'area',
			            data: page_visit_value
			        }
			    ]
			};
			page_visit.setOption(page_visit_option);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Fail to fetch data from api server.");
		},
	})

	$.ajax({
		url:api_server + "/api/page/status",
		type:"get",
		dataType:"json",
		success: function(data) {
			var page_status_legend = [];
			var page_status_value = [];
			data[0].forEach (function(visit) {
				page_status_legend.push(visit[0])
				page_status_value.push(visit[1])
			});

			page_status_option = {
			    xAxis: {
			        type: 'category',
			        data: page_status_legend
			    },
			    yAxis: {
			        type: 'value'
			    },
			    series: [{
			        data: page_status_value,
			        type: 'bar',
			       	itemStyle:{
                        normal:{
                            color:'#7fcbd7'
                        }
                    },
			    }]
			};

			page_status.setOption(page_status_option);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Fail to fetch data from api server.");
		},
	})

	var time = new Date();
	$("#data_refresh_time").text(time.toUTCString());
}