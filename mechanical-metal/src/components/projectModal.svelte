<script>
  import { createEventDispatcher } from "svelte";
  let { projectProps } = $props();

  let current = $state(0);
  const images = projectProps.data.images;

  function prev() {
    current = (current - 1 + images.length) % images.length;
  }
  function next() {
    current = (current + 1) % images.length;
  }

  const dispatch = createEventDispatcher();

  function close() {
    dispatch("close");
  }

  function stopPropagation() {
    event.stopPropagation();
  }

  // Event listener for Esc key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dispatch("close");
    }
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="modal-overlay" onclick={close}>
  <div class="modal-content container" onclick={stopPropagation}>
    <button
      class="modal-close outline-btn"
      onclick={close}
      aria-label="close-modal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-dasharray="12"
          stroke-dashoffset="12"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 12l7 7M12 12l-7 -7M12 12l-7 7M12 12l7 -7"
          ><animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.3s"
            values="12;0"
          /></path
        ></svg
      >
    </button>
    <div class="details-box">
      <h2>{projectProps.data.name}</h2>
      <p>{projectProps.data.text}</p>
      <div class="url-box padding2">
        {#if projectProps.data.link !== ""}
          <a
            href={projectProps.data.link}
            target="_blank"
            aria-label="Project URL"
          >
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              ><path
                fill="currentColor"
                d="M9.367 2.25H9.4a.75.75 0 0 1 0 1.5c-1.132 0-1.937 0-2.566.052c-.62.05-1.005.147-1.31.302a3.25 3.25 0 0 0-1.42 1.42c-.155.305-.251.69-.302 1.31c-.051.63-.052 1.434-.052 2.566v5.2c0 1.133 0 1.937.052 2.566c.05.62.147 1.005.302 1.31a3.25 3.25 0 0 0 1.42 1.42c.305.155.69.251 1.31.302c.63.051 1.434.052 2.566.052h5.2c1.133 0 1.937 0 2.566-.052c.62-.05 1.005-.147 1.31-.302a3.25 3.25 0 0 0 1.42-1.42c.155-.305.251-.69.302-1.31c.051-.63.052-1.434.052-2.566v-1.1a.75.75 0 0 1 1.5 0v1.133c0 1.092 0 1.958-.057 2.655c-.058.714-.18 1.317-.46 1.869a4.75 4.75 0 0 1-2.076 2.075c-.552.281-1.155.403-1.869.461c-.697.057-1.563.057-2.655.057H9.367c-1.092 0-1.958 0-2.655-.057c-.714-.058-1.317-.18-1.868-.46a4.75 4.75 0 0 1-2.076-2.076c-.281-.552-.403-1.155-.461-1.869c-.057-.697-.057-1.563-.057-2.655V9.367c0-1.092 0-1.958.057-2.655c.058-.714.18-1.317.46-1.868a4.75 4.75 0 0 1 2.077-2.076c.55-.281 1.154-.403 1.868-.461c.697-.057 1.563-.057 2.655-.057M13.5 3a.75.75 0 0 1 .75-.75H21a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V4.81l-6.97 6.97a.75.75 0 1 1-1.06-1.06l6.97-6.97h-4.94A.75.75 0 0 1 13.5 3"
              /></svg
            >
          </a>
        {/if}
        {#if projectProps.data.github !== ""}
          <a
            href={projectProps.data.github}
            target="_blank"
            aria-label="GitHub URL"
          >
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
              ></path>
            </svg>
          </a>
        {/if}
      </div>

      {#if 1 < images.length}
        <div class="proj-carousel center">
          <button
            class="carousel-btn left"
            onclick={prev}
            aria-label="Previous image"
          >
            <svg
              style="color: var(--secondary);"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              ><path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 12H4m0 0l6-6m-6 6l6 6"
              /></svg
            >
          </button>
          <img
            class="proj-thumbnail"
            src={images[current]}
            alt="{projectProps.data.name} image"
          />
          <button
            class="carousel-btn right"
            onclick={next}
            aria-label="Next image"
          >
            <svg
              style="color: var(--secondary);"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              ><path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 12h16m0 0l-6 6m6-6l-6-6"
              /></svg
            >
          </button>
        </div>
        <div class="carousel-indicators">
          {#each images as _, idx}
            <span class:active={idx === current}></span>
          {/each}
        </div>
      {:else}
        <div class="center">
          <img
            class="proj-thumbnail"
            src={projectProps.data.images[0]}
            alt={`${projectProps.data.name} image`}
          />
        </div>
      {/if}
      <!-- If ya need to add more details in the future,here -->
      <ul class="margin3">
        {#each projectProps.data.keyPoints as point}
          <li>{point}</li>
        {/each}
      </ul>
      <div class="flex">
        <div class="tag-box margin2">
          {#each projectProps.data.tags as tag}
            <p class="tag">{tag}</p>
          {/each}
        </div>
      </div>
    </div>
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
    font-size: var(--fsize3);
  }

  .proj-carousel {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .carousel-btn {
    color: var(--text);
    cursor: pointer;
    padding: 0 var(--spacing2);
  }

  .proj-thumbnail {
    object-fit: cover;
    border-radius: var(--spacing1);
    width: 80%;
  }

  .carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  .carousel-indicators span {
    display: block;
    width: var(--spacing2);
    height: var(--spacing2);
    background: var(--secondary);
    border-radius: 50%;
  }
  .carousel-indicators .active {
    background: var(--accent);
  }
</style>
