<script>
  import { createEventDispatcher } from "svelte";
  let { projectProps } = $props();
  const dispatch = createEventDispatcher();

  function close() {
    dispatch("close");
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="modal-overlay" onclick={close}>
  <div class="modal-content" onclick={stopPropagation}>
    <button class="modal-close outline-btn" onclick={close}>&times;</button>
    <h1>{projectProps.data.name}</h1>
    <p>{projectProps.data.text}</p>
    <img
      src={projectProps.data.imagePath}
      alt={`${projectProps.data.name} image`}
    />
    <!-- Add more project details as needed -->
  </div>
</div>

<style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal-content {
    background: var(--subbackground);
    padding: 2rem;
    border-radius: 12px;
    max-width: 60%;
    max-height: 80%;
    overflow: auto;
    position: relative;
  }
  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    background: none;
    border: none;
    /* cursor: pointer; */
    /* color: var(--primary); */
  }
</style>
