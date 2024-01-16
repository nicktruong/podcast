import "dotenv/config";
import { readdir } from "fs/promises";
import { resolve } from "path";

const base = "./src/seeds";

readdir(base).then(async (names) => {
  const migrations = await Promise.all(
    names
      .filter((name) => name !== "index.ts")
      .map((name) => {
        const fullPathToFile = resolve(base, name, "script.ts");

        return import(fullPathToFile);
      })
  );

  for (const migration of migrations) {
    console.log("begin migrate");
    await migration.migrate();
    console.log("migrate done");
  }

  process.exit();
});
