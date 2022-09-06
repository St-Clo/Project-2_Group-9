var url = "worldwide_coffee_market.csv";
var Country_Code = [];
var Country_Name = [];
var Market_Year = [];
var Arabica_Production = [];
var Robusta_Production = [];
var Other_Production = [];
var Total_Production = [];
var Bean_Exports = [];
var Roast_Ground_Exports = [];
var Soluble_Exports = [];
var Total_Exports = [];
var Bean_Imports = [];
var Roast_Ground_Imports = [];
var Soluble_Imports = [];
var Total_Imports = [];
var Roast_Ground_consumption = [];
var Soluble_consumption = [];
var Total_consumption = [];
var country_ids = [];
var table_data = [];


d3.csv(url).then(function (csvData) {

    table_data = csvData;
    var lines_legend = [];
    var lines_value = [[], [], [], []];
    var lines_year = [];
    //ready data to variable arrays
    csvData.forEach((e, index) => {
        var duplicate = 0;
        //get unique values of country.
        if (index == 0) {
            country_ids.push(e.Country_Name);
        }
        else {
            duplicate = 0;
            for (var i = 0; i < country_ids.length; i++) {
                if (e.Country_Name == country_ids[i]) {
                    duplicate = 1;
                    break;
                }
                else {
                    continue;
                }
            };
            if (duplicate == 0) {
                country_ids.push(e.Country_Name);
            }
        };
        //get default values
        if (e.Country_Name == country_ids[0]) {
            lines_value[0].push(e.Arabica_Production);
            lines_value[1].push(e.Robusta_Production);
            lines_value[2].push(e.Other_Production);
            lines_value[3].push(e.Total_Production);
            lines_year.push(e.Market_Year);
        }

    });

    //populate countries to drop down box
    var dropDownOption = d3.select("#selDataset").selectAll("option").data(country_ids);
    dropDownOption.enter().append("option")
        .attr("value", function (d) {
            return d;
        })
        .text(function (d) {
            return d;
        });

    //get default value
    var country = country_ids[0];
    var param = "Production";
    lines_legend = ["Arabica Production", "Robusta Production", "Other Production", "Total Production"];

    //draw default lines
    var trace0 = {
        x: lines_year,
        y: lines_value[0],
        name: lines_legend[0],
        type: "scatter"
    };
    var trace1 = {
        x: lines_year,
        y: lines_value[1],
        name: lines_legend[1],
        type: "scatter"
    };
    var trace2 = {
        x: lines_year,
        y: lines_value[2],
        name: lines_legend[2],
        type: "scatter"
    };
    var trace3 = {
        x: lines_year,
        y: lines_value[3],
        name: lines_legend[3],
        type: "scatter"
    };
    var data = [trace0, trace1, trace2, trace3];
    var layout = {
        title: `<b> ${param} of ${country}</b>`,
        yaxis: {title: 'Tons'}
    };
    Plotly.newPlot("line", data, layout);


});

