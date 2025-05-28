# 中国商密 SM2 密钥对随机生成器使用指导

项目地址：https://github.com/LuminaPJ/sm2-key-generator

## 使用指导

### 软件功能

中国商密 SM2 密钥对随机生成器用于生成 SM2 密钥对，公钥为 65 字节，私钥为 32 字节，RAW 未压缩格式，经过 Base64 编码为字符串。

此外，软件还可通过 SM2 私钥推导出公钥。

### 支持平台

该项目暂仅支持 Windows 10+ x64 端和 Linux Desktop x64 端运行，其中 Linux 端需要 [GLib](https://docs.gtk.org/glib/) 版本 ≥ 2.80.0。

::: info
在 Linux 中通过命令行查看当前终端的 GLib 版本：

```Shell
pkg-config --modversion glib-2.0
```
:::

### 使用步骤

#### 下载

下载SM2 密钥对随机生成器，下载后是一个 ZIP 文件，解压后找到 `sm2_key_generator.exe`（Windows）或 `sm2_key_generator`（Linux）并双击打开。

#### 生成 SM2 密钥对

打开后，点击生成按钮，等待生成完成。生成完毕后会显示 SM2 密钥对信息。

点击复制后可复制密钥对信息，如：

```Yaml
publicKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX="
privateKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX="
```

#### 私钥推导公钥

切换到“私钥转公”选项卡，该页可以通过 SM2 私钥推导出公钥。首先在输入框输入需要推导出公钥的 SM2 私钥。

点击“生成”按钮，等待生成完成。生成完毕后会显示 SM2 公钥信息。

### 备注

1. 由于需要初始化原生库，首次生成密钥对的等候时间会稍长。
2. 默认情况下由此程序生成的 SM2 密钥对中，公钥为 65 字节，私钥为 32 字节，RAW 未压缩格式，经过 Base64 编码为字符串。

## 开发须知

该项目为 Flutter + Rust 混合开发项目，Flutter 部分承载整体应用框架，Rust 部分承载 SM2 密钥对生成逻辑与基于已知 SM2 私钥推导出公钥逻辑。

如需对该项目进行开发，需在本地配置 Flutter 和 Rust 开发环境。敬请参阅：

- [Flutter 开发环境配置文档](https://docs.flutter.dev/get-started/install)（对于中国大陆网络环境，请前往[此文档](https://docs.flutter.cn/get-started/install)）
- [Rust 与 Cargo 开发环境配置文档](https://www.rust-lang.org/zh-CN/tools/install)

此外，根据您所运行的桌面平台，您可能还需要安装对应平台的依赖库。您可以在 Flutter 开发环境安装完毕后，在项目根目录运行 `flutter doctor` 以查看详情。

配置完成后，运行以下命令以启动项目：

```Shell
cargo install flutter_rust_bridge_codegen
```

```Shell
flutter pub get
```

```Shell
flutter_rust_bridge_codegen generate
```

```Shell
flutter run
```

由于 Rust 代码经过 [Flutter/Dart <-> Rust 绑定生成器](https://cjycode.com/flutter_rust_bridge/)生成绑定代码，因此在每次改动 Rust 代码之后，请运行以下命令以重新生成绑定代码：

```Shell
flutter_rust_bridge_codegen generate
```
