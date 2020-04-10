<template>
<div class='new-page'>
    <v-container class='pt-12 df-width'>
        
        <div class='dragndrop' 
        @dragover.prevent="enter" 
        @dragenter.prevent="enter"
        @dragleave.prevent="leave"
        @dragend.prevent="end" 
        @drop.prevent="drop"
        :class="{ 'dragndrop--dragged' : isDraggedOver }"
        >
            {{ isDraggedOver }}
            <input type="file" name="files[]" id="file" class='dragndrop__input' multiple v-on:change="select" ref="input">
            <label for="file" class='dragndrop__header'>
                <strong>Arraste e solte as imagens aqui</strong> ou clique para selecionar
            </label>
        </div>
      
    </v-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            files: [],           
            isDraggedOver: false
        }
    },
    methods: {
        enter() {
            this.isDraggedOver = true
        },
        leave() {
            this.isDraggedOver = false
        },
        drop(e) {
            this.leave()
            this.addFiles(e.dataTransfer.files)
           
        },
        select (e) {
            this.addFiles(this.$refs.input.files)            
        },
        addFiles ( files ) {
            var i, file;

            for (i = 0; i < files.length; i++) {
                file = files[i]

                console.log(file)

            }
        }

    }
}
</script>

<style scoped>
.dragndrop {
    --dragndrop-min-height: 200px;
    width: 100%;
    min-height: var(--dragndrop-min-height);
    background-color: #f8f8f8;
    position: relative;
    border: 3px dashed rgba(0, 0, 0, .2);
}

.dragndrop--dragged {
    border-color: var(--primary-color);
}
.dragndrop__input {
    display: none;
}

.dragndrop__header {
    display: block;
    font-family: var(--primary-font);
    font-size: 1.1rem;
    color: #555;
    text-align: center;
    margin: calc(var(--dragndrop-min-height) / 2) 20px;
}

.dragndrop__header:hover {
    text-decoration: underline;
    cursor: pointer;
}

.dragndrop__header--compact {
    margin: calc(var(--dragndrop-min-height) / 4) 20px;
}
</style>
