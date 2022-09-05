var url = "worldwide_coffee_market.csv";

d3.csv(url).then(function(csvData){
    console.log(csvData)
    //populate country to drop down box
    // var dropDownOption = d3.select("#selDataset").selectAll("option").data(ids);
    // dropDownOption.enter().append("option")
    // .attr("value",function(d){
    //     return d;
    // })
    // .text(function(d){
    //     return d;
    // });
});