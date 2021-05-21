module.exports = {
  projectName: 'ant-design-vue-admin', // 项目名称
  cluster: ['dev', 'pro'], // 集群部署配置，要同时部署多台配置此属性如: ['dev', 'test', 'prod']
  dev: {
    name: '测试环境',
    script: 'npm run build:dev',
    host: '192.168.1.1', // 服务器地址
    port: 22, // 服务器端口
    username: 'admin', // 服务器登录用户名
    password: 'password', // 服务器登录密码
    distPath: 'dist', // 本地打包生成目录
    webDir: '/home/ant-design-vue-admin/dist', // 服务器部署路径
    bakDir: '/home/ant-design-vue-admin/backups', // 服务器备份路径
    isRemoveRemoteFile: false, // 是否删除远程文件
    isRemoveLocalFile: true // 是否删除本地文件
  },
  pro: {
    dev: {
      name: '正式环境',
      script: 'npm run build:pro',
      host: '192.168.1.1', // 服务器地址
      port: 22, // 服务器端口
      username: 'admin', // 服务器登录用户名
      password: 'password', // 服务器登录密码
      distPath: 'dist', // 本地打包生成目录
      webDir: '/home/ant-design-vue-admin/dist', // 服务器部署路径
      bakDir: '/home/ant-design-vue-admin/backups', // 服务器备份路径
      isRemoveRemoteFile: false, // 是否删除远程文件
      isRemoveLocalFile: true // 是否删除本地文件
    }
  }
}
