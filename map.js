var smallMedia = window.matchMedia("(max-width: 600px)").matches;

/* Next, create two variables that will hold:
1. The different types of layers available to Mapbox and their
respective opacity attributes.
2. The possible alignments which could be applied to the vignettes.*/

var layerTypes = {
  fill: ["fill-opacity"],
  line: ["line-opacity"],
  circle: ["circle-opacity", "circle-stroke-opacity"],
  symbol: ["icon-opacity", "text-opacity"],
  raster: ["raster-opacity"],
  "fill-extrusion": ["fill-extrusion-opacity"],
  heatmap: ["heatmap-opacity"],
};

var alignments = {
  left: "lefty",
  center: "centered",
  right: "righty",
  full: "fully",
};

/* The next two functions help turn on and off individual
layers through their opacity attributes: The first one gets
the type of layer and the second one adjusts the layer's opacity */

function getLayerPaintType(layer) {
  var layerType = map.getLayer(layer).type;
  return layerTypes[layerType];
}

function setLayerOpacity(layer) {
  var paintProps = getLayerPaintType(layer.layer);
  paintProps.forEach(function (prop) {
    var options = {};
    if (layer.duration) {
      var transitionProp = prop + "-transition";
      options = { duration: layer.duration };
      map.setPaintProperty(layer.layer, transitionProp, options);
    }
    map.setPaintProperty(layer.layer, prop, layer.opacity, options);
  });
}

/* Next, these variables and functions create the story and vignette html
elements, and populate them with the content from the config.js file.
They also assign a css class to certain elements, also based on the
config.js file */

// Main 'story', 'features' and 'header' elements
var story = document.getElementById("story");
var features = document.createElement("div");
var header = document.createElement("div");
features.setAttribute("id", "features");

// If the content exists, then assign it to the 'header' element
// Note how each one of these are assigning 'innerHTML'
if (config.topTitle) {
  var topTitle = document.createElement("div");
  topTitle.innerHTML = config.topTitle;
  header.appendChild(topTitle);
}
if (config.title) {
  var titleText = document.createElement("div");
  titleText.innerHTML = config.title;
  header.appendChild(titleText);
}
if (config.subtitle) {
  var subtitleText = document.createElement("div");
  subtitleText.innerHTML = config.subtitle;
  header.appendChild(subtitleText);
}
if (config.byline) {
  var bylineText = document.createElement("div");
  bylineText.innerHTML = config.byline;
  header.appendChild(bylineText);
}
if (config.description) {
  var descriptionText = document.createElement("div");
  descriptionText.innerHTML = config.description;
  header.appendChild(descriptionText);
}

// If after this, the header has anything in it, it gets appended to the story
if (header.innerText.length > 0) {
  header.classList.add(config.theme);
  header.setAttribute("id", "header");
  story.appendChild(header);
}

/* After building the elements and assigning content to the header these
functions will loop through the chapters in the config.js file,
create the vignette elements and assign them their respective content */

config.chapters.forEach((record, idx) => {
  /* These first two variables will hold each vignette, the chapter
    element will go in the container element */
  var container = document.createElement("div");
  var chapter = document.createElement("div");
  // Adds a class to the vignette
  chapter.classList.add("br3");
  // Adds all the content to the vignette's div
  chapter.innerHTML = record.chapterDiv;
  // Sets the id for the vignette and adds the step css attribute
  container.setAttribute("id", record.id);
  container.classList.add("step");
  // If the chapter is the first one, set it to active
  if (idx === 0) {
    container.classList.add("active");
  }
  // Adds the overall theme to the chapter element
  chapter.classList.add(config.theme);
  /* Appends the chapter to the container element and the container
    element to the features element */
  container.appendChild(chapter);
  container.classList.add(alignments[record.alignment] || "centered");
  if (record.hidden) {
    container.classList.add("hidden");
  }
  features.appendChild(container);
});

// Appends the features element (with the vignettes) to the story element
story.appendChild(features);

/* Next, this section creates the footer element and assigns it
its content based on the config.js file */

var footer = document.createElement("div");

// This assigns all the content to the footer element
if (config.footer) {
  var footerText = document.createElement("p");
  footerText.innerHTML = config.footer;
  footer.appendChild(footerText);
}
// If the footer element contains any content, add it to the story
if (footer.innerText.length > 0) {
  footer.classList.add(config.theme);
  footer.setAttribute("id", "footer");
  story.appendChild(footer);
}

