const url = "/api/coffee";
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
var total_rows = 0

d3.json(url).then(function (csvData) {

    table_data = csvData[0];
    console.log(table_data);
    total_rows = table_data.Country_Name.length;
    console.log(total_rows);

    var lines_legend = [];
    var lines_value = [[], [], [], []];
    var lines_year = [];
    //ready data to variable arrays

    for (var j = 0; j < total_rows; j++) {
        var duplicate = 0;
        //get unique values of country.
        if (j == 0) {
            country_ids.push(table_data.Country_Name[j]);
        }
        else {
            duplicate = 0;
            for (var i = 0; i < country_ids.length; i++) {
                if (table_data.Country_Name[j] == country_ids[i]) {
                    duplicate = 1;
                    break;
                }
                else {
                    continue;
                }
            };
            if (duplicate == 0) {
                country_ids.push(table_data.Country_Name[j]);
            }
        };
        //get default values
        if (table_data.Country_Name[j] == country_ids[0]) {
            lines_value[0].push(table_data.Arabica_Production[j]);
            lines_value[1].push(table_data.Robusta_Production[j]);
            lines_value[2].push(table_data.Other_Production[j]);
            lines_value[3].push(table_data.Total_Production[j]);
            lines_year.push(table_data.Market_Year[j]);
        };
    };
    console.log(country_ids);
    console.log(lines_year);
    console.log(lines_value[0]);

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
    for (var j = 0; j < total_rows; j++) {
        if (table_data.Country_Name[j] == country) {
            switch (param) {
                case "Consumption":
                    lines_value[0].push(table_data.Roast_Ground_consumption[j]);
                    lines_value[1].push(table_data.Soluble_consumption[j]);
                    lines_value[2].push(table_data.Total_consumption[j]);
                    lines_year.push(table_data.Market_Year[j]);
                    lines_legend = ["Roast Ground consumption", "Soluble consumption", "Total consumption", ""];
                    break;
                case "Import":
                    lines_value[0].push(table_data.Bean_Imports[j]);
                    lines_value[1].push(table_data.Roast_Ground_Imports[j]);
                    lines_value[2].push(table_data.Soluble_Imports[j]);
                    lines_value[3].push(table_data.Total_Imports[j]);
                    lines_year.push(table_data.Market_Year[j]);
                    lines_legend = ["Bean Imports", "Roast Ground Imports", "Soluble Imports", "Total Imports"];
                    break;
                case "Export":
                    lines_value[0].push(table_data.Bean_Exports[j]);
                    lines_value[1].push(table_data.Roast_Ground_Exports[j]);
                    lines_value[2].push(table_data.Soluble_Exports[j]);
                    lines_value[3].push(table_data.Total_Exports[j]);
                    lines_year.push(table_data.Market_Year[j]);
                    lines_legend = ["Bean Exports", "Roast Ground Exports", "Soluble Exports", "Total Exports"];
                    break;
                default:
                    lines_value[0].push(table_data.Arabica_Production[j]);
                    lines_value[1].push(table_data.Robusta_Production[j]);
                    lines_value[2].push(table_data.Other_Production[j]);
                    lines_value[3].push(table_data.Total_Production[j]);
                    lines_year.push(table_data.Market_Year[j]);
                    lines_legend = ["Arabica Production", "Robusta Production", "Other Production", "Total Production"];
                    break;
            }

        }
    };
    //redraw
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
};

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
    for (var j = 0; j < total_rows; j++) {
        if (table_data.Country_Name[j] == country) {
            switch (param) {
                case "Consumption":
                    lines_value[0].push(table_data.Roast_Ground_consumption[j]);
                    lines_value[1].push(table_data.Soluble_consumption[j]);
                    lines_value[2].push(table_data.Total_consumption[j]);
                    lines_year.push(table_data.Market_Year[j]);
                    lines_legend = ["Roast Ground consumption", "Soluble consumption", "Total consumption", ""];
                    break;
                case "Import":
                    lines_value[0].push(table_data.Bean_Imports[j]);
                    lines_value[1].push(table_data.Roast_Ground_Imports[j]);
                    lines_value[2].push(table_data.Soluble_Imports[j]);
                    lines_value[3].push(table_data.Total_Imports[j]);
                    lines_year.push(table_data.Market_Year[j]);
                    lines_legend = ["Bean Imports", "Roast Ground Imports", "Soluble Imports", "Total Imports"];
                    break;
                case "Export":
                    lines_value[0].push(table_data.Bean_Exports[j]);
                    lines_value[1].push(table_data.Roast_Ground_Exports[j]);
                    lines_value[2].push(table_data.Soluble_Exports[j]);
                    lines_value[3].push(table_data.Total_Exports[j]);
                    lines_year.push(table_data.Market_Year[j]);
                    lines_legend = ["Bean Exports", "Roast Ground Exports", "Soluble Exports", "Total Exports"];
                    break;
                default:
                    lines_value[0].push(table_data.Arabica_Production[j]);
                    lines_value[1].push(table_data.Robusta_Production[j]);
                    lines_value[2].push(table_data.Other_Production[j]);
                    lines_value[3].push(table_data.Total_Production[j]);
                    lines_year.push(table_data.Market_Year[j]);
                    lines_legend = ["Arabica Production", "Robusta Production", "Other Production", "Total Production"];
                    break;
            }

        }
    };

    //redraw
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
};