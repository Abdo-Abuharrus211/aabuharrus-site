<script lang="ts">
  import type { Project } from "../types/types";
  import ProjectCard from "./projectCard.svelte";
  import ProjectModal from "./projectModal.svelte";
  import {
    selectedProject,
    showModal,
    projModalStore,
  } from "../stores/projModalStore";

  const { projects, tags } = $props();

  const sortedProjects = projects.sort(
    (a: any, b: any) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );

  /**
   * TODO:
   * filtering for tags
   * rendering based on IDs that have the tags...
   *
   */

  // mapped projects
  const pMap = new Map<number, Project>();
  projects.forEach((p) => {
    if (!pMap.has(p.id)) pMap.set(p.id, p.data);
  });

  console.log(pMap);

  // map with tags as keys array of IDs as value
  const allTags = new Map<string, number[]>();
  // Extract all unique tags
  projects.forEach((p: Project) => {
    if (p && p.data.tags && Array.isArray(p.data.tags)) {
      p.data.tags.forEach((tag: string) => {
        if (allTags.has(tag)) {
          let cur: number[] = allTags.get(tag);
          cur.push(p.id);
          allTags.set(tag, cur);
        } else {
          allTags.set(tag, [p.id]);
        }
      });
    }
  });

  const selectedToggles: Set<string> = new Set();
</script>

<div class="margin5">
  <!-- filter bar -->
  <div id="filter-box" class="container center">
    <div id="filter-bar">
      <h3 class="code-text">Filter</h3>
      {#each tags as t}
        <button
          class="chip-btn"
          onclick={() => {
            // TODO: add the selected class for styling
            selectedToggles.has(t)
              ? selectedToggles.delete(t)
              : selectedToggles.add(t);
          }}>{t}</button
        >
      {/each}
    </div>
  </div>
  <!-- Gallery -->
  <div class="proj-gallery margin4">
    {#each sortedProjects as project}
      <ProjectCard
        projectProps={project}
        on:select={() => {
          projModalStore.openModal(project);
        }}
      />
    {/each}
    {#if $showModal}
      <ProjectModal
        projectProps={$selectedProject}
        on:close={() => projModalStore.closeModal()}
      />
    {/if}
  </div>
</div>

<style>
  .proj-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: space-between;
    align-items: flex-start;
  }
</style>
