<script lang="ts">
  import ProjectCard from "./projectCard.svelte";
  import ProjectModal from "./projectModal.svelte";
  import { selectedProject, showModal, projModalStore } from "../stores/projModalStore";

  let { projects } = $props();

  const sortedProjects = projects.sort(
    (a: any, b: any) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );
</script>

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

<style>
  .proj-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: space-between;
    align-items: flex-start;
  }
</style>
