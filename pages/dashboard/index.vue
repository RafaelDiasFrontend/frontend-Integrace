<template>
    <div class="dashboard">
  <!-- GRID --> 
  <v-container fluid class="width-95 grey lighten-5 mt-3">
    <v-row>
      <v-col       
        cols="12"
        xs="12"
        sm='6'
        md='6'
        lg="3"       
        v-for="(dataFirst, i) in DashFirstData" 
        :key="i"  
      >
        <v-card
          
          class="pa-5 text-center d-flex justify-space-between align-center"
         flat
                                    
        >      
          <v-icon size="42">{{ dataFirst.icon }}</v-icon>
          <span class='headline font-weight-bold gray'> {{ dataFirst.text}}</span>       
        </v-card>
      </v-col>
    </v-row>
  </v-container>
   {{ orcamentos }}
    </div>
</template>

<script>
export default {
 
  layout: 'admin',
  data() {
    return {
      orcamentos: [],
      DashFirstData: [
        { icon: 'people', text: '100' },
        { icon: 'person', text: '30' },
        { icon: 'business', text: '15' },
        { icon: 'assignment', text: '145' },
      ],
       loginCount: 0,
    }
  },
  methods: {
    async asyncData ({ app }) {
      let orcamentos = await app.$axios.$get('budgets')
      return {
        orcamentos: orcamentos.data
      }
    }
  }
}

</script>

<style>

</style>