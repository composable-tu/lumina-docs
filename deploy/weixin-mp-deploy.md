# 微信小程序部署 <Badge type="tip" text="尚未完成" />

::: tip
待建设
:::

### 安装 Node.js 环境

请前往 [Node.js](https://nodejs.org/zh-cn/download)，根据 Node.js 引导下载并安装 Node.js 环境。推荐安装最新 LTS 版本。

### 下载源码并构建 `npm`

下载源码后，需要执行以下步骤才可在[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)正常运行：

1. 在微信开发者工具中导入并打开项目（需已在[微信公众平台](https://mp.weixin.qq.com/)新建小程序）
2. 在微信开发者工具中构建 `npm`（参见[微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)）：
    1. 请在项目根目录下执行以下命令：
    ::: code-group
    ```Shell [npm]
    npm install
    ```

    ```Shell [Yarn]
    yarn install
    ```
   
    ```Shell [pnpm]
    pnpm install
    ```

    ```Shell [vlt]
    vlt install
    ```
    :::
    2. 在微信开发者工具中，点击开发者工具中的菜单栏：工具 --> 构建 `npm` 
