let topTitleDiv = "<h4>GIS For Design Practices | Final Project | Narrative Altlas</h4>";

let titleDiv =
  "<h1>Correlation between different factors and life expectancy across various regions</h1>";

let bylineDiv = "<p>By Xiaoya Wang</p>"+"<p>Instructor: Dare Anne Brawley &nbsp;&nbsp; Mario Giampieri</p>";

let descriptionDiv =
  '<p>This project aims to explore the correlation between various factors and life expectancy across different regions, utilizing data-driven analysis to uncover the key drivers behind regional disparities in life expectancy. By employing spatial autocorrelation algorithms, the spatial similarity of life expectancy across counties is calculated, followed by an in-depth analysis of outliers or special values to identify significant patterns and insights.</p>' +
  '<p>The research process includes key steps such as data collection and preprocessing, algorithm implementation and cluster analysis, correlation testing, and result visualization. A range of potential factors influencing life expectancy are considered, including income, condition of housing, educational attainment, urbanization, and healthcare resource. The analysis delves into regional differences to identify potential health determinants.</p>' +
  "<p>&nbsp;</p>" +"<p>&nbsp;</p>"+
  '<p style="text-align:center">Scroll to continue<br>▼</p>';

let footerDiv =
  '<p>Source: &nbsp; <a href="https://data2.nhgis.org/main">https://data2.nhgis.org/main</a> &nbsp; Datasets on different socioeconomic factors of different census tracts</p><p>&nbsp;<a href="https://www.cdc.gov/nchs/data-visualization/life-expectancy/index.html">https://www.cdc.gov/nchs/data-visualization/life-expectancy/index.html</a>&nbsp; Datasets on life expectancy by census &nbsp;tracts</p><p>&nbsp;<a href="https://www.countyhealthrankings.org/health-data/health-outcomes/length-of-life/life-expectancy?year=2024">https://www.countyhealthrankings.org/health-data/health-outcomes/length-of-life/life-expectancy?year=2024</a> &nbsp; &nbsp;Datasets on life expectancy by counties</p><p>Tutorial: &nbsp; <a href="https://pointsunknown.nyc/web%20mapping/mapbox/2021/07/20/11A_MapboxStorytelling.html">https://pointsunknown.nyc/web%20mapping/mapbox/2021/07/20/11A_MapboxStorytelling.html</a> &nbsp; Mapbox Storytelling</p>' +
  '<p><a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> | <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a> | <a href="https://brown.columbia.edu">The Brown Institute for Media Innovation</a></p>';

let divChapter2 =
  "<h3>DATA VISUALIZATION FOR LIFE EXPECTANCY BY COUNTIES</h3>" +
  '<p class="imageCredit"><a href="https://xiaoyaw34.github.io/Life-expectancy-by-counties/">Details of this map</a></p>' +
  "<p>One algorithm called spatial autocorrelation is utilized to calculate the spatial similarity of life expectancy across different counties. t identifies neighboring polygons that share borders or vertices and compares the life expectancy values among these neighbors.</p>"+
  "<p>The clusters of counties with high life expectancy are mostly located in northern part of United States, and one big cluster of counties with low life expectancy is located in Southeastern part of U.S.</p>";

let divChapter3 =
  "<h3>The big cluster of counties with low life expectancy</h3>" +
  "<p>It is evident that there is a region in the northeastern United States where life expectancy is generally very low. At the state level, the states in this region also tend to have relatively low life expectancy.</p>"+
  "<p>By focusing on this region, we can not only identify the root causes of its public health issues but also gain insights that contribute to broader discussions on health equity and regional development.</p>";

let divChapter4 =
  "<h3 style='max-width:600px; margin-left:auto; margin-right:auto'>Calculation and selection among this cluster</h3>" +
  '<div><img src="data/image1.png"></div>' +
  "<p style='max-width:600px; margin-left:auto; margin-right:auto'>One algorithm called multiple linear regression is used to selected all the factors that are correlated to life expectancy in this area. Multiple Linear Regression (MLR) is a statistical method used to model the relationship between one dependent variable (also called the response variable) and two or more independent variables (predictor variables).</p>" +
  "<p style='max-width:600px; margin-left:auto; margin-right:auto'>Factors considered to be related to life expectancy (Such as poverty) were introduced to calculate using this algorithm. Through this algorithm factors with low levels of correlation or low statistical significance are excluded.Then the correlation between these filtered factors and life expectancy is calculated on this basis.</p>" +
  "<p style='max-width:600px; margin-left:auto; margin-right:auto'>To calculate the correlation between various factors and life expectancy within a county based on data from different census tracts, counties with too few census tracts are first excluded to reduce the impact of random variability. Next, the filtered counties are analyzed, and results that are not statistically significant are excluded.</p>"+
  "<p style='max-width:600px; margin-left:auto; margin-right:auto'>Next I will show the maps about correlation between factors including per capita income, household income, insurance coverage, % minority, % house with low value and life expectancy.</p>";

