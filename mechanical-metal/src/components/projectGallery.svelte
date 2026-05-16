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
  let selectedToggles = $state(new Set<string>());
  let filteredIds = $state(new Set<number>());
  const allTags = new Map<string, number[]>();
  const pMap = new Map<number, Project>();

  // Normalize IDs to number since everything's a string upon ingestion from JSON
  const normalizedProjects: pDataEntry[] = projects.map((p: pDataEntry) => ({
    ...p,
    data: { ...p.data, id: Number(p.data.id) },
  }));

  const sortedProjects = normalizedProjects.sort(
    (a: any, b: any) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );

  // Map projects by ID
  normalizedProjects.forEach((p: pDataEntry) => {
    if (!pMap.has(p.data.id)) pMap.set(p.data.id, p.data);
  });

  // Map tags to project IDs
  normalizedProjects.forEach((p: pDataEntry) => {
    if (p?.data?.tags && Array.isArray(p.data.tags)) {
      p.data.tags.forEach((tag: string) => {
        const cur = allTags.get(tag) ?? [];
        cur.push(p.data.id);
        allTags.set(tag, cur);
      });
    }
  });

  // Functions //
  function toggleFilter(filter: string) {
    const next = new Set(selectedToggles);
    if (next.has(filter)) {
      next.delete(filter);
    } else {
      next.add(filter);
    }
    selectedToggles = next;
    filterProjects(next);
  }

  function filterProjects(toggles = selectedToggles) {
    if (toggles.size === 0) {
      filteredIds = new Set<number>();
      return;
    }
    const next = new Set<number>();
    toggles.forEach((t: string) => {
      allTags.get(t)?.forEach((id: number) => next.add(id));
    });
    filteredIds = next;
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
          class:active-chip={selectedToggles.has(t)}
          onclick={() => toggleFilter(t)}>{t}</button
        >
      {/each}
    </div>
  </div>

  <!-- Gallery -->
  <div class="proj-gallery margin4">
    {#if selectedToggles.size === 0}
      {#each sortedProjects as project}
        <ProjectCard
          projectProps={project}
          on:select={() => projModalStore.openModal(project)}
        />
      {/each}
    {:else}
      {#each Array.from(filteredIds) as filteredId}
        {@const project = sortedProjects.find((p) => p.data.id === filteredId)}
        {#if project}
          <ProjectCard
            projectProps={project}
            on:select={() => projModalStore.openModal(project)}
          />
        {/if}
      {/each}
    {/if}

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
