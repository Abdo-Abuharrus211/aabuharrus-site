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
  import { onMount } from "svelte";

  const { projects, tags: filterTags } = $props();

  let selectedToggles = $state(new Set<string>());
  let filteredIds = $state(new Set<number>());
  const allTags = new Map<string, number[]>();
  // mapped projects
  const pMap = new Map<number, Project>();
  const sortedProjects = projects.sort(
    (a: any, b: any) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );
  // mapping projects
  sortedProjects.forEach((p: pDataEntry) => {
    if (!pMap.has(p.id)) pMap.set(p.id, p.data);
  });

  onMount(() => {
    // map tags to project IDs
    sortedProjects.forEach((p: pDataEntry) => {
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
    console.log(pMap.entries().next().value?.[1]);
  });

  // Functions
  function filterProjects() {
    filteredIds.clear();
    // need if grabbing from set and maps?
    Array.from(selectedToggles).forEach((t: string) => {
      const IDs: number[] = allTags.get(t);
      if (IDs) {
        IDs.forEach((id) => {
          filteredIds.add(id);
        });
      }
    });
    filteredIds = filteredIds; // svelte refresh
  }

  function toggleFilter(filter: string) {
    if (selectedToggles.has(filter)) {
      selectedToggles.delete(filter);
    } else {
      selectedToggles.add(filter);
    }
    selectedToggles = selectedToggles; // triggers Svelte refresh
    filterProjects();
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
          onclick={() => {
            // TODO: add the selected class for styling -> Needs a unique key per chip btn..?
            toggleFilter(t);
            this.classList.toggle("active-chip");
          }}>{t}</button
        >
      {/each}
    </div>
  </div>
  <!-- Gallery -->
  <div class="proj-gallery margin4">
    {#if selectedToggles.size == 0}
      {#each sortedProjects as project}
        <ProjectCard
          projectProps={project}
          on:select={() => {
            projModalStore.openModal(project);
          }}
        />
      {/each}
    {:else}
      {#each Array.from(filteredIds) as pId}
        <ProjectCard
          projectProps={pMap.get(pId)}
          on:select={() =>
            projModalStore.openModal({ id: pId, data: pMap.get(pId) })}
        />
      {/each}
    {/if}

    <!-- {#each sortedProjects as project}
      <ProjectCard
        projectProps={project}
        on:select={() => {
          projModalStore.openModal(project);
        }}
      />
    {/each} -->
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
