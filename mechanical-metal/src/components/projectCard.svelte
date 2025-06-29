<script lang="ts">
  import { createEventDispatcher } from "svelte";
  let showModal = $state(false);
  let { projectProps } = $props();

  // Dispatch the event to projectGallery
  const dispatch = createEventDispatcher<{ select: typeof projectProps }>();
  function showProject() {
    dispatch("select", projectProps);
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  id={`proj-${projectProps.id}-card`}
  class="card left-accent-tab proj-card click-hover"
  onclick={showProject}
>
  <h2>// {projectProps.data.name}</h2>
  <img
    class="margin3 proj-thumbnail"
    src={projectProps.data.images[0]}
    alt="{projectProps.data.name} image"
  />
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
