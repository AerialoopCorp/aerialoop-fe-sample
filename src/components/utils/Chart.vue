<script setup lang="ts">
import { ref, watch } from 'vue';



const props = defineProps(['data', 'name'])

const series = [{
    name: props.name,
    data: [] as number[]
}]

const chartOptions = {
    chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
        },
        toolbar: {
            autoSelected: 'zoom'
        }
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0,
    },
    title: {
        text: props.name,
        align: 'left'
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.8,
            opacityTo: 0.3,
            stops: [0, 90, 100]
        },
    },
    xaxis: {
        labels: {
            formatter: function (val: number) {
                return props.data && props.data.length ? ((val - props.data[0][0]) / 1000000).toFixed(0) : val;
            },
        },
        title: {
            text: 'Timestamp (s)'
        },
        tickAmount: 11,
        categories: [] as number[]
    },
    yaxis: {
        title: {
            text: 'Power (W)'
        },
        labels: {
            formatter: function (val: number) {
                return val.toFixed(0);
            },
        },
    },

    tooltip: {
        shared: false,
        x: {
            formatter: function (val: number) {
                return `${val} s`
            }
        }
    }

}

const chart = ref(null)


watch(props, () => {
    if (props.data) {
        series[0].data = props.data.map((d: any[]) => d[1])
        chartOptions.xaxis.categories = props.data.map((d: any[]) => d[0])
    }
})



</script>

<template>
    <apexchart ref="chart" height="350" :options="chartOptions" :series="series" />
</template>