<script lang="ts">
  export let projectProps: {
    id: string | number;
    data: {
      name: string;
      imagePath: string;
      tags: string[];
    };
  };

  console.log("should be rendering")

  // Placeholder for click handler
  function showProject() {
    // TODO: implement showProject logic
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  id={`proj-${projectProps.id}-card`}
  class="card left-accent-tab proj-card click-hover"
  on:click={showProject}
>
  <h2>// {projectProps.data.name}</h2>
  <img
    class="margin3 proj-thumbnail"
    src={projectProps.data.imagePath}
    alt="{projectProps.data.name} image"
  />
  <div class="proj-tags-box">
    {#each projectProps.data.tags as tag}
      <p class="tag">{tag}</p>
    {/each}
  </div>
</div>

<style>
  .proj-card {
    width: 30%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: var(--spacing3);
  }

  .proj-thumbnail {
    object-fit: cover;
    border-radius: var(--spacing1);
  }
  .proj-tags-box {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .tag {
    font-size: var(--fsize2);
    margin: 0;
    padding: var(--spacing1);
    background-color: var(--secondary);
    border-radius: var(--spacing1);
    display: inline-block;
  }
  @media (max-width: 700px) {
    .proj-card {
      width: 100%;
      margin: 0.5rem 0;
    }
    .proj-thumbnail {
      height: 140px;
    }
  }
</style>
