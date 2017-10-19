/** Class implementing the bar chart view. */
class BarChart {

  /**
   * Create a bar chart instance and pass the other views in.
   * @param worldMap
   * @param infoPanel
   * @param allData
   */
  constructor(worldMap, infoPanel, allData) {
    this.worldMap = worldMap;
    this.infoPanel = infoPanel;
    this.allData = allData;
  }

  /**
   * Render and update the bar chart based on the selection of the data type in the drop-down box
   */
  updateBarChart(selectedDimension) {



    // ******* TODO: PART I *******


    // Create the x and y scales; make
    // sure to leave room for the axes

    // Create colorScale

    // Create the axes (hint: use #xAxis and #yAxis)

    // Create the bars (hint: use #bars)

    var sortedData = sortData(data, "year");

    var margin = 50;
    var width = 500;
    var height = 400;
    var svg = d3.select("#barChart")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(0,70)");



    var xScale = d3.scaleBand().range([0, width - margin]).padding(0.4),
      yScale = d3.scaleLinear().range([height - margin, 0]);

    xScale.domain(sortedData.map(function(d) {
      return d.year;
    }));
    yScale.domain([0, d3.max(sortedData, function(d) {
      return d.goals;
    })]);

    svg.select("#xAxis")
      .attr("transform", "translate(60," + (height - margin) + ")")
      .call(d3.axisBottom(xScale));

    svg.select("#xAxis").selectAll("text")
      .style("transform", "rotate(270deg) translate(-35px,-15px)");

    svg.select("#yAxis")
      .attr("transform", "translate(60,0)")
      .call(d3.axisLeft(yScale).tickFormat(function(d) {
        return d;
      }).ticks(10))
      .append("text")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("goals");

    svg.selectAll("#bars")
           .data(sortedData)
           .enter().append("rect")
           .attr("class", "bar")
           .attr("x", function(d) { return xScale(d.year); })
           .attr("y", function(d) { return yScale(d.goals); })
           .attr("width", xScale.bandwidth())
           .attr("height", function(d) { return height - yScale(d.goals); })
           .attr("transform", "translate(37,-50)");




    // ******* TODO: PART II *******

    // Implement how the bars respond to click events
    // Color the selected bar to indicate is has been selected.
    // Make sure only the selected bar has this new color.

    // Call the necessary update functions for when a user clicks on a bar.
    // Note: think about what you want to update when a different bar is selected.

  }

  /**
   *  Check the drop-down box for the currently selected data type and update the bar chart accordingly.
   *
   *  There are 4 attributes that can be selected:
   *  goals, matches, attendance and teams.
   */
  chooseData() {
    // ******* TODO: PART I *******
    //Changed the selected data when a user selects a different
    // menu item from the drop down.

  }
}
