<script setup lang="ts">
import { ref, watch } from 'vue';
import _ from 'lodash'


const props = defineProps(['data', 'name', 'categories', 'xlabel', 'ylabel', 'max', 'height'])

const series = ref([] as { name: string, data: number[] }[])

const chartOptions = {
    chart: {
        type: 'bar',
        stacked: true,
    },
    plotOptions: {
        bar: {
            horizontal: true,
            dataLabels: {
                total: {
                    enabled: true,
                    offsetX: 0,
                    style: {
                        fontSize: '10px',
                        fontWeight: 500,

                    }
                }
            }
        },
    },
    stroke: {
        width: 1,
        colors: ['#fff']
    },
    title: {
        text: props.name,
    },
    xaxis: {
        title: {
            text: undefined,
        },
        categories: [],
        decimalsInFloat: 0
    },
    yaxis: {
        title: {
            text: undefined,
        },
        max: props.max,
        decimalsInFloat: 0,
    },
    fill: {
        opacity: 1
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
    },
    dataLabels: {
        formatter: (val: number) => Math.round(val * 100) / 100,
    }
}



watch(props, () => {
    if (props.data) {
        series.value = props.data
        chartOptions.xaxis.categories = props.categories

        chartOptions.yaxis.title.text = props.ylabel
        chartOptions.xaxis.title.text = props.xlabel
        if (!props.max)
            chartOptions.yaxis.max = Math.max(...(_.zip(...props.data.map((d: { data: number }) => d.data)) as number[][]).map(d => d.reduce((partialSum, a) => partialSum + a, 0)))
    }
})



</script>

<template>
    <apexchart type="bar" ref="chart" :height="height || 40 * categories.length" :options="chartOptions"
        :series="series" />
</template>