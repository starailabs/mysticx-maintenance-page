module.exports = {
  apps: [
    {
      name: "mysticx-maintenance",
      script: "node_modules/.bin/next",
      args: "start -p 3503",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      max_memory_restart: "256M",
    },
  ],
};
