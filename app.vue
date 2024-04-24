<template>
  <div class="wrapper">
    <NuxtPwaManifest />
    <nav>
      <nuxt-link to="/">Home</nuxt-link> |
      <nuxt-link to="/pico-voice">Picovoice Page</nuxt-link>
    </nav>
    <dialog id="dialogBox" open>
      <form method="dialog">
        <p>Click me to get started.</p>
        <button autofocus>OK</button>
      </form>
    </dialog>
    <NuxtPage />
  </div>
</template>
<style>
 .wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  min-width: 100dvw;
 }

 dialog {
  position: absolute;
  inset: 0;
  z-index: 10;
  border-radius: 1rem;
  border-color: white;
  box-shadow: 0 0 1rem 0.5rem rgba(0, 0, 0, 0.15);
  padding: 1rem;
}

::backdrop {
  background-image: linear-gradient(
    45deg,
    magenta,
    rebeccapurple,
    dodgerblue,
    green
  );
  opacity: 0.75;
}


</style>
