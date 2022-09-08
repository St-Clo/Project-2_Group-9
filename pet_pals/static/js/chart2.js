const url = "/api/coffee";

var country_ids = [];
var table_data = [];
var total_rows = 0;
var myChart;
var ctx = document.getElementById('lineChart');

d3.json(url).then(function (csvData) {

    table_data = csvData[0];
    total_rows = table_data.Country_Name.length;

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
    
    var labels = lines_year;
    var data = {
        labels: labels,
        datasets: [{
            label: lines_legend[0],
            data: lines_value[0],
            fill: false,
            borderColor: 'rgb(255, 60, 60)',
            tension: 0.1
        },
        {
            label: lines_legend[1],
            data: lines_value[1],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
        {
            label: lines_legend[2],
            data: lines_value[2],
            fill: false,
            borderColor: 'rgb(75, 192, 45)',
            tension: 0.1
        },
        {
            label: lines_legend[3],
            data: lines_value[3],
            fill: false,
            borderColor: 'rgb(150, 120, 240)',
            tension: 0.1
        }
        ]
    };
    var config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: `${param} of ${country}`,
                    font: {
                        size: 20
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        font: {
                            size: 20
                        }
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Tons',
                        font: {
                            size: 20
                        }
                    }
                }
            }
        }
    };
    myChart = new Chart(ctx,
        config
    );

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
    myChart.destroy();
    var labels = lines_year;
    var data = {
        labels: labels,
        datasets: [{
            label: lines_legend[0],
            data: lines_value[0],
            fill: false,
            borderColor: 'rgb(255, 60, 60)',
            tension: 0.1
        },
        {
            label: lines_legend[1],
            data: lines_value[1],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
        {
            label: lines_legend[2],
            data: lines_value[2],
            fill: false,
            borderColor: 'rgb(75, 192, 45)',
            tension: 0.1
        },
        {
            label: lines_legend[3],
            data: lines_value[3],
            fill: false,
            borderColor: 'rgb(150, 120, 240)',
            tension: 0.1
        }
        ]
    };
    var config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: `${param} of ${country}`,
                    font: {
                        size: 20
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        font: {
                            size: 20
                        }
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Tons',
                        font: {
                            size: 20
                        }
                    }
                }
            }
        }
    };
    myChart = new Chart(ctx,
        config
    );

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

    myChart.destroy();
    var labels = lines_year;
    var data = {
        labels: labels,
        datasets: [{
            label: lines_legend[0],
            data: lines_value[0],
            fill: false,
            borderColor: 'rgb(255, 60, 60)',
            tension: 0.1
        },
        {
            label: lines_legend[1],
            data: lines_value[1],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
        {
            label: lines_legend[2],
            data: lines_value[2],
            fill: false,
            borderColor: 'rgb(75, 192, 45)',
            tension: 0.1
        },
        {
            label: lines_legend[3],
            data: lines_value[3],
            fill: false,
            borderColor: 'rgb(150, 120, 240)',
            tension: 0.1
        }
        ]
    };
    var config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: `${param} of ${country}`,
                    font: {
                        size: 20
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        font: {
                            size: 20
                        }
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Tons',
                        font: {
                            size: 20
                        }
                    }
                }
            }
        }
    };
    myChart = new Chart(ctx,
        config
    );

};

