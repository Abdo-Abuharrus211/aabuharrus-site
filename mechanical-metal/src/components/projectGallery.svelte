<script lang="ts">
  import ProjectCard from "./projectCard.svelte";
  import ProjectModal from "./projectModal.svelte";

  let { projects } = $props();
  // State to track the modal
  let showModal = $state(false);
  let selectedProject: any = $state(null);

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

<style>
  .proj-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    align-items: flex-start;
  }
</style>
