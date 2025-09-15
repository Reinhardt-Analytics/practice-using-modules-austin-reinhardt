// app.js

// --- Dependencies ---
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs/yargs')(hideBin(process.argv));
const chalk = require('chalk'); // v4.1.2 CommonJS import

// --- CLI argument parsing ---
const argv = yargs
  .option('city', {
    alias: 'c',
    type: 'string',
    describe: 'City name to get the (simulated) weather for',
    demandOption: true
  })
  .help()
  .argv;

// --- Simulated "module" to fetch weather data (no external API) ---
function getSimulatedWeather(cityName) {
  const db = {
    'new york': { tempF: 72, condition: 'Partly Cloudy', humidity: 58 },
    'los angeles': { tempF: 81, condition: 'Sunny', humidity: 30 },
    'chicago': { tempF: 65, condition: 'Windy', humidity: 50 },
    'st. louis': { tempF: 74, condition: 'Humid', humidity: 64 },
    'seattle': { tempF: 60, condition: 'Light Rain', humidity: 72 }
  };

  const key = String(cityName).trim().toLowerCase();
  return db[key] || { tempF: 70, condition: 'Fair', humidity: 55 }; // default
}

// --- Main program ---
(function main() {
  const city = argv.city;
  const weather = getSimulatedWeather(city);

  // Styled output with chalk (city emphasized)
  console.log(
    chalk.bold.underline('Weather Summary'),
    '\n',
    `${chalk.cyan('City:')} ${chalk.green(city)}`,
    '\n',
    `${chalk.cyan('Temperature:')} ${chalk.yellow(weather.tempF + '°F')}`,
    '\n',
    `${chalk.cyan('Condition:')} ${chalk.magenta(weather.condition)}`,
    '\n',
    `${chalk.cyan('Humidity:')} ${chalk.blue(weather.humidity + '%')}`
  );
})();

/*
===========================
 Written Responses (Required)
===========================

1) Purpose of package.json for managing dependencies:
   - package.json records your project's metadata (name, scripts, etc.) and, importantly,
     the exact dependencies your app needs under "dependencies". This lets anyone install
     the correct packages/versions with a single "npm install".

2) Why node_modules should NOT be included in version control:
   - node_modules contains many files generated from the dependency list in package.json.
     It is large and platform-specific. Since it can be fully restored from package.json
     and package-lock.json, we exclude it from Git to keep the repo small and portable.

3) How `npm install` reinstalls dependencies and why that matters in collaboration:
   - Running "npm install" reads package.json (and package-lock.json) and downloads the
     required versions into node_modules. This guarantees teammates (and CI) all work
     with the same dependency versions without committing the actual node_modules folder.
*/
