<script setup lang="ts">
import { ref } from 'vue'

const sliderVal = ref(35)
const checkboxVal = ref(false)
const loadingStuff = ref(false)
const radioVal = ref('')
</script>

<template>
  <div class="holo-root">
    <div id="buttons">
      <h1>Hi, button!</h1>
      <HButton>Hello. I am button.</HButton>
      <HButton color="okay">
        I am okay button.
      </HButton>
      <HButton color="caution">
        I am cautious button.
      </HButton>
      <HButton color="destructive">
        I am DANGER button.
      </HButton>
      <HButton
        color="okay"
        borderless
      >
        I am borderless.
      </HButton>
      <HButton
        color="caution"
        hollow
      >
        I am hollow.
      </HButton>
      <HButton
        color="highlight"
        hollow
        borderless
      >
        I am both, only text.
      </HButton>
      <HButton
        disabled
        color="destructive"
      >
        Eww. Don't touch me.
      </HButton>
      <HButton
        disabled
        borderless
        color="caution"
      >
        Noooo.
      </HButton>
      <HButton
        disabled
        hollow
        color="destructive"
      >
        Eek!
      </HButton>
      <HButton
        disabled
        hollow
        borderless
        color="highlight"
      >
        Stealth mode activate
      </HButton>
    </div>
    <div id="sliders">
      <h1>Hi, Slider!</h1>
      <HSlider
        v-model="sliderVal"
        color="highlight"
        step="0.1"
      />
      <HSlider
        v-model="sliderVal"
        color="highlight"
        disabled
        step="0.1"
      />
      <HSlider
        v-model="sliderVal"
        thin
        color="destructive"
        min="-100"
      />
      <HSlider
        v-model="sliderVal"
        no-fill
        color="primary"
        max="69"
      />
    </div>
    <div id="checkboxes">
      <h1>Hi, checkbox!</h1>
      <HCheckbox
        v-model="checkboxVal"
        color="okay"
        :loading="loadingStuff"
      >
        This is {{ checkboxVal }}
      </HCheckbox>
      <HCheckbox
        v-model="loadingStuff"
        color="highlight"
      >
        Things are loading
      </HCheckbox>
    </div>
    <div id="radios">
      <h1>Hi, radio!</h1>
      <HRadio
        v-model="radioVal"
        value="r1"
        color="okay"
        :loading="loadingStuff"
      >
        This
      </HRadio>
      <HRadio
        v-model="radioVal"
        value="r2"
      >
        Or this
      </HRadio>
    </div>
  </div>
</template>

<style>
@import "@/styles/variables.css";

* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}

.holo-root {
  position: relative;
  z-index: 0;
  min-height: 100vh;
  padding: 2em;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

h1 {
  color: hsl(var(--highlight));
}

/* Component-specific styles */

.border-test {
  --frame-outset: 0.2em;

  width: 300px;
  height: 100px;
  margin: 2em 1em;
  padding: 1em;
  background-color: #fff6;
  border: hsl(var(--primary));
}

.border-test:hover {
  --corner-size: 5em;
  --frame-outset: -2px;
}

.sheet-test {
  width: 500px;
  height: 100px;
  margin: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sheet-test-content {
  padding: 2em;
  background: hsl(var(--foreground));
}
</style>
