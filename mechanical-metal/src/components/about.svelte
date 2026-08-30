<script lang="ts">
  /**
   * TODO:
   * Store the content in a data source -> maybe just begin the database conversion...\
   * Render ONLY the content for the current toggle
   */
import type { TabContent } from "../types/types";

  // Image URLs are passed in from astro parent for URL resolution
  let { whoImg, bgImg, hobbyImg } = $props();

  const toggles: string[] = ["Intro", "Background", "Interests/Hobbies"];
  const content = new Map<string, TabContent>();
  let currentToggle = $state<string>(toggles[0]);

  content.set(toggles[0], {
    heading: "Who's Abdu?",
    img: whoImg,
    caption: "I always appreciate a cafe with good roasts!",
    body: "This is all about me and me and me and meeee",
  });
  content.set(toggles[1], {
    heading: "Background",
    img: bgImg,
    caption: "BCIT Tech Collider.",
    body: "Video games and old PCs sparked my interest in tech early on, started coding Arduino boards and one thing lead to another.",
  });
  content.set(toggles[2], {
    heading: "Interests / Hobbies",
    img: hobbyImg,
    caption: "Jackie the Harris's hawk. New Mexico, USA. Circa 2017",
    body: "I like photographing nature and automobiles, the outdoors, Sci-Fi and Fantasy media, and music",
  });

  /// Functions ///

  /**
   * Set new selected toggle
   * @param newTog string value of the new toggle
   */
  function setToggle(newTog: string) {
    currentToggle = newTog; // triggers reactivity from Svelte
  }
</script>

<div class="container">
  <div id="toggle-bar" class="margin3 center">
    {#each toggles as tog}
      <button
        class="chip-btn"
        class:active-chip={currentToggle === tog}
        onclick={() => setToggle(tog)}
      >
        {tog}
      </button>
    {/each}
  </div>

  <!-- Content -->
  {#if content.get(currentToggle)}
    {@const current = content.get(currentToggle)!}
    <div id="content-box" class="margin3 padding2">
      <div class="content-img margin3">
        <img src={current.img} alt={current.heading} />
        <small>{current.caption}</small>
      </div>
      <div>
        <h3>{current.heading}</h3>
        <p>{current.body}</p>
      </div>
    </div>
  {/if}
</div>

<style>
  #content-box {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing5);
    align-items: center;
  }

  #content-box > * {
    flex: 1;
    min-width: 300px;
  }

  .content-img {
    display: flex;
    flex-direction: column;
    gap: var(--spacing1);
  }

  .content-img img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: var(--spacing1);
  }

  .content-img small {
    color: var(--accent);
    font-size: var(--fsize1);
  }
</style>