let divChapter5 =
  "<h3>Correlation between per capita income and life expectancy</h3>" +
  "<p>The number of counties that have correlation between per capita income and life expectancy is 100, and the average value of correlation is 0.692.</p>";

  let divChapter6 =
  "<h3>Correlation between household income and life expectancy</h3>" +
  "<p>The number of counties that have correlation between per capita income and life expectancy is 113, and the average value of correlation is 0.71.</p>";

  let divChapter7 =
  "<h3>Correlation between insurance coverage and life expectancy</h3>" +
  "<p>The number of counties that have correlation between per capita income and life expectancy is 71, and the average value of correlation is 0.673.</p>";

  let divChapter8 =
  "<h3>Correlation between proportion of minority and life expectancy</h3>" +
  "<p>There are 76 counties whose values of life expectancy are influenced by the proportion of minority, and the average value of correlation is -0.656.</p>";

  let divChapter9 =
  "<h3>Correlation between proportion of house with low value and life expectancy</h3>" +
  "<p>There are 94 counties whose values of life expectancy are influenced by the proportion of minority, and the average value of correlation is -0.69.</p>";

var config = {
  style: "mapbox://styles/centrifuge1/cm40vq03e00lo01s08evo2ijb",
  accessToken: "pk.eyJ1IjoiY2VudHJpZnVnZTEiLCJhIjoiY20wdnZuNXJwMDZ2ejJxb2xyZXN1ZWprYSJ9.-ydDpcvn4PY8L_TNR474Sg",
  showMarkers: false,
  markerColor: "#3FB1CE",
  theme: "light",
  use3dTerrain: false,
  topTitle: topTitleDiv,
  title: titleDiv,
  subtitle: "",
  byline: bylineDiv,
  description: descriptionDiv,
  footer: footerDiv,
  chapters: [
    {
      id: "Counties",
      alignment: "left",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter2,
      location: {
        center: [-110, 48],
        zoom: 3.3,
        zoomSmall: 9,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "State_outline",
          opacity: 0.9,
          duration: 300,
        },
        {
          layer: "counties_diamond",
          opacity: 0.9,
          duration: 300,
        },
        {
          layer: "counties_doughnut",
          opacity: 0.9,
          duration: 300,
        },
        {
          layer: "counties_coldspot",
          opacity: 0.9,
          duration: 300,
        },
        {
          layer: "counties_hotspot",
          opacity: 0.9,
          duration: 300,
        },
        {
          layer: "normal_county",
          opacity: 0.9,
          duration: 300,
        },
        () => {
          document.getElementById("coldspot2").style.display = "none";
          document.getElementById("coldspot").style.display = "block";
          document.getElementById("hotspot").style.display = "block";
          document.getElementById("diamond").style.display = "block";
          document.getElementById("doughnut").style.display = "block";
          document.getElementById("normal").style.display = "block";
          document.getElementById("stateOutlineLegend").style.display = "block";
        }
      ],
      onChapterExit: [
        {
          layer: "State_outline",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "counties_diamond",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "counties_doughnut",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "counties_coldspot",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "counties_hotspot",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "normal_county",
          opacity: 0,
          duration: 300,
        },
        () => {
          document.getElementById("coldspot").style.display = "none";
          document.getElementById("hotspot").style.display = "none";
          document.getElementById("diamond").style.display = "none";
          document.getElementById("doughnut").style.display = "none";
          document.getElementById("normal").style.display = "none";
          document.getElementById("stateOutlineLegend").style.display = "none";
        }
      ],
    },
    {
      id: "cluster",
      alignment: "left",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter3,
      location: {
        center: [-95, 35],
        zoom: 5,
        zoomSmall: 9,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "counties_coldspot2",
          opacity: 0.9,
          duration: 300,
        },
        () => {
          document.getElementById("coldspot2").style.display = "block";
          document.getElementById("coldspot").style.display = "none";
          document.getElementById("hotspot").style.display = "none";
          document.getElementById("diamond").style.display = "none";
          document.getElementById("doughnut").style.display = "none";
          document.getElementById("normal").style.display = "none";
          document.getElementById("allcounties").style.display = "none";
          document.getElementById("stateOutlineLegend").style.display = "none";
        }
      ],
      onChapterExit: [
        {
          layer: "counties_coldspot2",
          opacity: 0,
          duration: 300,
        },
        () => {
          document.getElementById("coldspot2").style.display = "none";
        }
      ],
    },
    {
      id: "census tracts",
      alignment: "left",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter4,
      location: {
        center: [-95, 35],
        zoom: 5,
        zoomSmall: 14,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "filtered1",
          opacity: 1,
          duration: 300,
        },
        {
          layer: "filtered2",
          opacity: 1,
          duration: 300,
        },
        {
          layer: "filtered3",
          opacity: 1,
          duration: 300,
        },
        {
          layer: "county_calculation",
          opacity: 1,
          duration: 300,
        },
        {
          layer: "background",
          opacity: 1,
          duration: 300,
        },
        {
          layer: "calculation_outline",
          opacity: 0,
          duration: 300,
        },
        () => {
          document.getElementById("countyOutlineLegend").style.display = "block";
          document.getElementById("allcounties").style.display = "block";
          document.getElementById("countyOutline").style.display = "none";
          document.getElementById("coldspot censustracts").style.display = "block";
        }
      ],
      onChapterExit: [
        {
          layer: "filtered1",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "filtered2",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "filtered3",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "county_calculation",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "background",
          opacity: 0,
          duration: 300,
        },
        () => {
          document.getElementById("countyOutlineLegend").style.display = "none";
          document.getElementById("coldspot censustracts").style.display = "none";
        }
      ],
    },


    {
      id: "per capita income",
      alignment: "left",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter5,
      location: {
        center: [-95, 35],
        zoom: 5,
        zoomSmall: 14,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "per capita income",
          opacity: 1,
          duration: 300,
        },
        {
          layer: "calculation_outline",
          opacity: 0.8,
          duration: 300,
        },
        () => {
          document.getElementById("countyOutline").style.display = "block";
          document.getElementById("allcounties").style.display = "block";
          document.getElementById("per capita income").style.display = "block";
        }
      ],
      onChapterExit: [
        {
          layer: "per capita income",
          opacity: 0,
          duration: 300,
        },
        () => {
          document.getElementById("per capita income").style.display = "none";
        }
      ],
    },
    {
      id: "household correlation",
      alignment: "left",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter6,
      location: {
        center: [-95, 35],
        zoom: 5,
        zoomSmall: 14,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "householdincome correlation",
          opacity: 1,
          duration: 300,
        },
        {
          layer: "calculation_outline",
          opacity: 0.8,
          duration: 300,
        },
        () => {
          document.getElementById("countyOutline").style.display = "block";
          document.getElementById("allcounties").style.display = "block";
          document.getElementById("household income").style.display = "block";
        }
      ],
      onChapterExit: [
        {
          layer: "householdincome correlation",
          opacity: 0,
          duration: 300,
        },
        () => {
          document.getElementById("household income").style.display = "none";
        }
      ],
    },
    {
      id: "insurance correlation",
      alignment: "left",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter7,
      location: {
        center: [-95, 35],
        zoom: 5,
        zoomSmall: 14,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "insurance correlation",
          opacity: 1,
          duration: 300,
        },
        {
          layer: "calculation_outline",
          opacity: 0.8,
          duration: 300,
        },
        () => {
          document.getElementById("countyOutline").style.display = "block";
          document.getElementById("allcounties").style.display = "block";
          document.getElementById("insurance coverage").style.display = "block";
        }
      ],
      onChapterExit: [
        {
          layer: "insurance correlation",
          opacity: 0,
          duration: 300,
        },
        () => {
          document.getElementById("insurance coverage").style.display = "none";
        }
      ],
    },
    {
      id: "minority correlation",
      alignment: "left",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter8,
      location: {
        center: [-95, 35],
        zoom: 5,
        zoomSmall: 14,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "minority correlation",
          opacity: 1,
          duration: 300,
        },
        {
          layer: "calculation_outline",
          opacity: 0.8,
          duration: 300,
        },
        () => {
          document.getElementById("countyOutline").style.display = "block";
          document.getElementById("allcounties").style.display = "block";
          document.getElementById("minority").style.display = "block";
        }
      ],
      onChapterExit: [
        {
          layer: "minority correlation",
          opacity: 0,
          duration: 300,
        },
        () => {
          document.getElementById("minority").style.display = "none";
        }
      ],
    },
    {
      id: "low value house correlation",
      alignment: "left",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter9,
      location: {
        center: [-95, 35],
        zoom: 5,
        zoomSmall: 14,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "low value house correlation",
          opacity:1,
          duration: 300,
        },
        {
          layer: "calculation_outline",
          opacity: 0.8,
          duration: 300,
        },
        () => {
          document.getElementById("countyOutline").style.display = "block";
          document.getElementById("allcounties").style.display = "block";
          document.getElementById("low value house").style.display = "block";
        }
      ],
      onChapterExit: [
        {
          layer: "low value house correlation",
          opacity: 0,
          duration: 300,
        },
        () => {
          document.getElementById("low value house").style.display = "none";
        }
      ],
    },
  ],
};