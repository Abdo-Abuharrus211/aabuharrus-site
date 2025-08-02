<script>
  import { createEventDispatcher } from "svelte";
  let { projectProps } = $props();

  const projText = projectProps.data.text;

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
      <p id="proj-text">{@html projText}</p>
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
              width="48"
              height="48"
              viewBox="0 0 24 24"
              ><path
                fill="none"
                stroke="currentColor"
                stroke-dasharray="28"
                stroke-dashoffset="28"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0"
                ><animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.6s"
                  values="28;0"
                /></path
              ></svg
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
        <img
          class="proj-thumbnail"
          src={images[current]}
          alt={projectProps.data.name}
        />
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
            alt={`${projectProps.data.name}`}
          />
        </div>
      {/if}
      <!-- If ya need to add more details in the future,here -->
      <ul class="margin3">
        {#each projectProps.data.keyPoints as point}
          <li>{@html point}</li>
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
