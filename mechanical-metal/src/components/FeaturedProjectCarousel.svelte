<script lang="ts">
  import { onMount } from 'svelte';

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
  const displayProject = $derived(isTransitioning ? projects[nextIndex] : projects[currentIndex]);
</script>

{#if projects.length > 0}
  <div class="carousel-container">
    <div class={`carousel-slide ${isTransitioning ? 'transitioning' : ''}`}>
      <div class="carousel-img-box">
        <img
          src={displayProject.data.images[0]}
          alt={displayProject.data.name}
        />
      </div>

      <div class="carousel-content">
        <h2 class="margin0">{displayProject.data.name}</h2>
        <p class="teaser">{displayProject.data.teaser}</p>

        <!-- <div class="tag-box">
          {#each displayProject.data.tags as tag (tag)}
            <span class="tag">{tag}</span>
          {/each}
        </div> -->

        <div>
          {#if displayProject.data.link}
            <a href={displayProject.data.link} target="_blank">
              Site
            </a>
          {/if}
          {#if displayProject.data.github}
            <a href={displayProject.data.github} target="_blank">
              GitHub
            </a>
          {/if}
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
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: flex-start;
    padding: var(--spacing2) 0;
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
    gap: var(--spacing2);
    margin-top: var(--spacing3);
    padding-top: var(--spacing2);
    /* border-top: 1px solid var(--secondary); */
  }

  .dot {
    width: var(--spacing2);
    height: var(--spacing2);
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
