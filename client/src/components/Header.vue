<template>
  <header>
    <img :src="pencilSrc" alt="Odraw icon" />
    <h1>o'Draw</h1>
  </header>
</template>

<script lang="ts" setup>
  import pencilSrc from "../assets/pencil.svg";


</script>

<style scoped>
  /* Le style "scoped" est uniquement appliqué aux éléments du composant en question */
  header {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  img {
    width: 50px;
  }

  h1 {
    font-size: 3rem;
    text-align: center;
    margin: 0.5rem;
  }
</style>
