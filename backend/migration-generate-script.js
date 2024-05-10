const exec = require("child_process").exec;
const args = process.argv.slice(2); // Gets all arguments passed to the script
const migrationName = args[0] || "defaultMigrationName"; // Use the first argument as the migration name or default

const command = `npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -d ./src/ormconfig.ts src/migration/${migrationName}`;

console.log(`Executing command: ${command}`); // Log the command to be executed

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error("Execution Error:", error);
    console.error("STDERR:", stderr);
    return;
  }
  console.log("STDOUT:", stdout);
});
