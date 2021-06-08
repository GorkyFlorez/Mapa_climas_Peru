#  Cargamos las Librerias ----------------------------------------------------------
require(pacman)
pacman::p_load(raster, rgdal, rgeos, gtools, tidyverse,rnaturalearth,rnaturalearthdata,
               sf, reticulate,maptools,maps, ggplot2 ,ggspatial, rgeos, ggmap , leaflet, ggrepel,
               RColorBrewer,png,broom,leaflet.extras, leaflet.providers, leafem,htmlwidgets,sp,
               readxl,mapview, viridis, Rgb, raster, rmarkdown )

# Cargammos los SHp del Peru ---------------------------------------------------------------
Climas       <-st_read("Shp_SA/clasif_clima_1981_2010.shp")
Peru         <- getData('GADM', country='Peru', level=1) %>% st_as_sf()     

ggplot() + geom_sf(data = Climas,aes(fill = CODIGO),  alpha = 1, linetype = 1)
#---------------------------------------------------------------
display.brewer.allc 

pal_colores  <- colorFactor(RColorBrewer::brewer.pal(n = 5, name = "RdYlBu"), domain = Climas$CODIGO)
#Definiendo el Logo
m="https://images.vexels.com/media/users/3/143561/isolated/preview/afa3aa927b63061e3b0222b7dab9cdbf-ubicaci--n-n--utica-norte-flecha-vintage-by-vexels.png"
#---------------------------------------------------------------
M<-leaflet() %>%
  addControl(html = "<p><strong><em>Mapa de Clasificación Climática del Peru-2021</em></strong></p>",
             position = "topright")%>%
  addLogo(m,url = "https://images.vexels.com/media/users/3/143561/isolated/preview/afa3aa927b63061e3b0222b7dab9cdbf-ubicaci--n-n--utica-norte-flecha-vintage-by-vexels.png",
          position = "topleft",offset.x = 50,offset.y = 10,width = 100,height = 100)%>%
  addPolygons(data= Climas,color = pal_colores(Climas$CODIGO),
              fillOpacity = 0.5,label = Climas$CODIGO,group = "Climática del Peru")%>%
  addPolygons(data= Peru  ,color = "#444444",weight = 2,fillOpacity = 0.05,
              fillColor = 1,group = "Peru")%>%
  addDrawToolbar(targetGroup = "Graficos",
                 editOptions = editToolbarOptions(selectedPathOptions = selectedPathOptions()))%>%
  addMeasure(position = "topleft",primaryLengthUnit = "meters",
             primaryAreaUnit = "sqmeters",activeColor = "#3D535D", completedColor = "#7D4479")%>%
  addMeasurePathToolbar(options = measurePathOptions(showOnHover = F,
                                                     showDistances = F,showArea = T,minPixelDistance = 400))%>%
  addScaleBar(position = "bottomright",options = scaleBarOptions(maxWidth = 100,
                                                                 metric = TRUE,imperial = TRUE,updateWhenIdle = TRUE))%>%
  addLayersControl(baseGroups = c("Satellite", "OSM", "OTM"),
                   overlayGroups = c("Climas","Peru" ), position = "topright",
                   options = layersControlOptions(collapsed = T))%>%
  addProviderTiles(providers$Esri.WorldImagery, group = "Satellite")%>%
  addProviderTiles(providers$OpenStreetMap, group = "OSM")%>%
  addProviderTiles(providers$OpenTopoMap, group = "OTM")%>%
  addMiniMap(tiles = providers$Esri.WorldImagery,
             toggleDisplay = TRUE)%>%
  addSearchFeatures(targetGroups = "Climas")

htmlwidgets::saveWidget(M, "Mapa/Climas del peru.html")




