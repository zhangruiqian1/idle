<template>
  <TopBar :title="`第${layer}层 第${round}回合`"/>
  <div class="tower">
    <div class="battle">
      <Battle/>
    </div>
    <div class="bottom">
      <Logcat class="logcat card"/>
      <Stats class="stats"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import Logcat from "@/components/Logcat.vue";
import Stats from "@/components/Stats.vue";
import Battle from "@/components/Battle.vue";
import {layer, round, soul} from "@/game/store.ts";
import TopBar from "@/components/TopBar.vue";


</script>
<style scoped>
.tower {
  display: flex;
  gap: 20px;
  flex-direction: column;
}

.battle {
  width: 800px;
}

.bottom {
  width: 100%;
  display: flex;
  gap: 20px;
  height: 400px;
}

.logcat {
  flex: 1;
}

.stats {
  width: 400px;
  height: 400px;
}
</style>