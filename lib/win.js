const execa = require('execa');
const wifi = {
  getListSsid: async () => {
    try {
      const cmd = 'netsh';
      const args = ['wlan', 'show', 'profile'];
      const { stdout } = await execa(cmd, args);
      const regexGetSsid = /^\s*All User Profile\s*:(.+)$/gm;
      const listSsid = stdout
        .match(regexGetSsid)
        .map((val) => val.split(':')[1].trim());
      return listSsid;
    } catch (error) {
      console.log('Some error occurred on the system');
    }
  },
  getCurrentSsid: async () => {
    try {
      const cmd = 'netsh';
      const args = ['wlan', 'show', 'interfaces'];
      const { stdout } = await execa(cmd, args);
      const regexGetSsid = /^\s*SSID\s*:(.+)$/gm;
      const currentSsid = stdout
        .match(regexGetSsid)
        .map((val) => val.split(':')[1].trim());
      return currentSsid[0];
    } catch (error) {
      console.log('Some error occurred on the system');
    }
  },
  async getWifiBySsid(ssid, throwEx = false) {
    try {
      ssid = ssid || (await this.getCurrentSsid());
      const cmd = 'netsh';
      const args = ['wlan', 'show', 'profile', `name=${ssid}`, 'key=clear'];
      const { stdout } = await execa(cmd, args);
      const ret = /^\s*Key Content\s*: (.+)\s*$/gm.exec(stdout);
      return {
        ssid,
        password: ret[0].split(':')[1].trim(),
      };
    } catch (error) {
      if (!throwEx) return null;
      throw new Error(`Profile ${ssid} is not found on the system.`);
    }
  },
};

module.exports = wifi;
