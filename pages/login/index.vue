<template>  
  <div class='login-area'>
    <v-container>    
      <div class='login-grid'>  
        <v-card class="elevation-10 login-card" >                         
         <h2 class='text-center h3 gray pb-2'>Login</h2>            
          <form action="" class='login-form mt-2' @submit.prevent="signin">   
          <!-- Email -->
            <v-text-field
            class='pt-4'
            label="email"
            v-model="form.email"            
            outlined 
            ></v-text-field>          
           <!-- PASSWORD -->
            <v-text-field           
            label="Senha"                          
            outlined 
            :type="show1 ? 'text' : 'password'"          
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            @click:append="show1 = !show1"       
            v-model="form.password"    
                     
            required               
            ></v-text-field>  
             <!-- Entrar -->
            <button class="primary btn">Login</button>
            <div class='pt-2'>
              <nuxt-link to="/registro" class='caption gray mt-2'>Não possui uma conta?</nuxt-link> 
            </div>         
          </form>                         
        </v-card>
      </div>       
    </v-container>
  </div>    
</template>

<script>
  export default {    
    data() {
      return {
        show1: false,
         form: {
          email: '',
          password: ''          
       },      
      }
    },
    methods: {      
        async signin () {
         await this.$auth.loginWith('local', {
            data: this.form            
          })
   
           this.$router.push({
              path: this.$route.query.redirect  || '/dashboard'
            })
        }  
        
      }
    }  
</script>

<style scoped>
.login-grid {   
  max-width: 500px;
  height: 100%;
  display: grid; 
  grid-template-columns: 1fr;
  justify-content: center;
  margin:  auto;
  align-items: center;
  padding-top: 6em;
  padding-bottom: 3em;  
}
.login-card {
  padding: 4em 1em;
}
  .login-form {   
   width: 70%;
   margin: 0 auto;        
  }

  .btn {
   
    width: 100%;
    padding: 0.8em;
    color: rgb(247, 247, 247);
  } 
</style>