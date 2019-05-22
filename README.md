移动端网页自定义视频播放器组件

![image](./readme.png)

- 基于 [Create React App](https://github.com/facebook/create-react-app).

# 使用

## 本地部署

`npm start`

打开 [http://localhost:3000](http://localhost:3000)

## 打包

`npm run build`

# 注意

- 如果要在ios的webview中执行

1. ios端app要设置`webConfig.allowsInlineMediaPlayback = YES`
2. video标签中要设置playsinline和webkit-playsinline
```html
<video
  playsInline
  preload="load"
  airplay="allow"
  x-webkit-airplay="allow"
  x5-video-player-type="h5"
  webkit-playsinline="true"
  x5-video-orientation="portrait"
/>
```
才能让视频播放器正常播放，否则点击播放会自动全局后使用ios自带的播放器，导致自定义的播放组件无效。

- 
