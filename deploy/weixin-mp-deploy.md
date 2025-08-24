# 微信小程序部署 <Badge type="tip" text="尚未完成" />

与网页开发不同，网页工程文件是部署在运营方自己的服务端上，但微信小程序工程文件是上传在腾讯微信的服务器，并由微信进行部署和运行的。

在部署微信小程序工程文件前，首先需要在[微信公众平台](https://mp.weixin.qq.com/)注册[微信小程序](https://mp.weixin.qq.com/cgi-bin/wx)账号，然后在本地开发用电脑下载[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html)，并在微信开发者工具内上传微信小程序工程文件。

## 注册微信小程序账号

进入[微信小程序注册页](https://mp.weixin.qq.com/wxopen/waregister?action=step1)根据指引填写信息和提交相应的资料，就可以拥有自己的微信小程序账号。

::: tip
请在注册时选择以组织为运营主体，否则小程序能力可能因为个人主体身份而受限。
:::

随后在[微信公众平台](https://mp.weixin.qq.com/)，使用手机微信登录自己的微信小程序账号，即可进入到微信小程序管理后台。在这里可以管理你的微信小程序的权限，查看数据报表，发布微信小程序等操作。

## 上传微信小程序工程文件至微信服务器

### 下载琳琅问微信小程序工程文件并导入至微信开发者工具

首先访问[琳琅问微信小程序工程 GitHub Releases](https://github.com/LuminaPJ/lumina-weixin-mp/releases)下载琳琅问微信小程序工程文件最新发行版源码。

下载完毕后，解压源码以备用。

在[微信公众平台](https://mp.weixin.qq.com/)登录后，点击 `开发` - `开发设置` 就可以看到小程序的 `AppID`。将其复制备用。

在[微信开发者工具下载页](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)根据自身操作系统选择下载对应的最新稳定版微信开发者工具。

安装完成后，打开微信开发者工具，在 `小程序` 选项卡中点击 `导入` 按钮，选择工程文件所在目录，选择完成后：

- 在 `AppID` 栏输入上述复制的 `AppID`，
- 并在 `后端服务` 栏选择 `不使用云服务`，
- 勾选同意用户协议和隐私政策后点击完成。

### 安装 Node.js 环境并构建 `npm`

请前往 [Node.js](https://nodejs.org/zh-cn/download)，根据 Node.js 引导下载并安装 Node.js 环境。推荐安装最新 LTS 版本。

然后执行以下步骤以在微信开发者工具中构建 `npm`（参见[微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)）：
1. 在项目根目录处，打开终端并执行以下命令：
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
2. 在微信开发者工具中，点击开发者工具中的菜单栏：`工具` → `构建 npm` 

### 填写微信小程序配置

在微信小程序工程文件目录 `/miniprogram/` 处，创建一个名为 `env.ts` 的文件，并写入以下内容：

```TypeScript
export const LUMINA_SERVER_HOST = "api.example.com"; // 服务端 API 域名
export const ICP_ID = "某地A1-23456789-12345"; // ICP 备案号
export const MINI_PROGRAM_NAME = "您的微信小程序名" // 微信小程序名
export const ORGANIZATION_NAME = "您的运营主体名"; // 运营主体名

export const USER_AGREEMENT_VERSION = "1.0.0"; // 用户协议版本
export const PRIVACY_POLICY_VERSION = "1.0.0"; // 隐私政策版本
export const PERSONAL_INFORMATION_COLLECTION_LIST_VERSION = "1.0.0"; // 个人信息收集清单版本
export const THIRD_PARTY_PERSONAL_INFORMATION_SHARING_LIST_VERSION = "1.0.0"; // 第三方个人信息共享清单版本

export const OPEN_WE_ANALYSIS = true; // 是否开启微信小程序自定义报错的 We 分析数据上报
```

其中：

- 各种法律文件版本项，请使用[语义化版本](https://semver.org/)命名，如 `1.0.0`。
- 请在每次更新法律文件后同步提高此处的法律文件版本。琳琅问使用 [`semver`](https://www.npmjs.com/package/semver) 库对法律文件的版本进行比较，如果在用户同意法律文件后法律文件进行了更新，琳琅问会比较法律文件版本并在微信小程序内展示红点，提示用户前去查看相关法律文本的最新更新。
- [We 分析](https://wedata.weixin.qq.com/)是微信官方提供的小程序数据分析平台，提供一站式的数据分析解决方案。用户无需部署即可使用，支持多渠道数据监控，包括访问、留存和交易等。We 分析无需任何额外的注册或开通流程。当在微信公众平台创建小程序后，微信官方将会自动生成该小程序的 We 分析账号。

### 配置法律文件

#### 创建法律文件 Markdown

在微信小程序工程文件目录 `/miniprogram/agreement-docs/` 处，创建以下四个文件：

- `UserAgreement.md` 用户协议
- `PrivacyPolicy.md` 隐私政策
- `PersonalInformationCollectionList.md` 个人信息收集清单
- `ThirdPartyPersonalInformationSharingList.md` 第三方个人信息共享清单

并填写相应的法律文件内容。

::: tip
为方便琳琅问第三方部署者更快捷部署，琳琅问文档在[此处](/deploy/agreement-docs-templates.html)提供了包含《用户协议》、《隐私政策》、《个人信息收集清单》和《第三方个人信息共享清单》的模板文件。请第三方部署者和运营方根据自身需求与提供的服务详情进行修改和使用。

琳琅问所有模板法律文件均基于 MulanOWL BY-SA v1 协议发布，您对琳琅问所有模板法律文件中的任何文本的复制、使用、修改及传播均受到 MulanOWL BY-SA v1 协议约束。有关 MulanOWL BY-SA v1 协议的法律文本全文和更多详情，请参阅：https://license.coscl.org.cn/MulanOWLBYSAv1
:::

#### 构建富文本格式法律文件 Dist

琳琅问使用 [marked](https://github.com/markedjs/marked) 将上述法律文件的 Markdown 格式文件转换为 HTML 富文本格式，并在最终用户界面中展示。

请在每次修改法律文件完毕后运行以下命令以生成法律文件 Dist：

```Shell
npm run build-agreement-docs-dist
```

### 上传微信小程序工程文件至微信服务器

在微信开发者工具中，点击界面右上角的 `上传` 按钮即可上传工程文件代码至微信服务器。

## 发布微信小程序

微信小程序发布前，需要在微信小程序管理后台完成小程序的信息填写、类目选择、备案等步骤。

### 小程序的信息填写与类目选择

在微信小程序管理后台，填写小程序的基本信息（如名称、图标、描述等）并选择小程序类目为 `工具 > 办公`。

### 小程序的服务内容声明与版本设置

在微信小程序管理后台，打开 `账号设置` - `基本设置`。

在服务内容声明栏中，点击用户隐私保护指引设置的 `去完善`，然后按以下内容填写：

- 请确认本小程序对用户信息的收集和使用情况：**本小程序处理了用户信息，将如实填写并及时更新用户信息处理情况。**
- 使用用户信息类型：**位置信息**、**设备信息**、**发布内容**、**操作日志**
- 开发者将在获取你的明示同意后，收集你的位置信息，用途是：**用于考勤任务签到等场景下的位置校验，确保签到业务数据的真实性与有效性。**
- 开发者收集你的设备信息，用途是：**进行运行环境兼容性适配、故障诊断与分析、安全事件排查等，以持续优化服务性能，保障服务运行安全稳定。我们仅基于综合性的安全风控与服务优化之目的处理此类信息，不会将此类信息用于识别特定自然人身份，亦不会与您的其他个人信息进行不必要的关联。**
- 开发者收集你的发布内容，用途是：**用于展示用户发布的团体任务内容。**
- 开发者收集你的操作日志，用途是：**进行运行环境兼容性适配、故障诊断与分析、安全事件排查等，以持续优化服务性能，保障服务运行安全稳定。我们仅基于综合性的安全风控与服务优化之目的处理此类信息，不会将此类信息用于识别特定自然人身份，亦不会与您的其他个人信息进行不必要的关联。**
- 如开发者使用你的信息超出本指引目的或合理范围，开发者必须在变更使用目的或范围前，再次以**小程序内通知和公告的**方式告知并征得你的明示同意。
- 补充文档：了解更多个人信息处理规则可查看补充文档。文档格式只支持 `.txt`，大小不超过 100 kb。

在服务内容声明栏中，点击用户生成内容场景声明的 `更新`，然后按以下内容填写：

- 用户生成内容：**包含**
- UGC 场景：**用户资料**、**文本**
- 内容安全机制：**使用平台建议的内容安全 API**

在版本设置栏中，点击基础库最低可用版本的 `设置`，然后将最低基础库设置为 `3.5.8`。

### 小程序的备案

根据中华人民共和国工业与信息化产业部规定要求，小程序需经备案才可上架。

具体备案操作请参见[小程序备案操作指引](https://developers.weixin.qq.com/miniprogram/product/record/guidelines.html)，这里不再赘述。

::: tip
待建设
:::
