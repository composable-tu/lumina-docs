# 准备工作 <Badge type="tip" text="尚未完成" />

::: info
您正在阅读的是面向组织网络管理员的部署文档。

此处文档不属于普通用户与团体管理员使用指南，若您正在寻找普通用户与团体管理员使用指南，请前往[使用指南](/usage/quick-start.md)。
:::

## 服务端资源准备

部署琳琅问服务端前，请确保您已经具备以下服务端资源及其操作权限：

- 服务器
  - Arm64 架构或 AMD64 架构
  - Java Development Kit（JDK）21 或更高版本
  - [PostgreSQL](https://www.postgresql.org/) 17 或更高版本
- 公网 IP
- 经过 ICP 备案的域名，且支持 HTTPS

::: info
由于微信小程序需要经过审核才能上线，且微信小程序审核团队无法访问组织内网，如果服务端被部署在内网会导致微信小程序审核团队无法进行正常审核，因此公网 IP 是必须的。
:::

::: info
根据[微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)，微信小程序无法直接与公网 IP 地址通信，仅支持与启用 HTTPS 的域名进行通信，且该域名必须经过 ICP 备案。
:::

::: tip
JDK 推荐使用[腾讯 Kona JDK 21](https://github.com/Tencent/TencentKona-21)，因为琳琅问服务端是在腾讯 Kona JDK 21 上开发和测试的。
:::

## 微信小程序资源准备

部署琳琅问微信小程序前，请确保您已经具备以下微信小程序资源及其操作权限：

- 以组织为主体的[微信公众平台](https://mp.weixin.qq.com/)微信小程序账号
- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

## 管理端资源准备

部署琳琅问管理端前，请确保您已经具备以下管理端资源及其操作权限：

- 以组织为主体的[微信开放平台](https://open.weixin.qq.com/)账号

::: tip
待建设
:::

