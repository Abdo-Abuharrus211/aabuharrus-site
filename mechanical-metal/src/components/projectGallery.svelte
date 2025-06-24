<script lang="ts">
  import ProjectCard from "./projectCard.svelte";
  import ProjectModal from "./projectModal.svelte";

  export let projects: any[] = [];

  let showModal = false;
  let selectedProject: any = null;

  function openModal(project: any) {
    selectedProject = project;
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    selectedProject = null;
  }
</script>

<div class="proj-gallery margin4">
  {#each projects as project}
    <ProjectCard projectProps={project} on:click={() => openModal(project)} />
  {/each}
</div>
{#if showModal && selectedProject}
  <ProjectModal projectProps={selectedProject} on:close={closeModal} />
{/if}

<style>
  .proj-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    align-items: flex-start;
  }
</style>
