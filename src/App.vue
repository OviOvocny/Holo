<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(false)
const systemDark = ref(true)
const noHolo = ref(false)
const sliderVal = ref(35)
const checkboxVal = ref(false)
const loadingStuff = ref(false)
const radioVal = ref('')
const radioGroupVal = ref('')
const inputVal = ref(5)
const notifVisible = ref(false)
const notifLongVisible = ref(false)
</script>

<template>
  <HRoot
    class="padded"
    :dark-appearance="isDark"
    :uses-system-appearance="systemDark"
    :no-holograms="noHolo"
  >
    <HAGrid
      template="auto / 1fr 1fr 100px"
    >
      <HArea area="1 / 1 / 2 / 3">
        <HList label="Test List">
          <template #shortcuts>
            <HButton>?</HButton>
            <HButton>?</HButton>
            <HButton>?</HButton>
          </template>
          <HListItem>
            <template #symbol>
              🤨
            </template>
            <span>{{ inputVal }}</span>
            <template #decoration>
              0/10
            </template>
          </HListItem>
          <HListItem>b</HListItem>
          <HListItem>
            <template #symbol>
              🤨
            </template>
            <HList label="Nested">
              <HListItem>1</HListItem>
              <HListItem>2</HListItem>
              <HListItem>3</HListItem>
            </HList>
          </HListItem>
          <HListItem v-if="noHolo">
            LOL
          </HListItem>
        </HList>
      </HArea>
    </HAGrid>
    <br>
    <HCheckbox
      v-model="systemDark"
    >
      Use dynamic system theme
    </HCheckbox>
    <HCheckbox
      v-model="isDark"
      :disabled="systemDark"
    >
      Dark appearance
    </HCheckbox>
    <HCheckbox
      v-model="noHolo"
    >
      Disable holograms
    </HCheckbox>

    <div>
      <HAlert color="caution">
        Hello I am important! Pay attention to me.
        <br>
        LISTEN!
        <br><br>This is an alert, ok?
        <HButton>Oh ok</HButton>
      </HAlert>
    </div>

    <div id="buttons">
      <h1>button</h1>
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
      <h1>Slider</h1>
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
      <h1>checkbox</h1>
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
      <HCheckbox
        v-model="checkboxVal"
        disabled
      >
        This is disabled
      </HCheckbox>
    </div>
    <div id="radios">
      <h1>radio</h1>
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
      <HRadio
        v-model="radioVal"
        value="r3"
        disabled
      >
        But not this
      </HRadio>
      <h2>Radio group shorthand</h2>
      <HRadioGroup
        v-model="radioGroupVal"
        :options="{1: 'One', 2: 'Two'}"
      />
    </div>
    <div class="inputfields">
      <h1>input fields</h1>
      <HInputField label="Hello? This is a text field!" />
      <HInputField
        v-model="inputVal"
        type="number"
        label="Numbers good"
        color="okay"
        min="0"
        max="10"
      />
    </div>
    <div class="textareas">
      <h1>text areas</h1>
      <HTextArea
        label="Hi"
        :rows="4"
      />
    </div>
    <div class="files">
      <h1>file readers</h1>
      <HFile label="I eat files..." />
    </div>
    <div class="notifications">
      <h1>notifications</h1>
      <HButton @click="notifVisible = true">
        Show 2s
      </HButton>
      <HButton @click="notifLongVisible = true">
        Show {{ inputVal }}s
      </HButton>
      <HNotification
        v-model="notifLongVisible"
        :timeout="inputVal * 1000"
        color="primary"
      >
        <template #title>
          Title
        </template>
        Numbers good? {{ inputVal }}
      </HNotification>
      <HNotification v-model="notifVisible">
        Bye after 2s
      </HNotification>
    </div>
  </HRoot>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}

h1 {
  color: hsl(var(--highlight));
}

.padded {
  padding: 2em;
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
