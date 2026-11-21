# 3473 fitness & running

现有匿名部门问卷的本地版本。需要 Node.js 24 或更高版本，无需安装依赖。

启动：
```sh
node scripts/build.mjs
node scripts/preview.mjs
```

访问 http://localhost:4173 ，管理页为 /admin。管理密码保存在本机 .local-config.json，不上传 GitHub。回答持久保存在 data/responses.sqlite。仅本机可访问。新克隆时需自行创建 .local-config.json，格式为 {"adminKey":"自定义强密码"}。
