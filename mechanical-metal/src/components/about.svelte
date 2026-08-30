<script lang="ts">
  /**
   * TODO:
   * Store the content in a data source -> maybe just begin the database conversion...\
   * Render ONLY the content for the current toggle
   */
import type { TabContent } from "../types/types";

  import bioHeadshot from "../images/cafe-roast-pfp.jpg";
  import eduPhoto from "../images/bcit-tech-collider.webp";
  import hobbyPhoto from "../images/Jackie.webp";

 

  const toggles: string[] = ["Who's Abdu?", "Background", "Interests/Hobbies"];
  const content = new Map<string, TabContent>(); // toggle -> content object
  let currentToggle = $state<string>(toggles[0]);

  content.set(toggles[0], {
    heading: "Who's Abdu?",
    img: bioHeadshot,
    caption: "Fueled by a good café roast.",
    body: "This is all about me and me and me and meeee",
  });
  content.set(toggles[1], {
    heading: "Background",
    img: eduPhoto,
    caption: "BCIT Tech Collider.",
    body: "Video games and old PCs sparked my interest in tech early on, started coding Arduino boards and one thing lead to another.",
  });
  content.set(toggles[2], {
    heading: "Interests / Hobbies",
    img: hobbyPhoto,
    caption: "Out and about with the camera.",
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

  /**
   * Switch the content displayed, triggering Svelte reactivity
   */
  function switchContent() {}
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
    <div id="content-box margin3 padding2">
      <div class="content-img margin3">
        <img src="https://picsum.photos/1200/720" alt="placeholder-img" />
        <small>Img Caption Here...</small>
      </div>
      <div>
      <h3>Heading Here</h3>
        <p>{content?.get(currentToggle)}</p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. In molestias
          eos ducimus architecto asperiores excepturi ad ratione adipisci
          voluptatem dolore tempora quo, et odio quaerat amet magnam expedita
          dolorem modi!
        </p>
      </div>
    </div>
</div>

<style>
</style>
