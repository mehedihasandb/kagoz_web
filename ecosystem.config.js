module.exports = {
  apps: [
    {
      name: "kagoz_web",
      script: "node",
      args: "node_modules/next/dist/bin/next start -p 8000",
      cwd: "E:/Frontend/kagoz/kagoz_web",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