// Adds the Mapbox access token
mapboxgl.accessToken = config.accessToken;

// Honestly, don't know what this does
const transformRequest = (url) => {
  const hasQuery = url.indexOf("?") !== -1;
  const suffix = hasQuery
    ? "&pluginName=scrollytellingV2"
    : "?pluginName=scrollytellingV2";
  return {
    url: url + suffix,
  };
};

// Creates a variable to hold the starting zoom value
var startingZoom;
// If the screen size is small, it uses the `zoomSmall` value
if (smallMedia) {
  startingZoom = config.chapters[0].location.zoomSmall;
} else {
  startingZoom = config.chapters[0].location.zoom;
}

/* This section creates the map element with the
attributes from the main section of the config.js file */
var map = new mapboxgl.Map({
  container: "map",
  style: config.style,
  center: config.chapters[0].location.center,
  zoom: startingZoom,
  bearing: config.chapters[0].location.bearing,
  pitch: config.chapters[0].location.pitch,
  interactive: false,
  transformRequest: transformRequest,
});

if (config.showMarkers) {
  var marker = new mapboxgl.Marker({ color: config.markerColor });
  marker.setLngLat(config.chapters[0].location.center).addTo(map);
}

// Instantiates the scrollama function
var scroller = scrollama();

/* Here we add the two extra layers we are using, just like in our previous
tutorial. At the end, however, we setup the functions that will tie the
scrolling to the chapters and move the map from one location to another
while changing the zoom level, pitch and bearing */

