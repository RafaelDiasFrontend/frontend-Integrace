import Vue from 'vue'
import { mapGetters } from 'vuex'

    const User = {
        install(Vue, options) {
            Vue.mixin({
                computed: {
                    ...mapGetters({
                        user: 'auth/user',
                        authenticated: 'auth/authenticated',  
                        logincount: 'auth/logincount', 
                        ability: 'auth/ability', 
                        email: 'auth/email', 
                        birthday: 'auth/birthday',
                        crea: 'auth/crea',
                        slug: 'auth/slug'                            
                    })
                }
            })
        }
    };

    Vue.use(User);