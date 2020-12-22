
<template>
  <v-card>
    <v-tabs
      background-color="white"
      color="deep-purple accent-4"
      right
    >
      <v-tab>Landscape</v-tab>
      <v-tab>City</v-tab>
      <v-tab>Abstract</v-tab>

      <v-tab-item
        v-for="n in 3"
        :key="n"
      >
        <v-container fluid>
          <v-row>
            <v-col
              v-for="i in 6"
              :key="i"
              cols="12"
              md="4"
            >
              <v-col cols="8" sm="8" md="8" lg="10" xl="9">            
              <nuxt />            
          </v-col>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>