<script lang="ts">
  import type { Project, pDataEntry } from "../types/types";
  import ProjectCard from "./projectCard.svelte";
  import ProjectModal from "./projectModal.svelte";
  import {
    selectedProject,
    showModal,
    projModalStore,
    openModal,
  } from "../stores/projModalStore";

  const { projects, tags: filterTags } = $props();
  let activeFilters = $state(new Set<string>());
  let filteredProjects = $state<Project[]>([]);
  let sortedProjects: Project[] = [];

  // Initialize and sort projects when props change
  $effect(() => {
    if (projects && Array.isArray(projects)) {
      // Sort projects by date (newest first)
      const sorted = [...projects].sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      sortedProjects = sorted;
      filteredProjects = [...sorted];
    }
  });

  // Functions //
  function toggleFilter(filter: string) {
    const newFilters = new Set(activeFilters);
    if (newFilters.has(filter)) {
      newFilters.delete(filter);
    } else {
      newFilters.add(filter);
    }
    activeFilters = newFilters; // this triggeres the refresh
    updateFilteredProjects();
  }

  function updateFilteredProjects() {
    if (activeFilters.size === 0) {
      filteredProjects = [...sortedProjects]; // shows all
    } else {
      filteredProjects = sortedProjects.filter(
        (project) =>
          project &&
          project.tags &&
          project.tags.some((tag: string) => activeFilters.has(tag)),
      );
    }
  }
</script>

<div class="margin5">
  <!-- filter bar -->
  <div id="filter-box" class="container center">
    <div id="filter-bar">
      <h3 class="code-text">Filter</h3>
      {#each filterTags as t}
        <button
          class="chip-btn"
          class:active-chip={activeFilters.has(t)}
          onclick={() => toggleFilter(t)}>{t}</button
        >
      {/each}
    </div>
  </div>

  <!-- Gallery -->
  <div class="proj-gallery margin4">
    {#each filteredProjects as project (project.id)}
      <ProjectCard
        projectProps={project}
        on:select={() => openModal(project)}
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
