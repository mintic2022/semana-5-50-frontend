<template>
  <v-container class="grey lighten-5">
    <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-4 font-weight-thin mb-4">Grupo 50</h1>
          <h1 class="display-1 font-weight-thin mb-4">Proyecto Mintic2022</h1>
          <h4 class="subheading">Mintic - UTP</h4>
        </v-col>
      </v-row>
    </v-parallax>

    <v-row>
      <v-col v-for="(card,i) in cards" :key="i" cols="12" sm="4">
        <!-- <v-card class="pa-2" outlined tile>One of three columns</v-card> -->
        <v-card class="pa-4" >
          <v-card-text>            
            <p class="display-1 text--primary">{{Object.keys(card[0])[0]}}</p>
            <p>{{Object.values(card[0])[0]}}</p>
            <div class="text--primary">              
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    cards: 
    [[{"Objetivos": "Enfocar nuestro quehacer en la solución de problemas asociados a los retos en los procesos de contrataión de las organizaciones. Crear vínculos académicos con comunidades y otros grupos de investigación relacionados con el área. Gestionar recursos de presupuesto nacional el internacional para la investigación y la innovación."}], 
    [{"Retos": "Consolidar una red interdisciplinaria de trabajo que promueva y asegure la generación, difusión y aplicación de conocimiento, con el más alto potencial para el desarrollo de proyectos de investigación y aplicación en el área."}], 
    [{"Visión": "Nos visualizamos como un equipo de trabajo interdisicplinario reconocido nacional e internacionalmente por la calidad de sus actividades." }]]    
  }),
};
</script>
