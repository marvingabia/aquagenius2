<template>
  <div class="water-level-monitor">
    <h3>Water Level Monitor</h3>
    <div class="level-bar">
      <div class="fill" :style="{ height: level + '%' }"></div>
    </div>
    <p>{{ level }}% Full</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const level = ref(65); // Example value, replace with real data
</script>

<style scoped>
.level-bar {
  width: 40px;
  height: 120px;
  border: 1px solid #2196F3;
  border-radius: 8px;
  margin: 0 auto 10px;
  background: #e3f2fd;
  position: relative;
}
.fill {
  background: #2196F3;
  width: 100%;
  position: absolute;
  bottom: 0;
  transition: height 0.3s;
}
</style>

<!-- Example usage in Dashboard.vue -->
<template>
  <div>
    <WaterlevelMonitor />
    <Purificationmanager />
    <!-- ...rest of your dashboard... -->
  </div>
</template>

<script setup>
import WaterlevelMonitor from '../components/WaterlevelMonitor.vue';
import Purificationmanager from '../components/Purificationmanager.vue';
</script>