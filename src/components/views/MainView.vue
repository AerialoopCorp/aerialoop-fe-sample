<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import { isDark } from '~/composables';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

declare interface Aircraft {
  name: string,
  take_offs?: number
}

const data = ref([] as Aircraft[])
const power = ref<[number, number][]>([])

onMounted(() => {
  data.value = [{
    name: 'WQ6-001',
    take_offs: 10
  }, 
    {
    name: 'WQ6-002',
    take_offs: 20
  }]

  power.value = [[1, 2], [2, 4], [4, 10]]
      
})

const chart_data = computed(() => {
  return [
    {
      name: 'Take offs',
      data: data.value.filter(a => a.take_offs).map(a => a.take_offs)
    }
  ]
})

const chart_categories = computed(() => {
  return data.value.filter(a => a.take_offs).map(a => a.name)
})

</script>

<template>
  <div id="login" class="w-200 m-auto m-t-10">
    <div class="m-b-05">
      <img :src="!isDark ? '/images/logo_azul.svg' : '/images/logo_blanco.svg'" />
    </div>
    <el-card>
      <StackedBarChart :name="t('views.dashboard.title')" :data="chart_data"
                       :categories="chart_categories" xlabel="Take offs"
                       ylabel="Aircrafts" height="500" />

      <Chart :data="power" :name="t('views.dashboard.title')" />
    </el-card>
  </div>
</template>






