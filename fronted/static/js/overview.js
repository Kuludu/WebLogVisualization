var refresh;
var random_average_load = echarts.init(document.getElementById('random_average_load'));
var random_disk_useage = echarts.init(document.getElementById('random_disk_useage'));

var api_server = "";

$(document).ready(function() {
	fetch_overview_data();
	refresh = setInterval('fetch_overview_data()', 10000);
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
		refresh = setInterval('fetch_overview_data()', 10000);
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

function fetch_overview_data() {
	$.ajax({
		url:api_server + "/api/overview/rloadave",
		type:"get",
		dataType:"json",
		success: function(data) {
			option = {
				tooltip: {
					formatter: '{a} <br/>{b} : {c}%'
				},
				series: [
					{
						type: 'gauge',
						detail: {formatter: '{value}%'},
						data: [{value: data['0'][0], name: '使用率'}]
					}
				]
			};
			random_average_load.setOption(option);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Fail to fetch data from api server.");
		},
	})

	$.ajax({
		url:api_server + "/api/overview/rdiskuseage",
		type:"get",
		dataType:"json",
		success: function(data) {
			option = {
				tooltip: {
					formatter: '{a} <br/>{b} : {c}%'
				},
				series: [
					{
						type: 'gauge',
						detail: {formatter: '{value}%'},
						data: [{value: data['0'][0], name: '使用率'}]
					}
				]
			};
			random_disk_useage.setOption(option);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Fail to fetch data from api server.");
		},
	})

	$.ajax({
		url:api_server + "/api/overview/topten",
		type:"get",
		dataType:"json",
		success: function(data) {
			$('#topten').empty();
			data[0].forEach (function(visit) {
				var ret;
				for ( i = 0; i < 7; i++ ) {
					ret += '<td>' + visit[i] + '</td>';
				}
				$('#topten').append('<tr>' + ret + '</tr>');
			});
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Fail to fetch data from api server.");
		},
	})

	$.ajax({
		url:api_server + "/api/overview/hotten",
		type:"get",
		dataType:"json",
		success: function(data) {
			$('#hotten').empty();
			data[0].forEach (function(visit) {
				$('#hotten').append('<li class="list-group-item">' + visit[0] + '<span class="badge pull-right">' + visit[1] + '</span></li>');
			});
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Fail to fetch data from api server.");
		},
	})

	var time = new Date();
	$("#data_refresh_time").text(time.toUTCString());
}	