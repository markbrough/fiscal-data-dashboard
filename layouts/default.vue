<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-container>
        <b-navbar-brand :to="'/'" class="fiscal-dashboard-brand">
          <img src="/flag-lr.png" alt="Flag of Liberia" />
          Fiscal Data Dashboard</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item exact-active-class="active" :to="{name: 'index'}">
              Summary
            </b-nav-item>
          </b-navbar-nav>
          <!--
          <b-navbar-nav class="ml-auto">
            <b-nav-item active-class="active" :to="{name: 'index'}">
              About
            </b-nav-item>
          </b-navbar-nav>
          -->
        </b-collapse>
      </b-container>
    </b-navbar>
    <b-container fluid class="fiscal-dashboard-container">
      <nuxt />
    </b-container>
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
footer {
  background-color: #00276c;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.fiscal-dashboard-navbar {
  background-color: #00276c;
}
.fiscal-dashboard-brand {
}
.fiscal-dashboard-brand img {
  padding-right: 5px;
}

.fiscal-dashboard-container {
  margin: 0px auto;
  min-height: 70vh;
  min-width:100%;
  padding-top:40px;
  padding-bottom: 40px;
}
.number-value {
  text-align: right;
}

.last-updated {
  font-style: italic;
}
</style>
<script>
import config from '../nuxt.config'

export default {
  components: {
  },
  data() {
    return {
      title: config.head.title
    }
  },
  methods: {
    async loadData() {
      this.$nuxt.$loading.start()
      await this.$store.dispatch('getData')
      this.$nuxt.$loading.finish()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadData()
    })
  }
}
</script>
