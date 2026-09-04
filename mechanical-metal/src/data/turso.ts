import { createClient } from "@libsql/client";

const url = import.meta.env.TURSO_DATABASE_URL;
const authToken = import.meta.env.TURSO_AUTH_TOKEN;

export const turso = url ? createClient({ url, authToken }) : null;
