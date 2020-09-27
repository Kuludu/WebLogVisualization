# WebLogVisualization

一个基于Spark框架的大数据分析与可视化实例，本科《大数据计算与可视化》课程设计。

![https://github.com/Kuludu/WebLogVisualization/raw/master/img/structure.png](https://github.com/Kuludu/WebLogVisualization/raw/master/img/structure.png)

本实例通过将Resin产生的Web日志写入HDFS并由数据分析模块对数据进行离线处理，将结果更新至后端Web服务端中，实现了与前端异步通讯更新，为网站运维人员提供了数据可视化支持。

数据分析模块基于Anaconda环境，由数据分析人员对数据进行人工审核并更新至后端中。

后端采用Flask框架构建，实现了API路由。

前端采用Bootstrap与jQuery框架构建，并采用Echarts库进行数据可视化。

***

## 界面

### 总览

![https://github.com/Kuludu/WebLogVisualization/raw/master/img/overview.png](https://github.com/Kuludu/WebLogVisualization/raw/master/img/overview.png)

### 访客

![https://github.com/Kuludu/WebLogVisualization/raw/master/img/visitor.png](https://github.com/Kuludu/WebLogVisualization/raw/master/img/visitor.png)

### 页面

![https://github.com/Kuludu/WebLogVisualization/raw/master/img/page.png](https://github.com/Kuludu/WebLogVisualization/raw/master/img/page.png)

***

*示例数据及数据处理模块将在数据脱敏完成后上传。*

