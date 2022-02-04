<script setup lang="ts"></script>

<template>
  <h1>Hi, sheet!</h1>
  <HSheet
    visible
    class="sheet-test"
  >
    <div class="sheet-test-content">
      LOL, hi there! I am wrapped in sheet...
    </div>
  </HSheet>
  <h1>Hi, button!</h1>
  <HButton>Hello. I am button.</HButton>
</template>

<style>
@import "@/styles/variables.css";

body {
  background-color: var(--holo-base-dark);
  color: var(--holo-base-light);
}

h1 {
  color: var(--holo-highlight);
  font-family: var(--holo-display-font);
}

/* Component-specific styles */

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
  background: var(--holo-base-light);
}
</style>
