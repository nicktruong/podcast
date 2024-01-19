import "dotenv/config";
import { resolve } from "path";
import { readdir } from "fs/promises";

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
