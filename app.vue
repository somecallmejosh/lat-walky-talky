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
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  min-width: 100dvw;
  padding: 1rem;
 }

 button {
  margin-right: 0.5rem;
}

code {
  background: #f4f4f4;
  border-radius: 0.5rem;
  padding: 1rem;
}

</style>
