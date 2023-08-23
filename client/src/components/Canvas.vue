<template>
  <main>
    <div class="grid" :style="gridStyle">
      <div
        v-for="cellIndex in GRID_SIZE * GRID_SIZE"
        :key="cellIndex"
        @click="sendPixel(cellIndex - 1)"
        ref="cellRefs"
      ></div>
    </div>

    <div class="color">
      <label for="color">Choisir une couleur</label>
      <input type="color" id="color" v-model="colorRef">
    </div>
  </main>
</template>

<script setup lang="ts">
  import { io, Socket } from "socket.io-client";
  import { onMounted, ref } from "vue";

  const GRID_SIZE = 100;
  const gridStyle = `grid-template-columns: repeat(${GRID_SIZE}, 1fr)`;

  const cellRefs = ref<HTMLElement[]>([]); // cellRefs.value = [{}, {}, {}, ... ] tableau d'élément du DOM
  const colorRef = ref<string>("#FF00FF");
  
  let socket: Socket;

  // Mettre en place la connexion websocket uniquement lorsque le composant est effectivement "monté" = sur le DOM
  onMounted(() => {
    socket = io();

    socket.on("pixel", displayPixel);
    socket.on("pixels", displayPixels);
  });

  function sendPixel(cellIndex: number) {
    const x = cellIndex % GRID_SIZE;
    const y = Math.floor(cellIndex / GRID_SIZE);
    const color = colorRef.value; // La couleur choisie par l'utilisateur
    
    const pixel = { x, y, color };
    socket.emit("pixel", pixel); // On envoie le pixel au serveur via le tunnel "socket"
  }

  function displayPixel(pixel: Pixel) {
    // Selectionner le bon pixel !
    const cellIndex = pixel.y * GRID_SIZE + pixel.x;
    const cell = cellRefs.value[cellIndex]; // LE pixel à update

    // Changer sa couleur !
    cell.style.backgroundColor = pixel.color;
  }

  function displayPixels(pixels: Pixel[]) {
    pixels.forEach(displayPixel);
  }

  interface Pixel {
    x: number;
    y: number;
    color: string;
  }

</script>

<style scoped>
  main {
    display: flex;
    align-items: center;
  }

  .color {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }


  .grid {
    display: grid;
    width: fit-content;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    cursor: pointer;
  }

  .grid div {
    width: 6px;
    height: 6px;
  }
</style>