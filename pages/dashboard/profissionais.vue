<template>
    <div class="dashboard">
  <!-- GRID --> 
  <v-container fluid class="width-95 grey lighten-5 mt-3">
<template>
    
  <v-data-table
    :headers="headers"
    :items="profissionais"
    sort-by="name"
    class="elevation-1 pa-5"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
         <v-text-field
        v-model="search"
        append-icon="search"
        label="Pesquisar"
        single-line
        hide-details        
      ></v-text-field>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="blue darken-1" class='white--text mb-2' v-on="on">Adicionar</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Nome"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.birthday" label="data de nascimento"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.cpf" label="CPF"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.state" label="Estado"></v-text-field>
                  </v-col>
                    <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.city" label="Cidade"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>
  </v-container>
    </div>

</template>

<script>
export default {
  layout: 'admin',
    data: () => ({
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Nome',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'email', value: 'email' },
        { text: 'data de nascimento', value: 'birthday' },
        { text: 'cpf', value: 'cpf' },
        { text: 'estado', value: 'state' },
         { text: 'cidade', value: 'city' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      profissionais: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email:'',
        cpf: '',
        state: '',
        city:'',
      },
      defaultItem: {
        name: '',
        email:'',
        cpf: '',
        state: '',
        city:'',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.profissionais = [
          {
            name: 'Rafael Dias Fonseca',
            email: 'rafael.ddsociety@gmail.com',
            birthday: '13/09/1989',
            cpf: '383.578.398.00',
            state: 'SP',
            city: 'Santos'
          },
          {
            name: 'Vinicius',
            email: 'vinicius@bruxaogmail.com',
            birthday: '01/02/1850',
            cpf: '000.000.000.00',
            state: 'SP',
            city: 'São Vicente'
          },
           {
            name: 'Osvaldo Pereira',
            email: 'osvaldo@opadigital.com.br',
            birthday: '01/06/antes-de-cristo',
            cpf: '383.578.398.00',
            state: 'SP',
            city: 'Santos'
          },
          {
            name: 'Pereirinha',
            email: 'pereirinha@outlook.com',
            birthday: '11/11/1979',
            cpf: '000.000.000.00',
            state: 'SP',
            city: 'Praia Grande'
          },
           {
            name: 'Eslovenia Alverez',
            email: 'eslovenia.alverez@gmail.com',
            birthday: '06/06/1966',
            cpf: '666.666.666.66',
            state: 'SP',
            city: 'Cubatão'
          },
           {
            name: 'Pedro da Silva Cardoso',
            email: 'pedrometeolokodemais@gmail.com',
            birthday: '13/09/1961',
            cpf: '111.111.111.00',
            state: 'SP',
            city: 'Vicente de Carvalho'
          }, 
          
             {
            name: 'Marilda Mendonça Vasconseles',
            email: 'marilda.mendonca@outlook.com',
            birthday: '13/09/1988',
            cpf: '111.111.111.22',
            state: 'SP',
            city: 'Rio de Janeiro'
          },  
        ]
      },

      editItem (item) {
        this.editedIndex = this.profissionais.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.profissionais.indexOf(item)
        confirm('Tem certeza que deseja deletar este profissional?') && this.profissionais.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.profissionais[this.editedIndex], this.editedItem)
        } else {
          this.profissionais.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>


<style scoped>

.avatar {
  border-radius: 100px; 
}


</style>