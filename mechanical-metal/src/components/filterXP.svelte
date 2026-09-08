<script lang="ts">
  import { onMount } from 'svelte';
  import ProjectCard from './projectCard.svelte';
  import ProjectModal from './projectModal.svelte';

  let { projects = [] } = $props();

  let activeFilters: Set<string> = new Set();
  let filteredProjects: any[] = [];
  let allTags: Set<string> = new Set();
  let showModal = $state(false);
  let selectedProject: any = $state(null);
  let isInitialized = $state(false);

  // Extract all unique tags from projects and sort by date
  onMount(() => {
    if (projects && projects.length > 0) {
      // Sort projects by date
      projects.sort(
        (a: any, b: any) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
      );

      // Extract all unique tags
      projects.forEach((project) => {
        if (project.data && project.data.tags && Array.isArray(project.data.tags)) {
          project.data.tags.forEach((tag: string) => {
            allTags.add(tag);
          });
        }
      });

      // Initialize with all projects shown
      filteredProjects = [...projects];
      isInitialized = true;
    }
  });

  function toggleFilter(tag: string) {
    if (activeFilters.has(tag)) {
      activeFilters.delete(tag);
    } else {
      activeFilters.add(tag);
    }
    activeFilters = activeFilters; // Trigger reactivity
    updateFilteredProjects();
  }

  function updateFilteredProjects() {
    if (activeFilters.size === 0) {
      // Show all projects if no filters are active
      filteredProjects = [...projects];
    } else {
      // Show only projects that have at least one of the active filter tags
      filteredProjects = projects.filter((project) =>
        project.data && 
        project.data.tags && 
        project.data.tags.some((tag: string) => activeFilters.has(tag))
      );
    }
  }

  function clearFilters() {
    activeFilters.clear();
    activeFilters = activeFilters; // Trigger reactivity
    updateFilteredProjects();
  }

  function openModal(project: any) {
    selectedProject = project;
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    selectedProject = null;
  }
</script>

<div class="gallery-wrapper">
  <div class="filter-controls">
    <div class="filter-header">
      <h3>Filter by tags:</h3>
      {#if activeFilters.size > 0}
        <button class="clear-btn" on:click={clearFilters}>
          Clear all
        </button>
      {/if}
    </div>
    
    <div class="filter-buttons">
      {#each Array.from(allTags).sort() as tag (tag)}
        <button
          class="filter-btn"
          class:active={activeFilters.has(tag)}
          on:click={() => toggleFilter(tag)}
        >
          {tag}
        </button>
      {/each}
    </div>

    <div class="filter-status">
      {#if filteredProjects.length > 0}
        <span>Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}</span>
      {/if}
    </div>
  </div>

  {#if filteredProjects.length > 0}
    <div class="proj-gallery margin4">
      {#each filteredProjects as project (project.id)}
        <ProjectCard
          projectProps={project}
          on:select={() => {
            openModal(project);
          }}
        />
      {/each}
      {#if showModal}
        <ProjectModal projectProps={selectedProject} on:close={closeModal} />
      {/if}
    </div>
  {:else}
    <div class="no-results">
      <p>No projects found with the selected filters.</p>
    </div>
  {/if}
</div>

<style>
  .gallery-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .filter-controls {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
    background-color: var(--bg-secondary, rgba(255, 255, 255, 0.02));
    border-radius: var(--spacing1);
    border: 1px solid var(--secondary);
  }

  .filter-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .filter-header h3 {
    margin: 0;
    font-size: var(--fsize3);
  }

  .clear-btn {
    padding: 0.5rem 1rem;
    background-color: var(--secondary);
    border: none;
    border-radius: var(--spacing1);
    color: var(--text);
    cursor: pointer;
    font-size: var(--fsize1);
    transition: background-color 0.3s ease;
  }

  .clear-btn:hover {
    background-color: var(--primary);
  }

  .filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    background-color: var(--secondary);
    border: 2px solid transparent;
    border-radius: var(--spacing1);
    color: var(--text);
    cursor: pointer;
    font-size: var(--fsize1);
    transition: all 0.3s ease;
  }

  .filter-btn:hover {
    border-color: var(--primary);
  }

  .filter-btn.active {
    background-color: var(--primary);
    border-color: var(--primary);
    color: var(--bg);
  }

  .filter-status {
    font-size: var(--fsize1);
    color: var(--text-secondary, rgba(255, 255, 255, 0.7));
    margin-top: 0.5rem;
  }

  .proj-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: space-between;
    align-items: flex-start;
  }

  .no-results {
    width: 100%;
    text-align: center;
    padding: 3rem 1rem;
    color: var(--text-secondary, rgba(255, 255, 255, 0.6));
    font-size: var(--fsize2);
  }
</style>
