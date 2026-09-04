import { createClient } from "@libsql/client/web";

const url = import.meta.env.TURSO_DATABASE_URL;
const authToken = import.meta.env.TURSO_AUTH_TOKEN_READONLY;

export const turso = url ? createClient({ url, authToken }) : null;
