<template>
  <div class="wrapper">
    <NuxtPwaManifest />
    <nav>
      <nuxt-link to="/">Home</nuxt-link> |
      <nuxt-link to="/pico-voice">Picovoice Page</nuxt-link>
    </nav>
    <NuxtPage />
  </div>
</template>
<style>
 .wrapper {
  padding: 1rem;
 }

 button {
  margin-right: 0.5rem;
  background-color: gold;
  padding: 0.5rem 1rem;
  border: gold 1px solid;
  font-weight: bold;
  border-radius: 0.5rem;
  letter-spacing: .4ch;
  cursor: pointer;
}

button:hover {
  background-color: goldenrod;
  border: goldenrod 1px solid;
  color: navajowhite;
}

button:disabled {
  background-color: lightgray;
  border: lightgray 1px solid;
  color: gray;
  pointer-events: none;
}

code {
  background: #f4f4f4;
  border-radius: 0.5rem;
  padding: 1rem;
}

</style>
