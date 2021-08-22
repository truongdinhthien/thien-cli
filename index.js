#!/usr/bin/env node
const cli = require('./extract-cli');
const getWifiInstance = () => {
  if (process.platform !== 'win32') {
    throw new Error('Sorry we only support on window system.');
  }
  return require('./lib/win');
};
const main = async () => {
  try {
    const wifi = getWifiInstance();
    if (cli.option === '-a') {
      const listWifi = await wifi.getListSsid();
      const result = (
        await Promise.all(listWifi.map((val) => wifi.getWifiBySsid(val)))
      ).filter(Boolean);
      console.table(result);
    }
    if (cli.option === '-n') {
      const result = await wifi.getWifiBySsid(cli.input, true);
      console.table([result]);
    }
    process.exit(0);
  } catch (error) {
    console.log(error.message);
  }
};

main();
