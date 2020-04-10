<template>
    <div class="dashboard">  
    <v-container class="width-95 grey lighten-5 mt-3 d-flex center">                  
    <vue-card-slide></vue-card-slide>
        </v-container>    
        
          
    </div>
</template>
<script>   

export default {

    layout: 'proDash', 
    data(){
      return {
      profissionais: [],    
      }
    },
      async asyncData({
        app
    }) {
        let profissionais = await app.$axios.$get('profissionalRegister')
        return {
            profissionais: profissionais.data
        }
    }     
}
</script>

<style>

</style>
