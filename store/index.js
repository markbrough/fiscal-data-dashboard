import axios from 'axios'
import config from '../nuxt.config'
import Vue from 'vue'
import csvtojson from 'csvtojson'


export const state = () => ({
  data: [],
  dataURL: "https://docs.google.com/spreadsheets/d/19fOyxPE9KWe9jj8SERa8z5HNNBEwSHSi0bn_ki8ZSAs/gviz/tq?tqx=out:csv&sheet=series"
})


export const mutations = {
  setData(state, data) {
    state.data = data
  }
}


export const actions = {
  async getData({ commit, state }) {
    function makeNumber(value) {
      const _value = parseFloat(value.replace(/,/g, ""))
      if (isNaN(_value)) { return 0.00 }
      return _value
    }
    const monthNumber = {
      'JAN': '01',
      'FEB': '02',
      'MAR': '03',
      'APR': '04',
      'MAY': '05',
      'JUN': '06',
      'JUL': '07',
      'AUG': '08',
      'SEP': '09',
      'OCT': '10',
      'NOV': '11',
      'DEC': '12'
    }
    function makeDateFromRow(row) {
      return makeDate(`${row['YEAR']}-${monthNumber[row['MONTHS']]}-01`)
    }
    function makeDate(value) {
      /* Dates are now formatted in ISO format (yyyy-mm-dd) */
      return new Date(value)
    }
    return await this.$axios.$get(`${state.dataURL}`, {
        headers: {
        }
      }).then(data => {
        csvtojson({colParser: {
            'DOMESTIC REVENUE': (item, head, resultRow, row, colIDx) => {
              return makeNumber(item)
            },
            ' EXPENDITURE ': (item, head, resultRow, row, colIDx) => {
              return makeNumber(item)
            }
          }}).fromString(data).then((csvJson=> {
          const data = csvJson.map(item => {
            item['Date'] = makeDateFromRow(item)
            return item
          }).filter(item => {
            const now = new Date()
            return item['Date'] < new Date(now.getFullYear(), now.getMonth(), 1)
          })
          commit('setData', data)
        }))
    })
  }
}
