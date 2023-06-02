---
title: 移动端图片上传IOS安卓兼容
date: 2023-06-02 18:22:09
categories:
  - 前端开发
tags:
  - javascript
  - 图片兼容
sidebar: false
---

- 安装依赖

```javascript
import EXIF from 'exif-js'
```

**vue/react 中处理方式相同**

- 读取图片信息

```javascript
const _this = this
/**
 * file：将要上传的文件
 */
EXIF.getData(file, function () {
  console.log('测试this:', this)
  _this.compressImg(file, this.exifdata.Orientation)
})
```

- 处理图片

```javascript
  /* file:上传的原文件;Orientation:文件的拍摄方向 */
  compressImg(file, Orientation) {
    const _this = this
    const ready = new FileReader()
    ready.readAsDataURL(file)
    ready.onload = function () {
      const img = new Image()
      img.src = this.result
      img.onload = function () {
        // 获取图片的尺寸w*h
        let w = this.width
        let h = this.height
        // 创建canvas画布
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        // 创建canvas属性节点
        const anw = document.createAttribute('width')
        const anh = document.createAttribute('height')
        // drawImage的起点坐标（x,y),canvas宽高ctxw*ctxh,旋转角度angle
        let [x, y, ctxw, ctxh, angle] = [0, 0, w, h, 0]
        /*
        * Orientation的值对应图片的角度
        * 1或者undefined不需要处理
        * 3图片需要旋转180度
        * 6图片需要顺时针旋转90度
        * 8图片需要顺时针旋转270度
        * canvas生成图片需要canvas和图片的尺寸一致，否则生成的图片会被裁剪或多出像素
        * 图片以画布原点（0，0）为旋转中心，须满足图片渲染到画布，并旋转后，整个图片刚好落入画布可视区域
        * eg：旋转90度
        * 图片尺寸长*宽为w*h,渲染图片的起点（0，-h),画布长*宽为h*w
         */
        const isIOS = Boolean(navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))//获取设备信息
        if (isIOS) {
          // 如果是苹果系统直接将图片旋转360度，甩掉方向值就好
          angle = 4 * Math.PI / 2
        } else {
          switch (Orientation) {
            case 8:
              angle = 3 * Math.PI / 2
              x = -w
              ctxw = h
              ctxh = w
              break
            case 3:
              angle = Math.PI
              x = -w
              y = -h
              break
            case 6:
              angle = Math.PI / 2
              y = -h
              ctxw = h
              ctxh = w
              break
            default:
          }
        }
        anw.nodeValue = ctxw
        anh.nodeValue = ctxh
        canvas.setAttributeNode(anw)
        canvas.setAttributeNode(anh)
        ctx.rotate(angle)
        ctx.drawImage(img, x, y, w, h)
        // quality值越小，所绘制出的图像越模糊
        const quality = 0.8;
        let base64 = canvas.toDataURL('image/jpeg', quality)

        // 将base64转blob二进制文件
        const arr = base64.split(',')
        const [mime, bstr] = [arr[0].match(/:(.*?);/)[1], atob(arr[1])]
        let n = bstr.length
        // 转化成blob
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        const blob = new Blob([u8arr], { type: mime })
        /* 处理好的文件 */
        console.log('处理好的文件:',base64,blob)
      }
    }
  }
```
