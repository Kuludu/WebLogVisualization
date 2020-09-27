var refresh;
var pv = echarts.init(document.getElementById('pv'));
var browser = echarts.init(document.getElementById('browser'));
var os = echarts.init(document.getElementById('os'));
var device = echarts.init(document.getElementById('device'));

var api_server = "";

$(document).ready(function() {
	fetch_visitor_data();
	refresh = setInterval('fetch_visitor_data()', 10000);
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
		refresh = setInterval('fetch_visitor_data()', 10000);
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

function fetch_visitor_data() {
	$.ajax({
		url:api_server + "/api/visitor/pv",
		type:"get",
		dataType:"json",
		success: function(data) {
			var page_visit_date = [];
			var page_visit_data = [];
			data[0].forEach (function(visit) {
				page_visit_date.push(visit[0]);
				page_visit_data.push(visit[1])
			});

			pv_option = {
			    tooltip: {
					trigger: 'axis',
			        position: function (pt) {
			            return [pt[0], '10%'];
			        }
			    },
			    toolbox: {
			        feature: {
			            dataZoom: {
			                yAxisIndex: 'none'
			            },
			            restore: {},
			            saveAsImage: {}
			        }
			    },
			    xAxis: {
			        type: 'category',
			        boundaryGap: false,
			        data: page_visit_date
			    },
			    yAxis: {
			        type: 'value',
			        boundaryGap: [0, '100%']
			    },
			    dataZoom: [{
			        type: 'inside',
			        start: 0,
			        end: 10
			    }, {
			        start: 0,
			        end: 10,
			        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
			        handleSize: '80%',
			        handleStyle: {
			            color: '#fff',
			            shadowBlur: 3,
			            shadowColor: 'rgba(0, 0, 0, 0.6)',
			            shadowOffsetX: 2,
			            shadowOffsetY: 2
			        }
			    }],
			    series: [
			        {
			            name: '访问量',
			            type: 'line',
			            smooth: true,
			            symbol: 'none',
			            sampling: 'average',
			            itemStyle: {
			                color: 'rgb(255, 70, 131)'
			            },
			            areaStyle: {
			                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			                    offset: 0,
			                    color: 'rgb(255, 158, 68)'
			                }, {
			                    offset: 1,
			                    color: 'rgb(255, 70, 131)'
			                }])
			            },
			            data: page_visit_data
			        }
			    ]
			};
			pv.setOption(pv_option);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Fail to fetch data from api server.");
		},
	})

	$.ajax({
		url:api_server + "/api/visitor/browser",
		type:"get",
		dataType:"json",
		success: function(data) {
			var visitor_browser_legend = [];
			var visitor_browser_value = [];
			data[0].forEach (function(visit) {
				visitor_browser_legend.push(visit[0])
				visitor_browser_value.push({
										"name":visit[0],
										"value":visit[1]
									 })
			});

			option = {
				legend: {
					orient: 'vertical',
					left: 'left',
					data: visitor_browser_legend
				},
				series: [
					{
						name: '数量',
						type: 'pie',
						radius: '70%',
						data: visitor_browser_value,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				]
			};
			browser.setOption(option);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Fail to fetch data from api server.");
		},
	})

	$.ajax({
		url:api_server + "/api/visitor/os",
		type:"get",
		dataType:"json",
		success: function(data) {
			var visitor_os_legend = [];
			var visitor_os_value = [];
			data[0].forEach (function(visit) {
				visitor_os_legend.push(visit[0])
				visitor_os_value.push({
										"name":visit[0],
										"value":visit[1]
									 })
			});

			option = {
				legend: {
					orient: 'vertical',
					left: 'left',
					data: visitor_os_legend
				},
				series: [
					{
						name: '数量',
						type: 'pie',
						radius: '70%',
						data: visitor_os_value,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				]
			};
			os.setOption(option);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Fail to fetch data from api server.");
		},
	})

	$.ajax({
		url:api_server + "/api/visitor/device",
		type:"get",
		dataType:"json",
		success: function(data) {
			var visitor_device_legend = [];
			var visitor_device_value = [];
			data[0].forEach (function(visit) {
				visitor_device_legend.push(visit[0])
				visitor_device_value.push({
										"name":visit[0],
										"value":visit[1]
									 })
			});

			option = {
				legend: {
					orient: 'vertical',
					left: 'left',
					data: visitor_device_legend
				},
				series: [
					{
						name: '数量',
						type: 'pie',
						radius: '70%',
						data: visitor_device_value,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				]
			};
			device.setOption(option);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Fail to fetch data from api server.");
		},
	})

	var time = new Date();
	$("#data_refresh_time").text(time.toUTCString());
}