map.on("load", function () {
  // Add 3d terrain if necessary
  if (config.use3dTerrain) {
    map.addSource("mapbox-dem", {
      type: "raster-dem",
      url: "mapbox://mapbox.mapbox-terrain-dem-v1",
      tileSize: 512,
      maxzoom: 14,
    });
    // Add the DEM source as a terrain layer with exaggerated height
    map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

    // Add a sky layer that will show when the map is highly pitched
    map.addLayer({
      id: "sky",
      type: "sky",
      paint: {
        "sky-type": "atmosphere",
        "sky-atmosphere-sun": [0.0, 0.0],
        "sky-atmosphere-sun-intensity": 15,
      },
    });
  }
  map.addLayer(
    {
      id: "State_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "data/states_life.geojson",
      },
      paint: {
        'line-opacity':0,
        'line-color':'#000000',
        'line-width':1,
        'line-dasharray': [4, 4]
      },
    },
    "airport-label"
  );
  map.addLayer(
    {
      id: "counties_diamond",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/counties_diamond.geojson",
      },
      'paint': {
        'fill-opacity':0,
        'fill-color': 'white',
        'fill-outline-color': '#5b5b5b',
        }
    },
    "natural-point-label"
  );
  map.addLayer(
    {
      id: "counties_doughnut",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/counties_doughnut.geojson",
      },
      'paint': {
        'fill-opacity':0,
        'fill-color': '#696969',
        'fill-outline-color': 'white',
        }
    },
    "water-point-label"
  );
  map.addLayer(
    {
      id: "counties_coldspot",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/counties_coldspot.geojson",
      },
      'paint': {
        'fill-opacity':0,
        'fill-color': ['step', ['get', 'County Value'],
        '#e5e5e5',
        66, '#d7191c',
        72.2125, '#e1412e',
        73.125, '#eb6841',
        73.8, '#f59053',
        74.3, '#fdb367',
        74.8,'#fec980',
        75.4,'#fedf99',
        76.1,'#fff4b2'
    ],
        'fill-outline-color': 'white',
        }
    },
    "waterway-label"
  );
  map.addLayer(
    {
      id: "counties_hotspot",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/counties_hotspot.geojson",
      },
      'paint': {
        'fill-opacity':0,
        'fill-color': ['step', ['get', 'County Value'],
        '#e5e5e5',
        77, '#d3edb1',
        78.4, '#c1e6ab',
        79.1, '#afdfa5',
        79.6, '#97cfa7',
        80.2, '#7cbcac',
        80.8,'#61a9b1',
        81.5,'#4696b5',
        82.5,'#2b83ba'
    ],
        'fill-outline-color': 'white',
        }
    },
    "poi-label"
  );
  map.addLayer(
    {
      id: "normal_county",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/normal_county.geojson",
      },
      'paint': {
        'fill-opacity':0,
        'fill-color':'#e3e3e3',
        'fill-outline-color': '#848484',
        }
    },
    "admin-0-boundary-disputed"
  );
  map.addLayer(
    {
      id: "State_life_outline2",
      type: "line",
      source: {
        type: "geojson",
        data: "data/states_life.geojson",
      },
      paint: {
        'line-opacity':0,
        'line-color': 'black', 
        'line-width':1.1, 
        'line-dasharray': [4, 4],
      },
    },
    "road-label-simple"
  );
  map.addLayer(
    {
      id: "counties_coldspot2",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/counties_coldspot.geojson",
      },
      'paint': {
        'fill-opacity':0,
        'fill-color': ['step', ['get', 'County Value'],
        '#e5e5e5',
        66, '#d7191c',
        72.2125, '#e1412e',
        73.125, '#eb6841',
        73.8, '#f59053',
        74.3, '#fdb367',
        74.8,'#fec980',
        75.4,'#fedf99',
        76.1,'#fff4b2'
    ],
        'fill-outline-color': 'white',
        }
    },
    "admin-0-boundary-disputed"
  );
  map.addLayer(
    {
      id: "filtered1",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/filtered_census_east.geojson",
      },
      'paint': {
        'fill-opacity':0,
        'fill-color': ['step', ['get', 'Life Expectancy'],
        '#e5e5e5',
        56.9, '#bd0026',
        60.512, '#da2223',
        64.125, '#f24724',
        67.737, '#f97634',
        71.35, '#fd9f45',
        74.962,'#fec357',
        78.575,'#fee281',
        82.187,'#ffffb2'
    ],
        'fill-outline-color': 'white',
        }
    },
    "bridge-rail-tracks"
  );
  map.addLayer(
    {
      id: "filtered2",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/filtered_census_mid.geojson",
      },
      'paint': {
        'fill-opacity':0,
        'fill-color': ['step', ['get', 'Life Expectancy'],
        '#e5e5e5',
        56.9, '#bd0026',
        60.512, '#da2223',
        64.125, '#f24724',
        67.737, '#f97634',
        71.35, '#fd9f45',
        74.962,'#fec357',
        78.575,'#fee281',
        82.187,'#ffffb2'
    ],
        'fill-outline-color': 'white',
        }
    },
    "admin-1-boundary"
  );
  map.addLayer(
    {
      id: "filtered3",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/filtered_census_west.geojson",
      },
      'paint': {
        'fill-opacity':0,
        'fill-color': ['step', ['get', 'Life Expectancy'],
        '#e5e5e5',
        56.9, '#bd0026',
        60.512, '#da2223',
        64.125, '#f24724',
        67.737, '#f97634',
        71.35, '#fd9f45',
        74.962,'#fec357',
        78.575,'#fee281',
        82.187,'#ffffb2'
    ],
        'fill-outline-color': 'white',
        }
    },
    "admin-0-boundary-bg"
  );
  map.addLayer(
    {
      id: "county_calculation",
      type: "line",
      source: {
        type: "geojson",
        data: "data/background.geojson",
      },
      paint: {
        'line-opacity':0,
        'line-color': 'black', 
        'line-width':1, 
        'line-dasharray': [3, 2],
      },
    },
    "admin-0-boundary"
  );
  map.addLayer(
    {
      id: "background",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/all.geojson",
      },
      'paint': {
        'fill-opacity':0,
        'fill-color':'#e3e3e3',
        'fill-outline-color': '#848484',
        }
    },
    "bridge-rail"
  );


  map.addLayer(
    {
      id: "per capita income",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/all.geojson",
      },
      'paint': {
        'fill-opacity':0,
            'fill-color': 
            ['case', 
            ['boolean', ['==', ['get', 'per income_Correlation'], null], true],
            '#e5e5e5',['step', ['get', 'per income_Correlation'],
                '#e5e5e5',
                0.46, '#f0f9e8',
                0.525, '#ccebcb',
                0.59, '#a5dcbf',
                0.65459, '#7bccc4',
                0.719, '#56b0c8',
                0.7837,'#2f8fc0',
                0.84835,'#0868ac',
            ],],
            'fill-outline-color': 'white',
        }
    },
    "bridge-case-simple"
  );
  map.addLayer(
    {
      id: "calculation_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "data/background.geojson",
      },
      paint: {
        'line-opacity':0,
        'line-color': 'black', 
        'line-width':0.8, 
        // 'line-dasharray': [3, 2],
      },
    },
    "bridge-simple"
  );
  map.addLayer(
    {
      id: "householdincome correlation",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/all.geojson",
      },
      'paint': {
        'fill-opacity':0,
            'fill-color': 
            ['case', 
            ['boolean', ['==', ['get', 'householdincome_Correlation'], null], true],
            '#e5e5e5',['step', ['get', 'householdincome_Correlation'],
                '#e5e5e5',
                0.40385, '#f0f9e8',
                0.47429, '#ccebcb',
                0.54473, '#a5dcbf',
                0.61517, '#7bccc4',
                0.68561, '#56b0c8',
                0.75605,'#2f8fc0',
                0.82649,'#0868ac',
            ],],
            'fill-outline-color': 'white',
        }
    },
    "bridge-steps"
  );
  map.addLayer(
    {
      id: "insurance correlation",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/all.geojson",
      },
      'paint': {
        'fill-opacity':0,
            'fill-color': 
            ['case', 
            ['boolean', ['==', ['get', 'insurance_Correlation'], null], true],
            '#e5e5e5',['step', ['get', 'insurance_Correlation'],
                '#e5e5e5',
                0.43043, '#f0f9e8',
                0.49134, '#ccebcb',
                0.55233, '#a5dcbf',
                0.61333, '#7bccc4',
                0.67432, '#56b0c8',
                0.73532,'#2f8fc0',
                0.79631,'#0868ac',
            ],],
            'fill-outline-color': 'white',
        }
    },
    "bridge-path"
  );


  map.addLayer(
    {
      id: "minority correlation",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/all.geojson",
      },
      'paint': {
        'fill-opacity':0,
            'fill-color': 
            ['case', 
            ['boolean', ['==', ['get', 'minority_Correlation'], null], true],
            '#e5e5e5',['step', ['get', 'minority_Correlation'],
                '#e5e5e5',
                -0.95, '#b30000',
                -0.8565, '#d33122',
                -0.756, '#eb6040',
                -0.6555, '#fc8d59',
                -0.555, '#fdb77a',
                -0.4545,'#fdd8a4',
                -0.354,'#fef0d9',
            ],],
            'fill-outline-color': 'white',
        }
    },
    "road-rail-tracks"
  );
  map.addLayer(
    {
      id: "low value house correlation",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/all.geojson",
      },
      'paint': {
        'fill-opacity':0,
            'fill-color': 
            ['case', 
            ['boolean', ['==', ['get', 'low value house_Correlation'], null], true],
            '#e5e5e5',['step', ['get', 'low value house_Correlation'],
                '#e5e5e5',
                -0.9358, '#b30000',
                -0.86272, '#d33122',
                -0.78960, '#eb6040',
                -0.71648, '#fc8d59',
                -0.64337, '#fdb77a',
                -0.57025,'#fdd8a4',
                -0.49714,'#fef0d9',
            ],],
            'fill-outline-color': 'white',
        }
    },
    "road-rail"
  );

  // Setup the instance, pass callback functions
  scroller
    .setup({
      step: ".step",
      offset: 0.75,
      progress: true,
    })
    .onStepEnter((response) => {
      var chapter = config.chapters.find(
        (chap) => chap.id === response.element.id
      );
      response.element.classList.add("active");
      let thisZoom;
      if (smallMedia) {
        thisZoom = chapter.location.zoomSmall;
      } else {
        thisZoom = chapter.location.zoom;
      }
      thisLocation = {
        bearing: chapter.location.bearing,
        center: chapter.location.center,
        pitch: chapter.location.pitch,
        zoom: thisZoom,
      };
      map[chapter.mapAnimation || "flyTo"](thisLocation);
      if (config.showMarkers) {
        marker.setLngLat(chapter.location.center);
      }
      if (chapter.onChapterEnter.length > 0) {
        chapter.onChapterEnter.forEach(setLayerOpacity);
      }
      if (chapter.callback) {
        window[chapter.callback]();
      }
      if (chapter.rotateAnimation) {
        map.once("moveend", function () {
          const rotateNumber = map.getBearing();
          map.rotateTo(rotateNumber + 90, {
            duration: 24000,
            easing: function (t) {
              return t;
            },
          });
        });
      }
    })
    .onStepExit((response) => {
      var chapter = config.chapters.find(
        (chap) => chap.id === response.element.id
      );
      response.element.classList.remove("active");
      if (chapter.onChapterExit.length > 0) {
        chapter.onChapterExit.forEach(setLayerOpacity);
      }
    });
});

/* Here we watch for any resizing of the screen to
adjust our scrolling setup */
window.addEventListener("resize", scroller.resize);