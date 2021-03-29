function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
    
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      console.log(firstSample)
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard
  init();
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
  }
  
  // Demographics Panel 
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  }
  
  // 1. Create the buildCharts function.
  function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
      // 3. Create a variable that holds the samples array.
    
    var sampValues = data.samples;
    var metadata = data.metadata;
  
    //console.log(metadata)
      // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArrayresult = data.metadata.filter(sampleObj => sampleObj.id == sample);
      //  5. Create a variable that holds the first sample in the array.
    var result =data.samples.filter(sampleObj => sampleObj.id == sample)[0];
  
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;
      
     console.log(otu_labels, sample_values)
     
     
      // 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 
      Top10otu_ids = otu_ids.slice(0,10).map(s => `OTU ${s}`).reverse();
      console.log(Top10otu_ids)
      
      sampleValues = sample_values.slice(0,10).reverse();
      otuLabels = otu_labels.slice(0,10).reverse();
     
  
      // 8. Create the trace for the bar chart. 
      var trace1 = {
        x: sampleValues,
        y: Top10otu_ids,
        text: otuLabels,
        marker: {
        color: 'blue'},
        type:"bar",
        orientation: "h",
      };
      var data = [trace1];
        
      // 9. Create the layout for the bar chart. 
        var barLayout = {
          title: "Top 10 Bacteria Culture Found",
          xaxis:{title: "sampleValues"},
          yaxis:{title: "Flicker Frequency"}
         };
      // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", data, barLayout);
   // 1. Create the trace for the bubble chart.
   var trace2 = {
    x: Top10otu_ids,
    y: sampleValues,
    text: otuLabels,
    mode: 'markers',
    marker: {
      size: sampleValues,
      color: "Top10otu_ids",
      colorscale: "Earth"
      
    }
  };
  var bubbleData = [trace2];
 // 2. Create the layout for the bubble chart.
  var bubbleLayout = {
    title: "Bacteria Culture Per Sample",
    xaxis: {title: "OTUID"},
    height: 600,
    width: 1200,
      };
    

  // 3. Use Plotly to plot the data with the layout.
  Plotly.newPlot("bubble", bubbleData,bubbleLayout);
  console.log(resultArrayresult)
//  // 1. Create a variable that filters the metadata array for the object with the desired sample number.
//  //function buildGauge(sample){
    WFREQ = resultArrayresult[0].wfreq
    console.log(WFREQ)
    var level = parseFloat(WFREQ);
    console.log(level)
    console.log("hello world")
//   // 4. Create the trace for the gauge chart.
    var data = [
     {
      type: "indicator",
      mode: "gauge+number+delta",
      value: level,
      title: { text: "Belly Button Washing Frequency <br> Scrubs per Week", font: { size: 24 } },
      delta: { reference: level, increasing: { color: "RebeccaPurple" } },
      gauge: {
          axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "darkblue" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 5], color: "cyan" },
            { range: [5, 10], color: "royalblue" }
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 8
          }
        }
      }
    ];
    
    
    // 5. Create the layout for the gauge chart.
    var layout = {
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "lavender",
      font: { color: "darkblue", family: "Arial" }
    };

 
  // 6. Use Plotly to plot the gauge data and layout.
Plotly.newPlot("gauge", data, layout)

 
    })
  
}


  