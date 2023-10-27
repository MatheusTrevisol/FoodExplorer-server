module.exports = {
  apps : [{
    name: "app",
    script: "./src/server.js", /* onde o pm2 vai startar o sv */
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}