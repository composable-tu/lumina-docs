# 服务端部署 <Badge type="tip" text="尚未完成" />

## 下载源码并配置

首先访问[琳琅问服务端 GitHub Releases](https://github.com/LuminaPJ/lumina-server/releases)下载琳琅问最新发行版源码。

下载完毕后，解压源码，进入目录 `/lumina-server/src/main/resources`，创建一个名为 `application.yaml` 的文件，并写入以下内容：

::: tip
SM2 密钥对可从由琳琅问维护的[中国商密 SM2 密钥对随机生成器](https://github.com/LuminaPJ/sm2-key-generator)（[使用指导文档](/deploy/sm2-key-gen-guide.md)）程序中随机生成。

默认情况下由此程序生成的 SM2 密钥对中，公钥为 65 字节，私钥为 32 字节，RAW 未压缩格式，经过 Base64 编码为字符串。
:::

```Yaml
# Ktor 配置，高亮区域表示该项需结合自身情况填写具体内容
ktor:
  application:
    modules:
      - org.lumina.ApplicationKt.module
  deployment:
    port: 8080 # 服务端的监听端口 [!code highlight]

# JWT 配置
jwt:
  domain: "" # 域名，如 https://example.com [!code highlight]
  audience: "" # 服务名称，如 LuminaPJ [!code highlight]
  realm: "" #  逻辑分组名称，如 default [!code highlight]
  expiresIn: 28800 # JWT 有效时间，单位秒。28800 seconds = 8 hours [!code highlight]
  
  # 国密 SM2 算法密钥对配置，填入的公钥为 65 字节，私钥为 32 字节，经过 Base64 编码为字符串
  sm2:
    publicKey: "" # SM2 公钥 [!code highlight]
    privateKey: "" # SM2 私钥 [!code highlight]

# 数据库配置
db:
  url: "jdbc:postgresql://localhost:5432/lumina" # PostgreSQL 数据库连接地址 [!code highlight]
  user: "" # PostgreSQL 数据库用户名 [!code highlight]
  driver: "org.postgresql.Driver" # PostgreSQL 数据库驱动
  password: "" # PostgreSQL 数据库密码 [!code highlight]

# 微信小程序配置
wx:
  appId: "" # 微信小程序 AppID，可在小程序后台菜单“开发”-“开发设置”中获取 [!code highlight]
  appSecret: "" # 微信小程序 AppSecret，可在小程序后台菜单“开发”-“开发设置”中获取 [!code highlight]
```

::: tip
待建设
:::

