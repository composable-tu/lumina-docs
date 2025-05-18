# 服务端网络 API 参考 <Badge type="tip" text="尚未完成" />

::: tip
带有 JWT 标记的接口标题表示该接口需要附带包装有微信 Open ID 的 [JSON Web Tokens](https://jwt.io/) 以供服务端鉴权
:::

## 微信登录相关

### 获取包装微信 Open ID 信息的 JWT

#### 方法

POST `/weixin/login`

#### POST 参数示例

```JSON
{
  "code": "qwertyuiopasdfghjklzxcvbnm"
}
```

#### POST 参数说明

| 参数名  |   类型   | 是否必需 |     描述      |
|:----:|:------:|:----:|:-----------:|
| code | String |  是   | 微信登录临时 code |

#### 返回示例

```JSON
{
  "jwt": "mnbvcxzlkjhgfdsapoiuytrewq"
}
```

#### 返回参数说明

| 参数名 |   类型   | 是否必需 |         描述         |
|:---:|:------:|:----:|:------------------:|
| jwt | String |  是   | 包装微信 Open ID 的 JWT |

#### 备注

`code` 通过微信小程序侧调用 [`wx.login()`](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html) 以获取

## 团体相关

### 获取团体基础信息 <Badge type="tip" text="JWT" /> <Badge type="tip" text="团体成员" /> <Badge type="tip" text="团体管理员" /> <Badge type="tip" text="团体超级管理员" />

#### 方法

GET `/group/{groupId}`

#### 返回示例

```JSON
{
  "groupId": "123456789",
  "groupName": "咳特灵药业",
  "createAt": "2021-03-28T02:16:20", 
  "isPasswordEnable": true,
  "memberList": [{
    "userId": "123456789", 
    "userName": "咳特灵", 
    "permission": "SUPER_ADMIN"
  }]
}
```

#### 返回参数说明

|       参数名        |         类型         | 是否必需 |                     说明                     |
|:----------------:|:------------------:|:----:|:------------------------------------------:|
|     groupId      |       String       |  是   |                   团体 ID                    |
|    groupName     |       String       |  否   |                    团体名称                    |
|     createAt     |       String       |  是   | 创建时间，推荐使用 [Day.js](https://day.js.org/) 解析 |
| isPasswordEnable |      Boolean       |  是   |                是否开启加入团体临时密码                |
|    memberList    | List&lt;Object&gt; |  否   |                   团体成员列表                   |

##### `memberList` 参数说明

|    参数名     |   类型   | 是否必需 |                     描述                     |
|:----------:|:------:|:----:|:------------------------------------------:|
|   userId   | String |  是   |                   成员 ID                    |
|  userName  | String |  否   |                    成员名称                    |
| permission | String |  是   | 成员权限，有 `SUPER_ADMIN`、`ADMIN`、`MEMBER` 三种权限 |


### 申请加入团体 <Badge type="tip" text="JWT" />

#### 方法

POST `/group/{groupId}/join`

#### POST 参数示例

```JSON
{
  "requesterUserId": "123456789",
  "requesterUserName": "咳特灵",
  "requesterComment": "备注信息",
  "entryPassword": "Kotlin"
}
```

#### POST 参数说明

|        参数名        |   类型   | 是否必需  |                描述                 |
|:-----------------:|:------:|:-----:|:---------------------------------:|
|  requesterUserId  | String |   是   |         申请加入的成员自填写的成员 ID          |
| requesterUserName | String |   是   |           申请加入的成员自填写的名称           |
| requesterComment  | String |   否   |          申请加入的成员自填写的备注信息          |
|   entryPassword   | String |   否   | 加入团体的临时密码，当密码正确且在有效期内时，申请者将直接进入团体 |

#### 返回示例

```Text
申请提交成功
```

## 团体管理相关

### 移除成员 <Badge type="tip" text="JWT" /> <Badge type="tip" text="SOTER" /> <Badge type="tip" text="团体管理员" /> <Badge type="tip" text="团体超级管理员" />

#### 方法

POST `/groupManager/{groupId}/remove`

#### POST 参数示例

```JSON
{
  "groupManageUserList": [{
      "userId": "123456789",
      "userName": "咳特灵"
  }], 
  "soterInfo": {
    "json_string": "微信小程序调用 wx.startSoterAuthentication 获取",
    "json_signature": "微信小程序调用 wx.startSoterAuthentication 获取"
  }
}
```

#### POST 参数说明

|         参数名         |         类型         | 是否必需 |      描述      |
|:-------------------:|:------------------:|:----:|:------------:|
| groupManageUserList | List&lt;Object&gt; |  是   |  准备移除的成员列表   |
|      soterInfo      |       Object       |  否   | SOTER 生物认证结果 |

##### `groupManageUserList` 参数说明

|   参数名    |   类型   | 是否必需 |                           描述                           |
|:--------:|:------:|:----:|:------------------------------------------------------:|
|  userId  | string |  是   |                       准备移除的成员 ID                       |
| userName | String |  否   | 准备移除的成员名称，可不填，如果填写，服务端会校验提交的成员名称是否与数据库相符，若不相符则不会执行移除操作 |

## 审批相关

待补充

## 备注

`soterInfo` 通过微信小程序侧调用 [`wx.startSoterAuthentication`](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/soter/wx.startSoterAuthentication.html) 获取 `resultJSON` 和 `resultJSONSignature`，`resultJSON` 对应 `json_string`，`resultJSONSignature` 对应 `json_signature`。

::: tip
待建设
:::