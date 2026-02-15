module.exports = {
  apps: [
    {
      name: "kagoz-website",
      script: "node",
      args: "node_modules/next/dist/bin/next start -p 8000",
      cwd: "E:/Frontend/kagoz/kagoz-website",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
