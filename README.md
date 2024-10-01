
<img  style="border-radius: 5px" width="50" src="https://mini-metro-web.gitlab.io/app-icon.png">

# Mini Metro Web 
迷你地铁地图构建工具: `创建迷你地铁风格的地铁线路图`。

支持**无限**站点与线路，支持**多次穿过**同一站点，设置**支线**，支持**导出图片**。
   
[https://mini-metro-web.gitlab.io/](https://mini-metro-web.gitlab.io/)

## 更新日志
#### 1.1.1 `增加更多站点形状，新增站点时支持修改默认形状` 
#### 1.1.0 `支持修改背景颜色与背景图`  
#### 1.0.2 `加入刷新后快速恢复通知`  
#### 1.0.1 `加入报错指引`  

## 下一步计划

多语言支持

English and other languages ​​will be supported in subsequent version.

##  基本用法

### 菜单
点击左上角标题进入菜单，点击任意空白处退出菜单

### 创建站点
 1. 菜单 => 站点 => 添加站点
 2. 点击空白处添加

### 创建线路
1. 点击任意站点
2. 选择 操作 => 以此为起点新建线路
3. 按照提示依次点击站点添加到线路

### 删除站点/线路
1. 点击站点/线路
2. 选择 操作 => 删除

### 导出图片/文件
菜单 => 作为图片/文件导出

## 进阶用法
请参考应用内教程或[视频教程](https://space.bilibili.com/8217854)

## 构建

和大部分react项目一样，先运行`npm i`,然后:

### `npm start`

本地运行
打开 [http://localhost:3000](http://localhost:3000) 浏览器中查看.

### `npm run build`

打包成静态文件