// update per country chosen
d3.selectAll("#selDataset").on("change", optionChanged);
function optionChanged() {
    //get dropdown value
    var country = d3.select("#selDataset").property("value");
    //get current param
    var param = d3.select('input[name="params"]:checked').node().value;
    var lines_legend = [];
    var lines_value = [[], [], [], []];
    var lines_year = [];

    //get updated values
    table_data.forEach((e, index) => {
        if (e.Country_Name == country) {
            switch (param) {
                case "Consumption":
                    lines_value[0].push(e.Roast_Ground_consumption);
                    lines_value[1].push(e.Soluble_consumption);
                    lines_value[2].push(e.Total_consumption);
                    lines_year.push(e.Market_Year);
                    lines_legend = ["Roast Ground consumption", "Soluble consumption", "Total consumption", ""];
                    break;
                case "Import":
                    lines_value[0].push(e.Bean_Imports);
                    lines_value[1].push(e.Roast_Ground_Imports);
                    lines_value[2].push(e.Soluble_Imports);
                    lines_value[3].push(e.Total_Imports);
                    lines_year.push(e.Market_Year);
                    lines_legend = ["Bean Imports", "Roast Ground Imports", "Soluble Imports", "Total Imports"];
                    break;
                case "Export":
                    lines_value[0].push(e.Bean_Exports);
                    lines_value[1].push(e.Roast_Ground_Exports);
                    lines_value[2].push(e.Soluble_Exports);
                    lines_value[3].push(e.Total_Exports);
                    lines_year.push(e.Market_Year);
                    lines_legend = ["Bean Exports", "Roast Ground Exports", "Soluble Exports", "Total Exports"];
                    break;
                default:
                    lines_value[0].push(e.Arabica_Production);
                    lines_value[1].push(e.Robusta_Production);
                    lines_value[2].push(e.Other_Production);
                    lines_value[3].push(e.Total_Production);
                    lines_year.push(e.Market_Year);
                    lines_legend = ["Arabica Production", "Robusta Production", "Other Production", "Total Production"];
                    break;
            }

        }
    });
    //draw default lines
    var trace0 = {
        x: lines_year,
        y: lines_value[0],
        name: lines_legend[0],
        type: "scatter"
    };
    var trace1 = {
        x: lines_year,
        y: lines_value[1],
        name: lines_legend[1],
        type: "scatter"
    };
    var trace2 = {
        x: lines_year,
        y: lines_value[2],
        name: lines_legend[2],
        type: "scatter"
    };
    var trace3 = {
        x: lines_year,
        y: lines_value[3],
        name: lines_legend[3],
        type: "scatter"
    };
    var data = [trace0, trace1, trace2, trace3];
    var layout = {
        title: `<b> ${param} of ${country}</b>`,
        yaxis: {title: 'Tons'}
    };
    //redraw plot bar
    Plotly.react("line", data, layout);
}

// update per parameters chosen
d3.selectAll('input[name="params"]').on("change", radioChanged);
function radioChanged() {
    //get dropdown value
    var country = d3.select("#selDataset").property("value");
    //get current param
    var param = d3.select('input[name="params"]:checked').node().value;
    var lines_legend = [];
    var lines_value = [[], [], [], []];
    var lines_year = [];

    //get updated values
    table_data.forEach((e, index) => {
        if (e.Country_Name == country) {
            switch (param) {
                case "Consumption":
                    lines_value[0].push(e.Roast_Ground_consumption);
                    lines_value[1].push(e.Soluble_consumption);
                    lines_value[2].push(e.Total_consumption);
                    lines_year.push(e.Market_Year);
                    lines_legend = ["Roast Ground consumption", "Soluble consumption", "Total consumption", ""];
                    break;
                case "Import":
                    lines_value[0].push(e.Bean_Imports);
                    lines_value[1].push(e.Roast_Ground_Imports);
                    lines_value[2].push(e.Soluble_Imports);
                    lines_value[3].push(e.Total_Imports);
                    lines_year.push(e.Market_Year);
                    lines_legend = ["Bean Imports", "Roast Ground Imports", "Soluble Imports", "Total Imports"];
                    break;
                case "Export":
                    lines_value[0].push(e.Bean_Exports);
                    lines_value[1].push(e.Roast_Ground_Exports);
                    lines_value[2].push(e.Soluble_Exports);
                    lines_value[3].push(e.Total_Exports);
                    lines_year.push(e.Market_Year);
                    lines_legend = ["Bean Exports", "Roast Ground Exports", "Soluble Exports", "Total Exports"];
                    break;
                default:
                    lines_value[0].push(e.Arabica_Production);
                    lines_value[1].push(e.Robusta_Production);
                    lines_value[2].push(e.Other_Production);
                    lines_value[3].push(e.Total_Production);
                    lines_year.push(e.Market_Year);
                    lines_legend = ["Arabica Production", "Robusta Production", "Other Production", "Total Production"];
                    break;
            }

        }
    });
    //draw default lines
    var trace0 = {
        x: lines_year,
        y: lines_value[0],
        name: lines_legend[0],
        type: "scatter"
    };
    var trace1 = {
        x: lines_year,
        y: lines_value[1],
        name: lines_legend[1],
        type: "scatter"
    };
    var trace2 = {
        x: lines_year,
        y: lines_value[2],
        name: lines_legend[2],
        type: "scatter"
    };
    var trace3 = {
        x: lines_year,
        y: lines_value[3],
        name: lines_legend[3],
        type: "scatter"
    };
    var data = [trace0, trace1, trace2, trace3];
    var layout = {
        title: `<b> ${param} of ${country}</b>`,
        yaxis: {title: 'Tons'}
    };
    //redraw plot bar
    Plotly.react("line", data, layout);
}