// migration-script.js
const exec = require("child_process").exec;
const migrationName = process.argv[2] || "defaultMigrationName";

const command = `ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -d ./src/ormconfig.ts src/migration/${migrationName}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
