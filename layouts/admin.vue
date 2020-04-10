<template>
<v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
        <v-list dense>
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

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app class='bg-primary-gradient' dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
            <span class="hidden-sm-and-down font-weight-bold text-uppercase letter-spacing-2">ADMIN</span>
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
            <v-icon size='18' class='pr-2' color='green'>fiber_manual_record</v-icon>
            <h3 class='mr-4' style='white-space: nowrap;'>{{ user.name }} </h3>
            <h3 class='mr-4' style='white-space: nowrap;'>{{ user.loginCount }} </h3>
            <h3 class='mr-4' style='white-space: nowrap;'>{{ user.ability }} </h3>
            <h3 class='ml-1 mr-4'>
                <a style="color: #fff;" href="" @click.prevent="signOut">Sair</a>
            </h3>
        </template>

        <v-btn icon>
            <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn icon large>
            <v-avatar size="32px" item>
                <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify" />
            </v-avatar>
        </v-btn>
    </v-app-bar>
    <v-content>
        <Nuxt />
    </v-content>
    <v-btn bottom class='mb-5' style='background: #363855;' dark fab fixed right @click="dialog = !dialog">

        <v-icon class='white--text'>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" class='dialog-card' width="900">
        <v-card color='grey lighten-5' class='custom-card'>
            <v-card-title class="white--text gray">
                <span class='center grey--text lighten-3 mb-5 pb-5 headline font-weight-light letter-spacing-4'>Criar Rápido</span>
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
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>

    <template v-if="user.loginCount == '1'">
        <v-dialog v-model="welcome" class='dialog-card' width="900">
            <v-card color='grey lighten-5' class='custom-card d-flex flex-column align-content-around'>
                <v-card-title class="white--text gray center">
                    <span class='text-center mb-5 h2'>Bem-vindo</span>
                </v-card-title>
                <v-card-content>
                    <p class='h3 font-weight-medium pt-4 gray text-center'>Aqui é o seu painel de controle</p>
                </v-card-content>
                <v-card-actions>
                    <v-btn class='center mt-5 primary-btn white--text' dark large @click="welcome = !welcome">Explorar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </template>

</v-app>
</template>

<script>
export default {
    middleware: 'auth',
    props: {
        source: String,
    },
    methods: {
        async signOut() {
            await this.$auth.logout()
        }
    },
    data: () => ({
        dialog: false,
        welcome: true,
        drawer: null,
        DashFirstData: [{
                icon: 'people',
                text: '100',
                name: 'Usúario',
                route: '/dashboard/adicionar-usuario'
            },
            {
                icon: 'person',
                text: '30',
                name: 'Profissional',
                route: '/dashboard/adicionar-profissional'
            },
            {
                icon: 'business',
                text: '15',
                name: 'Empresa',
                route: '/dashboard/adicionar-empresa'
            },
            {
                icon: 'assignment',
                text: '99',
                name: 'Orçamento',
                route: '/dashboard/adicionar-orcamento'
            },

        ],
        items: [{
                icon: 'dashboard',
                text: 'Dash',
                route: '/dashboard'
            },
            {
                icon: 'people',
                text: 'Usuários',
                route: '/dashboard/usuarios'
            },
            {
                icon: 'person',
                text: 'Profissionais',
                route: '/dashboard/profissionais'
            },
            {
                icon: 'business',
                text: 'Empresas',
                route: '/dashboard/empresas'
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
