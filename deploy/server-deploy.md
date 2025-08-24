# 服务端环境搭建与部署 <Badge type="tip" text="尚未完成" />

::: info
服务端部署分为两部分，一是[在自己的开发用电脑下载源码、填写琳琅问服务端配置并编译出 Fat Jar 文件，并上传至服务器](./build-fat-jar.md)；二是在服务器上安装 Ktor 运行环境、安装和配置 PostgreSQL，以及其他必要的通用 Web 服务配置。
:::

## 安装与配置琳琅问运行环境

为了运行琳琅问项目，您的服务器至少需要以下配置或环境：

- Arm64 架构或 AMD64 架构
- Java Development Kit（JDK）21 或更高版本
- [PostgreSQL](https://www.postgresql.org/) 16 或更高版本

此外，您还需要具备：

- 公网 IP
- 经过 ICP 备案的域名，且已取得并配置完毕 HTTPS 相关证书

::: info
由于微信小程序需要经过审核才能上线，且微信小程序审核团队无法访问组织内网，如果服务端被部署在内网会导致微信小程序审核团队无法进行正常审核，因此公网 IP 是必须的。
:::

::: info
根据[微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)，微信小程序无法直接与公网 IP 地址通信，仅支持与启用 HTTPS 的域名进行通信，且该域名必须经过 ICP 备案。
:::

::: tip
JDK 推荐使用[腾讯 Kona JDK 21](https://github.com/Tencent/TencentKona-21)，因为琳琅问服务端是在腾讯 Kona JDK 21 上开发和测试的。
:::

这里的服务端部署指南以 Linux Server 为例。

为安全起见，建议在 Linux Server 新建一个最小权限用户以作为琳琅问服务端的运行用户。以 `luminauser` 为用户名例：

```Shell
sudo useradd luminauser
```

### 安装腾讯 Kona JDK 21

在 Linux Server 中，推荐使用 [SDKMAN!](https://sdkman.io/) 安装和管理服务端 Java 及其依赖。这里以 SDKMAN! 为例安装腾讯 Kona JDK 21。

1. 更新服务端软件包列表
    ::: code-group
    ```Shell [Debian 系]
    sudo apt update && sudo apt upgrade
    ```

    ```Shell [Red Hat 系]
    sudo yum update
    ```
    :::
2. 切换到运行用户，并以运行用户身份安装 SDKMAN!
    ```Shell
    su - luminauser # 切换到运行用户
    export SDKMAN_DIR="/usr/local/sdkman" && curl -s "https://get.sdkman.io" | bash
    ```

    按照屏幕上的说明完成安装。完成安装后运行以下命令：
    
    ```Shell
    source "/usr/local/sdkman/bin/sdkman-init.sh" # 初始化 SDKMAN!
    ```
3. 查看 SDKMAN! 中的腾讯 Kona JDK 可用版本
    ```Shell
    sdk list java | grep kona
    ```
   
    会列出所有可用的版本，如：

    ```Text
    Tencent       |     | 21.0.8       | kona    |            | 21.0.8-kona
                  |     | 17.0.16      | kona    |            | 17.0.16-kona
                  |     | 11.0.28      | kona    |            | 11.0.28-kona
                  |     | 8.0.462      | kona    |            | 8.0.462-kona
    ```
4. 使用 SDKMAN! 安装腾讯 Kona JDK 21，如上述 Kona 最新版为 `21.0.8-kona`，则执行以下命令：
    ```Shell
    sdk install java 21.0.8-kona
    ```

::: tip
验证服务端已安装的腾讯 Kona JDK 版本

```Shell
java -version
```

如果执行上述语句后的显示内容类似于以下文本，则说明腾讯 Kona JDK 安装成功：

```Text
openjdk version "21.0.8" 2025-07-24 LTS
OpenJDK Runtime Environment TencentKonaJDK (build 21.0.8+1-LTS)
OpenJDK 64-Bit Server VM TencentKonaJDK (build 21.0.8+1-LTS, mixed mode, sharing)
```
:::

### 安装 PostgreSQL

1. 更新服务端软件包列表
    ::: code-group
    ```Shell [Debian 系]
    su - root # 切换回 root 用户 
    sudo apt update && sudo apt upgrade
    ```

    ```Shell [Red Hat 系]
    sudo yum update
    ```
    :::
2. 安装 PostgreSQL
    ::: code-group
    ```Shell [Debian 系]
    # 添加 PostgreSQL 官方源
    sudo apt install -y postgresql-common
    sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh
    
    # 安装 PostgreSQL
    sudo apt install -y postgresql
    ```
    :::
    
    ::: info
    由于 Red Hat 系的 PostgreSQL 官方源因系统版本和平台而异，因此请参照[此文档](https://www.postgresql.org/download/linux/redhat/)进行安装。
    :::
3. 初始化并设置开机启动 PostgreSQL
    ::: code-group
    ```Shell [Debian 系]
    sudo systemctl enable postgresql.service
    sudo systemctl start postgresql.service
    ```

    ```Shell [Red Hat 系]
    postgresql-setup --initdb
    sudo systemctl enable postgresql.service
    sudo systemctl start postgresql.service
    ```
   :::
4. 修改 `postgres` 用户密码
    ```Shell
    sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '<your_password>';"
    ```
    
    ::: tip
    不要忘记将命令中的 `<your_password>` 替换为实际的密码！
    :::
5. 创建琳琅问服务端所使用的数据库用户及 `lumina` 数据库
    ```Shell
    # 创建用户
    sudo -u postgres psql -c "CREATE USER <your_name> WITH PASSWORD '<your_password>';"

    # 授予数据库创建权限
    sudo -u postgres psql -c "ALTER USER <your_name> CREATEDB;"
    
    # 创建 lumina 数据库
    sudo -u postgres psql -c "CREATE DATABASE lumina OWNER <your_name>;"
    ```

   ::: tip
   请确保命令中的 `<your_name>` 和 `<your_password>` 与[琳琅问配置文件](./build-fat-jar#下载源码并填写配置)中的 `db.username` 和 `db.password` 配置一致。
   :::

::: tip
安装完成上述工作后，您还需要为域名配置 HTTPS 证书、可能需要配置 Nginx 或其他 Web 服务器进行反向代理。由于相关配置方法繁多且不一定均适用于您的服务器，此处不再赘述。
:::

## 部署琳琅问服务端

::: tip
不要忘记将下列命令的 `<your_username>`、`<your_server_ip>` 和 `/path/to/` 替换为实际的用户名、服务器 IP 地址和实际路径！
:::

1. 上传 Jar 文件到服务器
    ::: info
    这里的 Jar 文件来自于[构建 Fat Jar](./build-fat-jar.md) 指南成果。
    :::
    
    使用 `scp` 或 SFTP 工具将 Jar 文件上传至服务器。以 `scp` 为例：

    ```Shell
    scp /path/to/lumina-server-all.jar <your_username>@<your_server_ip>:/path/to/deploy/
    ```
2. 创建运行脚本
    在 `/path/to/deploy/` 目录下创建运行脚本 `lumina.sh`，并写入以下内容：

    ```Shell
    java -jar /usr/local/luminapj-server/lumina-server-all.jar >> /usr/local/luminapj-server/lumina_$(date '+%Y-%m-%d_%H-%M-%S').log 2>&1 # 启动服务并重定向日志
    ```
3. 为运行用户授权目录
    ```Shell
    sudo chown -R luminauser:luminauser /path/to/deploy
    ```
4. 创建 Systemd 服务文件
    ::: code-group
    ```Shell [Debian 系]
    sudo nano /etc/systemd/system/lumina.service
    ```
   
    ```Shell [Red Hat 系]
    sudo vi /etc/systemd/system/lumina.service
    ```
    :::

    写入以下内容

    ```Ini
    [Unit]
    Description=Lumina
    After=network.target

    [Service]
    User=luminauser  # 使用创建的用户（若未创建则改为 root）
    WorkingDirectory=/path/to/deploy
    Environment="PATH=<your_path>"
    Environment="JAVA_HOME=<your_java_home>"
    ExecStart=/bin/bash -c '/path/to/deploy/lumina.sh'
    SuccessExitStatus=143
    Restart=always
    RestartSec=30

    [Install]
    WantedBy=multi-user.target
    ```
   
    ::: tip
    不要忘记将 `<your_path>`、`<your_java_home>` 和 `/path/to/deploy` 替换为实际路径！

    其中，`<your_path>` 和 `<your_java_home>` 可从以下命令获取：
    
    ```Shell
    echo $PATH # 获取 PATH
    echo $JAVA_HOME # 获取 JAVA_HOME
    ```
    :::
5. 启动服务并设置自启
    ```Shell
    sudo systemctl daemon-reload
    sudo systemctl enable lumina
    sudo systemctl start lumina
    ```