# Librerias
#------------------------------------------------------------------------
library(sf)
library(purrr)
library(tidyverse)
library(ggplot2)
library(ggrepel)
library(rnaturalearth)                                   #Continentes
library(rnaturalearthdata)                               #Continentes especifico
library(raster)
library(rgeos)
library(reticulate)
library(maptools)
library(maps)
library(ggspatial)                                       # Norte
library(ggmap) 
library(rnaturalearthhires)
#------------------------------------------------------------------------
world        <- ne_countries(scale= "medium", returnclass = "sf")             # Continentes del mundo
world.SA     <- subset(world, continent=="South America")                    # Sur America
Peru_DEPA         <- getData('GADM', country='Peru', level=1) %>%            #Este comando permite leer el shapefile y 'transformarlo' en un data frame
                       st_as_sf()  
library(openxlsx)
#Cargo mis datos. 
MapaVotos <- read.xlsx("Data Politico/ElectoralMapDeps.xlsx", sheet="Sheet1") 
#------------------------------------------------------------------------
Candidatos   <- MapaVotos$Candidato
Data         <- cbind(Peru_DEPA,Candidatos)
Data_D       <- st_centroid(Data)                                       # Centros de cada pais
Data_D       <- cbind(Data, st_coordinates(st_centroid(Data$geometry))) #Utilizamos la geometria
#------------------------------------------------------------------------
#HAcer el Mapa
#colores
library(colorspace)
hcl_palettes(plot = TRUE)
q4 <- c("blue","darkmagenta","Orange", "red")

P1 <- ggplot() +
       geom_sf(data= world.SA, fill="beige")+
       geom_sf(data = Data, aes(fill=Candidatos), lwd=1, color="black",alpha = 1, linetype = 1)+
            scale_fill_manual(values = q4)+
       geom_text_repel(data = Data_D, aes(x=X, y=Y, label = NAME_1), size = 3)+
         annotate(geom = "text", x = -80, y = -10, label = "Oceano Pacifico", fontface = "italic", color = "grey22", size = 3)+
       theme_bw()+
         annotation_scale(location = "bl", width_hint = 0.4) +
         annotation_north_arrow(location = "bl", which_north = "true", 
                          pad_x = unit(0.75, "in"), pad_y = unit(0.5, "in"),
                          style = north_arrow_fancy_orienteering)+
       coord_sf(xlim = c(-81.3307,-68.65311), ylim = c(-18.3518,-0.03747),expand = FALSE)+
       theme(panel.background = element_rect(fill = "lightblue1"),
             panel.grid.major = element_line(color = gray(.5),
                                         linetype = "dashed", size = 0.5),
             legend.position = c(.15, .30))+
       labs(title = "Mapa Electoral 2021 - 1era Vuelta", 
            subtitle="Partidos ganadores por departamento",caption="Gorky Florez",x="Longitud",y="Latitud",tag="")
#------------------------------------------------------------------------
ggsave("02 Mapa de Elecciones del Peru/Mapa de elecciones .png",
       plot = P1, width =  7,height = 9, dpi=900)

