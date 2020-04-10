<template>
<v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app color='primary' dark>
        <div class='text-center white--text py-5'>
            <v-icon size="120" dark>mdi-account-circle</v-icon>
            <div class='subtitle'>{{ user.email }}</div>
        </div>

        <v-list dense>
            <!-- <a :href="slugs"></a> -->
            <template v-for="item in items" router :to="item.route">
                <v-row v-if="item.heading" :key="item.heading" align="center">
                    <v-col cols="6">
                        <v-subheader v-if="item.heading">
                            {{ item.heading }}
                        </v-subheader>
                    </v-col>
                    <v-col cols="6" class="text-center">
                        <a href="#!" class="body-2 black--text">EDIT</a>
                    </v-col>
                </v-row>
                
                <v-list-group v-else-if="item.children" :key="item.text" v-model="item.model" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
                    <template v-slot:activator>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ item.text }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                    <v-list-item v-for="(child, i) in item.children" :key="i" link router :to="child.route">
                        <v-list-item-action v-if="child.icon">
                            <v-icon>{{ child.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ child.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
                <v-list-item v-else :key="item.text" router :to="item.route" link>
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color='primary' dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
            <span class="hidden-sm-and-down font-weight-bold letter-spacing-1">Dashboard</span>
        </v-toolbar-title>

        <!-- <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Pesquisar"
        class="hidden-sm-and-down"
      /> -->
        <v-spacer />
        <template v-if="authenticated">
            <ul class='d-flex align-center font-weight-bold'>
                <li class='mr-3' style='white-space: nowrap;'>
                    <v-icon size='18' color='green'>fiber_manual_record</v-icon>
                </li>
                <li class='mr-4' style='white-space: nowrap;'>{{ user.name }}</li>
                <li class='mr-4 text-lowercase' style='white-space: nowrap;'>{{ user.ability }}</li>
                <li class='mr-4' style='white-space: nowrap;'><a style="color: #fff;" href="" @click.prevent="signOut">sair</a></li>
                <li>
                    <v-btn icon large>
                        <v-icon color="grey lighten-2" large>
                            mdi-account-circle
                        </v-icon>
                    </v-btn>
                </li>

            </ul>
        </template>
    </v-app-bar>
    <v-content class='bg-content'>
        <Nuxt />
    </v-content>
    <v-btn bottom class='mb-5' style='background: #363855;' dark fab fixed right @click="dialog = !dialog">

        <v-icon class='white--text'>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" class='dialog-card' width="900">
        <v-card color='grey lighten-5' class='custom-card'>
            <v-card-title class="white--text gray">
                <span class='center grey--text lighten-3 mb-5 pb-5 headline font-weight-light letter-spacing-4'>Criação Rápida</span>
            </v-card-title>
            <v-container fluid class="width-95 pt-5">
                <v-row>
                    <v-col cols="12" xs="12" sm='6' md='6' lg="3" v-for="(dataFirst, i) in DashFirstData" :key="i" class='center'>
                        <v-card hover class="card-padding pa-custom text-center grey lighten-5 d-flex flex-column justify-space-between align-center" flat @click="dialog = !dialog" width="300px">
                            <nuxt-link :to="dataFirst.route">
                                <v-icon size="60" class='white--text' color='grey darken-2'>{{ dataFirst.icon }}</v-icon>
                                <v-card-title class='font-weight-medium grey--text'>
                                    {{ dataFirst.name }}
                                </v-card-title>
                            </nuxt-link>

                        </v-card>
                    </v-col>
                    <v-col>

                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
    <v-dialog v-model="welcome" class='dialog-card' width="900">
        <v-card color='grey lighten-5' class='custom-card d-flex flex-column align-content-around'>
            <div class='center'>
                <img class='welcome-img' src="~/assets/imagens/integrace_professional-welcome.png" alt='users'>
            </div>
            <v-card-title class="white--text gray center">
                <h2 class='text-center mt-4 h2'>Olá, {{ user.name }}</h2>
            </v-card-title>
            <v-card-content>
                <v-container>
                    <p class='font-weight-regular pa-5 gray text-center p'>{{ welcomeMessage }}</p>
                </v-container>
            </v-card-content>
            <v-card-actions>
                <v-btn class='center mt-5 btn-custom white--text' dark large @click="welcome = !welcome">Navegar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-app>
</template>

<script>
export default {
    middleware: 'auth',
    props: {
        source: String,
    },
    created() {
        this.slugs = '/profissional-adm/perfil/' + this.$store.getters['auth/user'].slug
    },
    methods: {
        async signOut() {
            await this.$auth.logout()
        }
    },
    data: () => ({

        dialog: false,
        welcome: true,
        welcomeMessage: 'Olá seja bem vindo ao seu painel de controle! ',
        drawer: null,
        slugs: '',
        DashFirstData: [{
                icon: 'assignment',
                text: '99',
                name: 'Perfil',
                route: '/profissional-adm/perfil'
            },
            {
                icon: 'assignment',
                text: '99',
                name: 'Orcamentos',
                route: '/profissional-adm/perfil'
            },

        ],
        items: [{
                icon: 'dashboard',
                text: 'Dash',
                name: 'Currículo',
                route: '/profissional-adm'
            },

            {
                icon: 'assignment',
                text: 'perfil',
                name: 'Perfil',
                //Aqui embaixo
                route: '/profissional-adm/perfil/'
            },

            {
                icon: 'mdi-chevron-up',
                'icon-alt': 'mdi-chevron-down',
                text: 'Adicionar',
                model: true,
                children: [{
                        icon: 'mdi-plus',
                        text: 'Usuário',
                        route: '/dashboard/adicionar-usuario'
                    },
                    {
                        icon: 'mdi-plus',
                        text: 'profissional',
                        route: '/dashboard/adicionar-profissional'
                    },
                    {
                        icon: 'mdi-plus',
                        text: 'Empresa',
                        route: '/dashboard/adicionar-empresa'
                    },
                    {
                        icon: 'mdi-plus',
                        text: 'Orçamento',
                        route: '/dashboard/adicionar-orcamento'
                    },
                ],
            },
            {
                icon: 'mdi-settings',
                text: 'Configurações',
                route: "/dashboard/configuracoes"
            },
            {
                icon: 'mdi-message',
                text: 'Responder Mensagens',
                route: "/dashboard/responder-mensagens"
            },
            {
                icon: 'mdi-cellphone-link',
                text: 'Ir para o App',
                route: "/"
            },
        ],
    }),
}
</script>

<style>
.inspire {
    background-color: #6a737d !important;

}

.bg-content {
    background-color: #f1f2f7;
}

.width-95 {
    max-width: 95%;
}

.custom-padding {
    padding: 5em 1em !important;
}

.custom-card {
    padding: 3.8em 0 5.2em 0em;
}

.pa-custom {
    padding: 1.6em 1em;
}
</style>
