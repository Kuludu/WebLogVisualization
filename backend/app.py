import os
import json
from random import shuffle
from flask import Flask, make_response, render_template
import psutil

app = Flask(__name__, static_folder='static')
app.config['SECRET_KEY'] = os.urandom(24)


@app.route('/overview', methods=['GET'])
def overview_static():
    return render_template('overview.html')


@app.route('/visitor', methods=['GET'])
def visitor_static():
    return render_template('visitor.html')


@app.route('/page', methods=['GET'])
def page_static():
    return render_template('page.html')


@app.route('/api/overview/rloadave', methods=['GET'])
def rloadave():
    ret = dict()
    ret["0"] = [psutil.cpu_percent(0)]

    return make_response(json.dumps(ret))


@app.route('/api/overview/rdiskuseage', methods=['GET'])
def rdiskuseage():
    ret = dict()
    ret["0"] = [psutil.disk_usage('/')[3]]

    return make_response(json.dumps(ret))


# 最近10条访问网址
@app.route('/api/overview/topten', methods=['GET'])
def top_ten():
    ret = dict()
    with open("./result/最近10条访问记录.json", 'r') as f:
        ret["0"] = eval(f.read())
    return make_response(ret)


# 最热10条访问网址
@app.route('/api/overview/hotten', methods=['GET'])
def hot_ten():
    ret = dict()
    with open("./result/最热10条访问网址.json", 'r') as f:
        ret["0"] = eval(f.read())
    return make_response(ret)


# 用户日访问量图
@app.route('/api/visitor/pv', methods=['GET'])
def visitor_time():
    ret = dict()
    with open("./result/每分钟访客量.json", 'r') as f:
        ret["0"] = eval(f.read())

    return make_response(json.dumps(ret))


# 操作系统
@app.route('/api/visitor/os', methods=['GET'])
def visitor_os():
    ret = dict()
    with open("./result/用户操作系统统计.json", 'r') as f:
        data = eval(f.read())
        ret["0"] = data

    return make_response(json.dumps(ret))


# 浏览器
@app.route('/api/visitor/browser', methods=['GET'])
def visitor_browser():
    ret = dict()
    with open("./result/用户浏览器统计.json", 'r') as f:
        data = eval(f.read())
        ret["0"] = data

    return make_response(json.dumps(ret))


# 用户设备
@app.route('/api/visitor/device', methods=['GET'])
def visitor_device():
    ret = dict()
    with open("./result/用户设备统计.json", 'r') as f:
        data = eval(f.read())
        ret["0"] = data
    return make_response(json.dumps(ret))


# 南丁格尔图
@app.route('/api/page/visit', methods=['GET'])
def page_visit():
    ret = dict()
    with open("./result/每个网址访问次数.json", 'r') as f:
        data = eval(f.read())
        shuffle(data)
        ret["0"] = data

    return make_response(json.dumps(ret))


# 状态码柱型图
@app.route('/api/page/status', methods=['GET'])
def page_status():
    ret = dict()
    ret["0"] = [['200', 17264], ['404', 2236], ['302', 474], ['500', 23], ['206', 3]]
    return make_response(json.dumps(ret))


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)
