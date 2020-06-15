<template>
  <div class="line-chart-container">
    <LineChart
      :data="chartData"
      :options="chartOptions"
      class="line-chart"></LineChart>
  </div>
</template>
<style scoped>
.line-chart-container {
  max-width: 100%;
  overflow-x: scroll;
}
.line-chart {
  height: 600px;
  min-width: 800px;
}
.pie-chart {
  height: 400px;
}
</style>
<script>
import LineChart from '~/components/charts/line-chart'
export default {
  name: 'SummaryLineChart',
  components: {
    LineChart
  },
  props: ['barChartData', 'labelField', 'valueField',
    'pctField', 'valueLabel', 'valuePrecision', 'step',
    'chartType', 'commitments', 'maximumValues', 'colour'],
  data() {
    return {
      colours: [
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#9467bd",
        "#8c564b",
        "#e377c2",
        "#7f7f7f",
        "#bcbd22",
        "#17becf"
      ]
    }
  },
  computed: {
    chartOptions() {
      const tooltips = {
        callbacks: {
          title: ((tooltipItem, data) => {
            return this.dateFormatter(this.chartData.labels[tooltipItem[0].index])
          }),
          label: ((tooltipItem, data) => {
            var label = this.chartData.datasets[tooltipItem.datasetIndex].label || '';

            if (label) {
                label += ': USD ';
            }
            var value = this.chartData.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            if (this.valuePrecision) {
              label += this.numberFormatter(value)
            } else {
              label += value
            }
            return label;
          })
        }
      }
      const scales = {
        yAxes: [
          {
            id: 'y-axis-left',
            position: 'left',
            ticks: {
              beginAtZero: true,
              precision: this.valuePrecision,
              stepSize: this.step ? this.step : undefined,
              callback: (tick) => {
                return this.numberFormatter(tick)
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Amount (USD)'
            },
            gridLines: {
              display: false
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              callback: (tick) => {
                return this.dateFormatter(tick)
              }
            },
            gridLines: {
              display: false
            }
          }
        ]
      }
      const legend = {
        display: true
      }
      return {
        maintainAspectRatio: false,
        legend: legend,
        tooltips: tooltips,
        scales: scales,
        layout: {
          padding: 20
        }
      }
    },
    chartData() {
      return {
        datasets: [
        {
          label: "Revenue",
          fill: false,
          data: this.makeData("DOMESTIC REVENUE"),
          backgroundColor: this.colours[0],
          borderColor: this.colours[0],
          stroke: this.colours[0],
          yAxisID: 'y-axis-left',
        },
        {
          label: "Expenditure",
          fill: false,
          data: this.makeData(" EXPENDITURE "),
          backgroundColor: this.colours[1],
          borderColor: this.colours[1],
          yAxisID: 'y-axis-left',
        }],
        labels: this.makeLabels(this.labelField),
      }
    }
  },
  methods: {
    makeData(valueField) {
      var _data = this.barChartData.map((ds) => {
        return ds[valueField]
      })
      return _data
    },
    makeLabels(labelField) {
      return this.barChartData.map((ds) => { return ds[labelField] })
    },
    dateFormatter(value) {
      return value ? value.toISOString().substr(0,10) : ""
    },
    numberFormatter(value) {
      return value ? value.toLocaleString(undefined, {
        maximumFractionDigits: 0
      }) : ""
    }
  }
}
</script>
