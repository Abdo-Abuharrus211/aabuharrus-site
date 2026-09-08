import { createClient } from "@libsql/client";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = resolve(__dirname, "../data/portfolio.db");
const schemaPath = resolve(__dirname, "../data/schema.sql");
const projectsPath = resolve(__dirname, "../data/projects.json");
const skillsPath = resolve(__dirname, "../data/skills.json");

const schema = readFileSync(schemaPath, "utf-8");
const projects = JSON.parse(readFileSync(projectsPath, "utf-8"));
const skills = JSON.parse(readFileSync(skillsPath, "utf-8"));

const client = createClient({ url: `file:${dbPath}` });

/* ── Step 1: Drop tables (FK-safe: children first) ── */
console.log("Dropping existing tables...");
await client.executeMultiple(`
  DROP TABLE IF EXISTS project_images;
  DROP TABLE IF EXISTS project_keypoints;
  DROP TABLE IF EXISTS project_tags;
  DROP TABLE IF EXISTS skill_points;
  DROP TABLE IF EXISTS skills;
  DROP TABLE IF EXISTS projects;
`);

/* ── Step 2: Recreate schema ── */
console.log("Creating schema...");
await client.executeMultiple(schema);

/* ── Step 3: Seed in a single transaction ── */
console.log("Seeding...");
try {
  await client.execute("BEGIN");

  for (const p of projects) {
    await client.execute({
      sql: `INSERT INTO projects (id, name, teaser, text, featured, date, status, link, github)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        p.id,
        p.name,
        p.teaser,
        p.text,
        p.featured ? 1 : 0,
        p.date,
        p.status,
        p.link || "",
        p.github || "",
      ],
    });

    for (const tag of p.tags ?? []) {
      await client.execute({
        sql: `INSERT INTO project_tags (project_id, tag) VALUES (?, ?)`,
        args: [p.id, tag],
      });
    }

    for (let i = 0; i < (p.keyPoints ?? []).length; i++) {
      await client.execute({
        sql: `INSERT INTO project_keypoints (project_id, sort_order, keypoint)
              VALUES (?, ?, ?)`,
        args: [p.id, i, p.keyPoints[i]],
      });
    }

    for (let i = 0; i < (p.images ?? []).length; i++) {
      await client.execute({
        sql: `INSERT INTO project_images (project_id, sort_order, image_url)
              VALUES (?, ?, ?)`,
        args: [p.id, i, p.images[i]],
      });
    }
  }

  for (const s of skills) {
    await client.execute({
      sql: `INSERT INTO skills (id, name, icon) VALUES (?, ?, ?)`,
      args: [s.id, s.name, s.icon || ""],
    });

    for (let i = 0; i < (s.points ?? []).length; i++) {
      await client.execute({
        sql: `INSERT INTO skill_points (skill_id, sort_order, point)
              VALUES (?, ?, ?)`,
        args: [s.id, i, s.points[i]],
      });
    }
  }

  await client.execute("COMMIT");
} catch (err) {
  await client.execute("ROLLBACK");
  console.error("Seed failed, rolled back:", err);
  process.exit(1);
}

/* ── Step 4: Verify ── */
const tables = [
  "projects",
  "project_tags",
  "project_keypoints",
  "project_images",
  "skills",
  "skill_points",
];

const results = await client.batch(
  tables.map((t) => ({
    sql: `SELECT COUNT(*) as cnt FROM ${t}`,
    args: [],
  })),
);

console.log("\nSeed complete — row counts:");
tables.forEach((t, i) => {
  console.log(`  ${t}: ${results[i].rows[0].cnt}`);
});

client.close();
