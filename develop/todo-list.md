# TODO 清单

此页列出了琳琅问项目的后续计划更新，您可以参考此清单协助我们完善琳琅问。

## 共同端

- 完成对服务端 Ktor 部分、Node.js+Next.js 部分、PostgreSQL 部分的 Docker 容器化 + Kubernetes 分布式改造
- 新增动态二维码签到功能
- 新增动态验证码签到功能

## 微信小程序端

- 新增草稿箱功能，临时保存未编辑完成的任务（草稿箱数据仅存在用户手机本地，不存在服务端）
- 微信小程序用工端通知接入（参见[微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/laboruse/intro.html)）
- 新增定位签到功能，需要以组织为主体注册微信小程序
- 将重复的业务代码抽离出来模板化

## Ktor 端

- 新增各任务的导出为 Excel 功能（计划使用 Apache POI）
- 新增文件收集功能（计划使用 Apache Tika，需要对象存储硬件或云）
- 新增用户退出登录后注销 JWT（JWT 黑名单）机制

## 网页管理端

- 计划选型：[Node.js](https://nodejs.org/) 运行时 + [Next.js](https://nextjs.org/) 框架 + [TypeScript](https://www.typescriptlang.org/) + [Prisma](https://www.prisma.io/) ORM（或将数据库增删改查逻辑放在 Ktor 中）+ [Hero](https://www.heroui.com/) UI 组件库
- 微信开放平台扫码登录，需要以组织为主体注册微信开放平台
- 配合 Ktor 端路由完成动态验证码签到和动态二维码签到功能
- 新角色：组织管理员，可对本地部署的服务器全域团体进行管理，可更改用户号和用户名

## 文档

- 完成使用指南和常见问题文档
- 完成部署指导文档
- 完成开发指导和 API 参考文档