// For more about this check out https://docs.astro.build/en/guides/content-collections/

// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';
// 2. Import loader(s)
import { glob, file } from 'astro/loaders'; 

/* TODO: Will likely use the `file` loader since most of the data will live in a single JSON file.
    "Use this loader when your data file can be parsed as an array of objects."
*/

// 3. Define your collection(s)
const projects = defineCollection({ 
    loader: file("src/data/projects.json"),
    schema: z.object({
        // TODO: define the schemas
    })
});

const skills = defineCollection({ /* ... */ });
// const hobbies = defineCollection({/*..*/});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { projects, skills};