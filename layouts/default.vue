<template >
  <v-app>
    
    <v-container pa-6 fluid>
      <v-card fluid>
        <v-row>
          <v-col cols="2" sm="2" md="2" lg="2" xl="2">
            
              <NavigationBar />        
             
                          
         
            
          </v-col>
          
          <v-col cols="9" sm="10" md="9" lg="9" xl="9">           
                  
             <v-content>
                <nuxt />         
             </v-content>       
         
            
          </v-col>
                     
                
                  
          
        </v-row>
      </v-card>
      
      <Footer />
    </v-container>
    
  </v-app>
</template>

<script>
import Carousel from "@/components/Carousel";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";

export default {
  name: "default",
  components: {
    Carousel,
    Footer,
    NavigationBar    
  }  
};
</script>


