<template>
  <div>
    <b-container>
      <h2>Fiscal Dashboard</h2>

      <template v-if="fiscalData.length==0">
        <div class="text-center text-secondary">
          <hr />
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
          <hr />
        </div>
      </template>
      <template v-else>
        <h3>Summary</h3>
        <b-row class="mb-2">
          <b-col>
            <LineChart :barChartData="fiscalData"
            labelField="Date"
            valueLabel="Amount (USD)"
            valueField="amount"
            valuePrecision="2"
            chartType="line"
            :maximumValues="maximumValues" />
          </b-col>
        </b-row>
        <hr />
        <h3>Data</h3>
        <b-table
        :items="fiscalData"
        :fields="fiscalDataTableFields"
        striped
        fixed
        responsive>
        </b-table>
      </template>
    </b-container>
  </div>
</template>
<style scoped>

</style>
<script>
import config from '../nuxt.config'
import LineChart from '~/components/LineChart.vue'

export default {
  components: {
    LineChart
  },
  data() {
    return {
      title: config.head.title,
      maximumValues: 10
    }
  },
  computed: {
    fiscalData() {
      return this.$store.state.data
    },
    fiscalDataTableFields() {
      return [
      { key: 'Date', label: 'Date', sortable: true, formatter: 'dateFormatter' },
      { key: 'DOMESTIC REVENUE', label: 'Revenue (USD)', sortable: true, formatter: 'numberFormatter', class: 'number-value' },
      { key: ' EXPENDITURE ', label: 'Expenditure (USD)', sortable: true, formatter: 'numberFormatter', class: 'number-value'  }
      ]
    }
  },
  methods: {
    makeNumber(value) {
      const _value = parseFloat(value.replace(/,/g, ""))
      if (isNaN(_value)) { return 0.00 }
      return _value
    },
    dateFormatter(value) {
      return value ? value.toISOString().substr(0,10) : ""
    },
    numberFormatter(value) {
      return value ? value.toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      }) : ""
    }
  }
}
</script>
