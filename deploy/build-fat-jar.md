# 构建 Fat Jar <Badge type="tip" text="尚未完成" />

::: info
服务端部署分为两部分，一是在自己的开发用电脑下载源码、填写琳琅问服务端配置并编译出 Fat Jar 文件，并上传至服务器；二是[在服务器上安装 Ktor 运行环境、安装和配置 PostgreSQL，以及其他必要的通用 Web 服务配置](./server-deploy.md)。
:::

## 安装 Ktor 编译环境

为了编译 Ktor 项目，您的开发用电脑需要具备以下环境：

- Java Development Kit（JDK）21 或更高版本
- [JetBrains IntelliJ IDEA](https://www.jetbrains.com/idea/)，非必需，这里的部署指南仅以 IntelliJ IDEA 为例。

::: tip
JDK 推荐使用[腾讯 Kona JDK 21](https://github.com/Tencent/TencentKona-21)，因为琳琅问服务端是在腾讯 Kona JDK 21 上开发和测试的。
:::

## 下载源码并填写配置

首先访问[琳琅问服务端 GitHub Releases](https://github.com/LuminaPJ/lumina-server/releases)下载琳琅问服务端最新发行版源码。

下载完毕后，解压源码，使用 IntelliJ IDEA 打开解压后文件夹，等待 IntelliJ IDEA 自动导入项目并下载项目 Maven 与 Gradle 依赖。

在目录 `/lumina-server/src/main/resources` 处，创建一个名为 `application.yaml` 的文件，并写入以下内容：

```Yaml
# Ktor 配置，高亮区域表示该项需结合自身情况填写具体内容
ktor:
  application:
    modules:
      - org.lumina.ApplicationKt.module
  deployment:
    port: 8080 # 服务端的监听端口 [!code highlight]
  environment: stable # Ktor 运行环境，development、dev、test 表示开发环境，其他任意值表示生产环境 [!code highlight]

# JWT 配置
jwt:
  domain: "" # 域名，如 https://example.com [!code highlight]
  audience: "" # 目标客户端，可以填目标微信小程序的 AppID [!code highlight]
  realm: "" #  逻辑分组名称，如 default [!code highlight]
  issuer: "" # 服务签发者，如 LuminaPJ [!code highlight]
  expiresIn: 28800 # JWT 有效时间，单位秒。28800 seconds = 8 hours [!code highlight]
  
  # 国密 SM2 算法密钥对配置，填入的公钥为 65 字节，私钥为 32 字节，经过 Base64 编码为字符串
  # 请使用两对不同的密钥对，分别用于 JWT 的签名部分（JSON Web Signature，使用 signKey）和加密部分（JSON Web Encryption，使用 encKey）
  sm2:
    signPublicKey: "" # 用于 JWS 的签名用 SM2 公钥 [!code highlight]
    signPrivateKey: "" # 用于 JWS 的签名用 SM2 私钥 [!code highlight]
    encPublicKey: "" # 用于 JWE 的加密用 SM2 公钥 [!code highlight]
    encPrivateKey: "" # 用于 JWE 的加密用 SM2 私钥 [!code highlight]

# 数据库配置
db:
  url: "jdbc:postgresql://localhost:5432/lumina" # PostgreSQL 数据库连接地址 [!code highlight]
  user: "lumina" # PostgreSQL 数据库用户名 [!code highlight]
  driver: "org.postgresql.Driver" # PostgreSQL 数据库驱动
  password: "" # PostgreSQL 数据库密码 [!code highlight]

# 微信小程序配置
wx:
  appId: "" # 微信小程序 AppID，可在小程序后台菜单“开发”-“开发设置”中获取 [!code highlight]
  appSecret: "" # 微信小程序 AppSecret，可在小程序后台菜单“开发”-“开发设置”中获取 [!code highlight]
```

::: tip
SM2 密钥对可从由琳琅问维护的[中国商密 SM2 密钥对随机生成器](https://github.com/LuminaPJ/sm2-key-generator)（[使用指导文档](/deploy/sm2-key-gen-guide.md)）程序中随机生成。

默认情况下由此程序生成的 SM2 密钥对中，公钥为 65 字节，私钥为 32 字节，RAW 未压缩格式，经过 Base64 编码为字符串。
:::

## 构建 Fat Jar 文件

传统 Java 应用部署需要管理大量依赖 Jar 包，不利于便捷部署，因此琳琅问服务端项目使用 [Ktor Gradle 插件](https://ktor.io/docs/server-fatjar.html)构建 Fat Jar 文件，将所有项目代码和依赖库以及必要的资源文件打包到一个单独的 Jar 文件中，为服务端部署者提供开箱即用的体验。

在琳琅问服务端根目录运行以下命令以构建 Fat Jar 文件：

```Shell
./gradlew buildFatJar
```

构建完成后，Fat Jar 文件将放置在 `/lumina-server/build/libs` 目录下。
