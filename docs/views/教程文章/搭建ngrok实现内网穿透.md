---
title: 搭建ngrok内网穿透教程
date: 2023-05-13 16:32:37
categories:
  - 教程文章
tags:
  - 内网穿透
  - ngrok
---

## 搭建 ngrok 实现内网穿透

> 内网穿透想必是开发微信的同志所必须的，大部分人首先想到的是去网上找各种现成的吧，比如 sunny-ngrok 或者向日葵之类的，但是世界上没有免费的午餐，免费的都是会崩的！！！
>
> 下面以 centos7 linux 服务器教大家怎么搭建 ngrok 内网穿透！！！！

### 准备工作

要能实现内网穿透，你必须得有个域名，然后还有个云服务器！！两者缺一不可

### 添加 dns 解析

到你的阿里云服务器里边添加个 dns 解析，如下：

![image-20220110094252025](https://gitee.com/gzcc_kims/figure/raw/master/image-20220110094252025.png)

### 安装依赖

```
yum -y install zlib-devel openssl-devel perl hg cpio expat-devel gettext-devel curl curl-devel perl-ExtUtils-MakeMaker hg wget gcc gcc-c++ git
```

### 安装 go 语言

```
#下载go语言包
wget https://storage.googleapis.com/golang/go1.8.3.linux-amd64.tar.gz
```

![image-20211227114124187](https://gitee.com/gzcc_kims/figure/raw/master/image-20211227114124187.png)

```
#解压文件
tar -C /usr/local -xzf go1.8.3.linux-amd64.tar.gz
```

![image-20211227114439882](https://gitee.com/gzcc_kims/figure/raw/master/image-20211227114439882.png)

### 配置环境变量

```
# 打开配置文件
vim /etc/profile
# 进入编辑面板 按 i 进入切换插入模式，将下面文本粘贴至最下面即可
# ngrok是刚才解析的、域名改成你自己的
export NGROK_DOMAIN="ngrok.kim-shift.cn"
# 配置go环境
export PATH=$PATH:/usr/local/go/bin
# 按esc 切换模式 然后输入 :wq 保存退出
```

![image-20220110094502888](https://gitee.com/gzcc_kims/figure/raw/master/image-20220110094502888.png)

```
#因为刚设置的环境变量，并没有真正生效
#让刚编辑的环境变量马上生效生效
source /etc/profile
```

![image-20211227124230475](https://gitee.com/gzcc_kims/figure/raw/master/image-20211227124230475.png)

```
# 查看go版本
go version
```

![image-20211227124341902](https://gitee.com/gzcc_kims/figure/raw/master/image-20211227124341902.png)

### 下载 ngrok 源码包

```
# 将源码包下载到 /usr/local/目录下
cd /usr/local/
git clone https://github.com/inconshreveable/ngrok.git
# github仓库地址下载较慢，如果无法下载可以在电脑本地下载好再利用xftp上传到对应文件路径
# 或者使用我的gitee仓库地址进行下载
git clone https://gitee.com/piante/ngrok.git
```

### 生成证书

```
cd /usr/local/ngrok
mkdir cert
cd /usr/local/ngrok/cert
```

![image-20211227125622516](https://gitee.com/gzcc_kims/figure/raw/master/image-20211227125622516.png)

```
# 复制一起执行即可
openssl genrsa -out rootCA.key 2048
openssl req -x509 -new -nodes -key rootCA.key -subj "/CN=$NGROK_DOMAIN" -days 5000 -out rootCA.pem
openssl genrsa -out server.key 2048
openssl req -new -key server.key -subj "/CN=$NGROK_DOMAIN" -out server.csr
openssl x509 -req -in server.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out server.crt -days 5000
```

![image-20220110112030835](https://gitee.com/gzcc_kims/figure/raw/master/image-20220110112030835.png)

### 迁移覆盖证书

```
# 复制rootCA.pem到assets/client/tls/并更名为ngrokroot.crt
cp rootCA.pem ../assets/client/tls/ngrokroot.crt

#复制server.crt到assets/server/tls/并更名为snakeoil.crt
cp server.crt ../assets/server/tls/snakeoil.crt

#复制server.key到assets/server/tls/并更名为snakeoil.key
cp server.key ../assets/server/tls/snakeoil.key

```

![image-20220110112138946](https://gitee.com/gzcc_kims/figure/raw/master/image-20220110112138946.png)

### 生成服务端

```
# 进入ngrok的目录
cd /usr/local/ngrok/
```

![image-20211227133926870](https://gitee.com/gzcc_kims/figure/raw/master/image-20211227133926870.png)

```
#查看环境
go env
```

![image-20211227134101867](https://gitee.com/gzcc_kims/figure/raw/master/image-20211227134101867.png)

```
# 执行生成服务端 其中amd64代表64位的linux系统,因为我用的是centos7，所以用linux.
# Linux 平台 32 位系统：GOOS=linux GOARCH=386
# Linux 平台 64 位系统：GOOS=linux GOARCH=amd64
# Windows 平台 32 位系统：GOOS=windows GOARCH=386
# Windows 平台 64 位系统：GOOS=windows GOARCH=amd64
# MAC 平台 32 位系统：GOOS=darwin GOARCH=386
# MAC 平台 64 位系统：GOOS=darwin GOARCH=amd64
# ARM 平台：GOOS=linux GOARCH=arm

# 生成成功后 会在ngrok的bin下有一个ngrokd文件夹 即代表成功

GOOS=linux GOARCH=amd64 make release-server
```

- 下载过程有点久

![image-20211229091459417](https://gitee.com/gzcc_kims/figure/raw/master/image-20211229091459417.png)

### 生成客户端

```
# 编译成功后会在ngrok/bin/下面生成一个windows_amd64目录下面有ngrok.exe
GOOS=windows GOARCH=amd64 make release-client
```

![image-20211229092432964](https://gitee.com/gzcc_kims/figure/raw/master/image-20211229092432964.png)

### 检查刚才生成的文件

```
cd /usr/local/ngrok/bin
ll
```

![image-20220121164428691](https://gitee.com/gzcc_kims/figure/raw/master/image-20220121164428691.png)

### 启动 ngrok 服务器

```
# 记得在云服务器上的配置规则开放将需要的端口号

#-domain 访问ngrok是所设置的服务地址生成证书时那个
#-httpAddr http协议端口 默认为80
#-httpsAddr https协议端口 默认为443
#-tunnelAddr 通道端口 默认4443
./bin/ngrokd -tlsKey="assets/server/tls/snakeoil.key" -tlsCrt="assets/server/tls/snakeoil.crt" -domain="ngrok.chenzhifeng.work" -httpAddr=":81" -httpsAddr=":443" -tunnelAddr=":4443"
===================================================================================

# 或者
# nohup bin/ngrokd -domain="域名" -httpAddr=":端口号" &（表示在后台保持运行）
# 如果80端口被其他服务占用，请自行更换未占用端口号
# 输入命令按回车、然后再按回车
nohup /usr/local/ngrok/bin/ngrokd -domain="ngrok.kim-shift.cn" -httpAddr=":80" &

# 查看当前服务端口
lsof -i:80
```

![image-20220121165245435](https://gitee.com/gzcc_kims/figure/raw/master/image-20220121165245435.png)

```
# 如果需要停止服务
# 可以使用kill命令终止进程  kill <PID> 例如：
kill 27292
```

### 下载客户端

- 利用 xftp 将客户端下载下来

![image-20211229102013282](https://gitee.com/gzcc_kims/figure/raw/master/image-20211229102013282.png)

- 在 ngrok.exe 的同级目录下，新建一个 ngrok.cfg 和 start.bat 两个文件

  - ngrok.cfg 内容

  ```
  # server_addr其中 ngrok.kim-shift.cn还是你自己设置的那个域名 4443是服务区启动时的监听端口，保持一致 。 没有配置默认就是4443
  server_addr: "ngrok.kim-shift.cn:4443"
  trust_host_root_certs: false
  ```

  - start.bat 内容

  ```
  # 参数说明
  # -config ngrok.cfg 刚才新建的文件
  # -subdomain www：www为穿透的自定义域名前缀
  # 8080：本地需要穿透的域名映射端口
  .\ngrok.exe -config ngrok.cfg -subdomain test 8080
  ```

- 双击 start.bat 启动服务

![image-20211229123423089](https://gitee.com/gzcc_kims/figure/raw/master/image-20211229123423089.png)

- 启动成功的示例

![image-20220121165528090](https://gitee.com/gzcc_kims/figure/raw/master/image-20220121165528090.png)

- 访问映射的网站

![image-20220121170227887](https://gitee.com/gzcc_kims/figure/raw/master/image-20220121170227887.png)

## ======================完结撒花==========================
