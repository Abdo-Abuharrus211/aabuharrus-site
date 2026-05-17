<script lang="ts">
  import { onMount } from "svelte";
  import { openModal } from "../stores/projModalStore";

  let { projects = [] } = $props();

  let currentIndex = $state(0);
  let autoRotateInterval: ReturnType<typeof setInterval> | null = null;
  let isTransitioning = $state(false);
  let nextIndex = $state(0);

  // start auto-rotation if there are featured projects
  onMount(() => {
    if (projects.length > 1) {
      startAutoRotate();
    }

    // crucial cleanup on mount, resets intervals...
    return () => {
      if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
      }
    };
  });

  function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
      goToNextProject();
    }, 5000);
  }

  /**
   * Move the carousel to the selected project
   * @param index of the project to move to
   */
  function goToProject(index: number) {
    if (isTransitioning || index === currentIndex) return;

    nextIndex = index;
    isTransitioning = true;

    // gotta wait for animation to complete
    setTimeout(() => {
      currentIndex = index;
      isTransitioning = false;
    }, 400);

    // Restart the auto-rotation timer when user interacts
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
    }
    startAutoRotate();
  }

  function goToNextProject() {
    goToProject((currentIndex + 1) % projects.length);
  }

  function goToPrevProject() {
    goToProject((currentIndex - 1 + projects.length) % projects.length);
  }

  // proj to be rendered
  const currentProject = $derived(projects[currentIndex]);
  const displayProject = $derived(
    isTransitioning ? projects[nextIndex] : projects[currentIndex],
  );
</script>

{#if projects.length > 0}
  <!-- TODO: add click on the div -->
  <div id="feat-projects" class="carousel-container margin3">
    <div class={`carousel-slide ${isTransitioning ? "transitioning" : ""}`}>
      <div class="carousel-img-box">
        <img
          src={displayProject.images[0]}
          alt={displayProject.name}
        />
      </div>

      <div class="carousel-content">
        <h2 class="margin0">{displayProject.name}</h2>
        <p class="teaser">{displayProject.teaser}</p>
        <div>
          {#if displayProject.link}
            <a
              href={displayProject.link}
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
          {#if displayProject.github}
            <a
              href={displayProject.github}
              target="_blank"
              aria-label="Github url"
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
          <button onclick={() => openModal(displayProject)}>more</button>
        </div>
      </div>
    </div>

    <!-- Dot Navigation -->
    <div class="dot-box">
      {#each projects as _, index (index)}
        <button
          class="dot"
          class:active={currentIndex === index}
          onclick={() => goToProject(index)}
          aria-label={`Go to project ${index + 1}`}
          disabled={isTransitioning}
        ></button>
      {/each}
    </div>
  </div>
{:else}
  <div class="no-featured">
    <p>No featured projects yet.</p>
  </div>
{/if}

<style>
  .carousel-container {
    position: relative;
    width: 100%;
    border: 1px solid var(--secondary);
    border-radius: var(--spacing2);
    /* background-color: var(--subbackground); */
    overflow: hidden;
    padding: var(--spacing3);
  }

  .carousel-slide {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--spacing3);
    align-items: stretch;
  }

  .carousel-slide.transitioning {
    animation: slideIn 0.4s ease-in-out forwards;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .carousel-img-box {
    width: 100%;
    height: 100%;
    min-height: 400px;
    overflow: hidden;
    border-radius: var(--spacing1);
  }

  .carousel-img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .carousel-container:hover .carousel-img-box img {
    transform: scale(1.02);
  }

  .carousel-content {
    margin-left: var(--spacing2);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: flex-start;
    padding: var(--spacing) 0;
  }

  .carousel-content h2 {
    font-family: var(--fcode);
  }
  .carousel-content a,
  button {
    margin-right: var(--spacing3);
  }

  .teaser {
    margin: 0;
    font-size: var(--fsize2);
  }
  .links {
    display: flex;
    gap: 1.5rem;
    margin-top: 1rem;
  }

  /* Dot Navigation */
  .dot-box {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin: var(--spacing3) auto 0;
    padding-top: var(--spacing2);
    width: fit-content;
    /* border-top: 1px solid var(--secondary); */
  }

  .dot {
    width: var(--spacing1);
    height: var(--spacing1);
    border-radius: 50%;
    border: 2px solid var(--secondary);
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  .dot:hover:not(:disabled) {
    border-color: var(--primary);
    transform: scale(1.1);
  }

  .dot.active {
    background-color: var(--primary);
    border-color: var(--primary);
  }

  .dot:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .no-featured {
    padding: var(--spacing3);
    text-align: center;
    color: var(--text-secondary, rgba(255, 255, 255, 0.6));
    font-size: var(--fsize2);
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .carousel-slide {
      grid-template-columns: 1fr 1.2fr;
      gap: var(--spacing2);
    }

    .carousel-img-box {
      min-height: 350px;
    }

    .carousel-content h2 {
      font-size: var(--fsize3);
    }

    .teaser {
      font-size: var(--fsize1);
    }
  }

  @media (max-width: 700px) {
    .carousel-container {
      padding: var(--spacing2);
    }

    .carousel-slide {
      grid-template-columns: 1fr;
      gap: var(--spacing2);
    }

    .carousel-img-box {
      min-height: 250px;
      order: -1;
    }

    .carousel-content {
      padding: 0;
    }

    .carousel-content h2 {
      font-size: var(--fsize3);
    }

    .teaser {
      font-size: var(--fsize1);
    }

    .nav-arrow {
      display: none;
    }

    .dot-box {
      margin-top: var(--spacing2);
      padding-top: var(--spacing2);
      gap: 0.5rem;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-width: 1px;
    }
  }
</style>
