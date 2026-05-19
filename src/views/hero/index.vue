<template>
  <div class="hero">
    <TopBar title="英雄"/>
    <div class="content">
      <div class="left">
        <hero-list :default-index="0" :roles="allHeroes" @item-click="onHeroClick"/>
      </div>
      <div class="right card" :class="{ show: hero }">
        <template v-if="hero">
          <div class="hero-name">{{ hero.name }}</div>
          <div class="up-level card">
            <div>
              当前等级：Lv.{{ hero.level }}
            </div>
            <div>
              升级消耗：{{ hero.level * 200 }}
            </div>
            <a-button ghost @click="upLevel">升级</a-button>
          </div>
          <div class="hero-content">
            <div>
              <div style="margin-bottom: 10px">个人信息</div>
              <div class="hero-info">
                <div class="item">血量：{{ hero.raw.hp }}</div>
                <div class="item">攻击：{{ hero.atk }}</div>
                <div class="item">防御：{{ hero.def }}</div>
                <div class="item">速度：{{ hero.speed }}</div>
                <div class="item">暴击：{{ hero.crit }}</div>
                <div class="item">闪避：{{ hero.dodge }}</div>
                <div class="item">血量成长：{{ hero.hp_up }}</div>
                <div class="item">攻击成长：{{ hero.atk_up }}</div>
                <div class="item">防御成长：{{ hero.def_up }}</div>
                <div class="item">速度成长：{{ hero.speed_up }}</div>
                <div class="item">暴击成长：{{ hero.crit_up }}</div>
                <div class="item">闪避成长：{{ hero.dodge_up }}</div>
              </div>
            </div>
            <div class="hero-equipment">
              <div>装备</div>
              <Grid/>
              <div>主动技能</div>
              <Grid/>
              <div>被动技能</div>
              <Grid/>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {allHeroes, buyBySoul, layer, soul} from "@/game/store.ts";
import {ref, watch} from "vue";
import type {Hero} from "@/common/entity/Role.ts";
import TopBar from "@/components/TopBar.vue";
import Grid from "@/components/Grid.vue";
import {saveGame} from "@/common/storage/save.ts";
import {message} from "ant-design-vue";
import HeroList from "@/components/HeroList.vue";

const hero = ref<Hero | undefined>(undefined)
const activeIndex = ref(0)

const onHeroClick = (index: number) => {
  activeIndex.value = index
  hero.value = allHeroes[index]
}

watch(allHeroes, () => {
  hero.value = allHeroes[activeIndex.value]
})

const upLevel = async () => {
  if (hero.value) {
    const needSoul = hero.value.level * 200
    await buyBySoul(needSoul)
    hero.value.upLevel()
    saveGame()
  }
}
</script>
<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 20px);
}

.content {
  flex: 1;
  display: flex;
  gap: 10px;
}

.left {
  width: 300px;
}

.right {
  width: 0;
  transition: none;
  background-color: #212D47;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.right.show {
  flex: 3;
}

.hero-name {
  font-size: 20px;
}

.up-level {
  width: min-content;
  text-wrap: nowrap;
  padding: 10px 20px;
  display: flex;
  gap: 20px;
  align-items: center;
}

.hero-content {
  padding: 10px 0;
  display: flex;
  gap: 20px;

  .hero-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    background-color: #17233D;
    border-radius: 10px;

    .item {
      display: flex;
      justify-content: space-between;
    }
  }

  .hero-equipment {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

</style>