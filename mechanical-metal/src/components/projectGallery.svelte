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

  // map with tags as keys array of IDs as value
  const allTags = new Map<string, number[]>();
  // mapped projectsd
  const pMap = new Map<number, Project>();
  projects.forEach((p: Project) => {
    if (!pMap.has(p.id)) pMap.set(p.id, p);
  });

  const selectedToggles: string[] = [];
  /**
   * TODO:
   * Click handle for the toggle buttons
   * filtering for tags
   * rendering based on IDs that have the tags...
   *
   */
</script>

<div class="margin5">
  <div id="filter-box" class="container center">
    <div id="filter-bar">
      <h3 class="code-text">Filter</h3>
      {#each tags as t}
        <button class="chip-btn">{t}</button>
      {/each}
    </div>
  </div>
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
