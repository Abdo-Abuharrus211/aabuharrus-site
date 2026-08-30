<script lang="ts">
  /**
   * TODO:
   * SRefactor for the database conversion...\
   */
  import type { TabContent } from "../types/types";

  // Image URLs are passed in from astro parent for URL resolution
  let { whoImg, bgImg, hobbyImg } = $props();

  const toggles: string[] = ["Intro", "Background", "Interests"];
  const content = new Map<string, TabContent>();
  let currentToggle = $state<string>(toggles[0]);

  content.set(toggles[0], {
    heading: "Who's Abdu?",
    img: whoImg,
    caption: "I always appreciate a good coffee roast!",
    body: `I'm a software developer with a variety of project experiences, across various tech stacks and domains.\nBuilding things that make life easier for myself and others.`,
  });
  content.set(toggles[1], {
    heading: "Background",
    img: bgImg,
    caption: "BCIT Tech Collider.",
    body:"I'm from Tripoli, Libya.\nOld computers and video games sparked my interest in technology early on.\nI started coding Arduino Uno boards and one thing lead to another...\nI'm currently based in Vancouver, BC",
  });
  content.set(toggles[2], {
    heading: "Interests, Hobbies, and Obsessions",
    img: hobbyImg,
    caption: "Jackie the Harris's hawk. New Mexico, USA, 2017",
    body: `My wide range of interests include photography (nature and automobiles), aquariums, gardening, café hopping, the outdoors, travelling, gaming, and more!.\nSlowly learning guitar...`,
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
        <h2>{current.heading}</h2>
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

  #content-box p{
    font-size: var(--fsize2);
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

  /* Honor \n line breaks in the body strings while still wrapping normally */
  #content-box p {
    white-space: pre-line;
  }
</style>
