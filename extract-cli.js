const whileListArgs = ['-h', '-a', '-n'];
const args = process.argv.slice(2);

let cli = {
  option: null,
  input: '',
};

if (!args[0]) {
  console.info('Welcome to thien-cli. Try wifi -h to view the valid command');
  process.exit(0);
  return;
}

if (!whileListArgs.includes(args[0])) {
  console.log('Unknown option. Try wifi -h to view the all valid options');
  process.exit(1);
}

if (args[0] === '-h') {
  console.log('-a : Get the wifi password for your all connected network. ');
  console.log(
    '-n [NAME_WIFI]: Get the wifi password for a specified known network. Empty NAME_WIFI will get your current connected network'
  );
  console.log('-h : View the all valid options. ');
  process.exit(0);
}

if (args[0] === '-a') {
  cli = {
    option: '-a',
    input: null,
  };
}

if (args[0] === '-n') {
  cli = {
    option: '-n',
    input: args.slice(1).join(' '),
  };
}

module.exports = cli;
