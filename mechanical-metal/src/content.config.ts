// This file is used to define the data collections and schemas.
// For more about this check out https://docs.astro.build/en/guides/content-collections/

// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';
// import "./data"
// 2. Import loader(s)
import { file } from 'astro/loaders';

/* Using the `file` loader since most of the data will live in a single JSON file.
    "Use this loader when your data file can be parsed as an array of objects."
*/

// 3. Define your collection(s)
const projects = defineCollection({
    loader: file("src/data/projects.json"),
    schema: z.object({
        // TODO: define the schemas
        name: z.string(),
        imagePath: z.string(),
        date: z.string(),
        text: z.string(),
        keyPoints: z.array(z.string()), //array of string for the bullet points
        link: z.string(),
        github: z.string(),
        status: z.enum(["Planning", "Upcoming", "In Progress", "Completed", "Paused"]),
        tags: z.array(z.string()),
    })
});

const skills = defineCollection({
    loader: file("src/data/skills.json"),
    schema: z.object({
        name: z.string(),
        icon: z.string(),
        points: z.array(z.string()),
    })
});
// const hobbies = defineCollection({/*..*/});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { projects, skills };