import { createClient } from "@libsql/client";

export const turso = createClient({
  url: "file:./src/data/portfolio.db",
});
