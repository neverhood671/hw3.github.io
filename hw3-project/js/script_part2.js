    /**
     * Loads in the table information from fifa-matches.json
     */
    d3.json('data/fifa-matches.json', function(error, data) {

      /**
       * Loads in the tree information from fifa-tree.csv and calls createTree(csvData) to render the tree.
       *
       */
      d3.csv("data/fifa-tree.csv", function(error, csvData) {

        //Create a unique "id" field for each game
        csvData.forEach(function(d, i) {
          d.id = d.Team + d.Opponent + i;
        });

        //Create Tree Object
        let tree = new Tree();
        tree.createTree(csvData);

        //Create Table Object and pass in reference to tree object (for hover linking)
        let table = new Table(data, tree);

        table.createTable();
        table.updateTable();
      });
    });


    function getMaxNumOfSomething(teamData, something) {
      var max = 0;
      if (something == "goals") {
        for (var k = 0; k < teamData.length; k++) {
          if (max < teamData[k].value["Goals Conceded"]) {
            max = teamData[k].value["Goals Conceded"]
          }
          if (max < teamData[k].value["Goals Made"]) {
            max = teamData[k].value["Goals Made"]
          }
        }
      } else {
        for (var k = 0; k < teamData.length; k++) {
          if (max < teamData[k].value["something"]) {
            max = teamData[k].value["something"]
          }
        }
      }
      return max;
    }


    function tableInit(data, columns) {
      // var table = d3.select('body').append('table')
      // var thead = table.append('thead')
      var self = this;
      var tbody = d3.select("#matchTable").select("tbody");

      // create a row for each object in the data
      var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');

      // create a cell in each row for each column
      var cells = rows.selectAll('td')
        .data(function(row) {
          return columns.map(function(column) {
            var value;
            switch (column) {
              case "Team":
                value = row.key;
                break;
              case "Goals":
                value = [row.value["Goals Conceded"], row.value["Goals Made"]];
                break;
              case "Round/Result":
                value = row.value["Result"]["label"];
                break;
              case "Wins":
                value = row.value["Wins"];
                break;
              case "Losses":
                value = row.value["Losses"];
                break;
              case "Total Games":
                value = row.value["TotalGames"];
                break;
              default:
                alert("Something wrong!");
            }
            return {
              column: column,
              value: value
            };
          });
        })
        .enter()
        .append('td')
        .attr("class", function(d) {
          if (d.column == "Wins" || d.column == "Losses" || d.column == "Total Games") {
            return "chartCol";
          } else if (d.column == "Goals") {
            return "goalsCol";
          } else {
            return "simple"
          };
        })
        .text(function(d) {
          return d.value;
        });

      d3.selectAll(".goalsCol").property('innerHTML', "");
      d3.selectAll(".goalsCol")
        .append("div")
        .attr("class", "bar_container")
        .append("svg").attr("class", "goal_chart");


      d3.selectAll(".goal_chart")
        .append("rect")
        .style("fill", function(d){
          return d.value[0] < d.value[1] ? "#ff6666" : "#5faae3";
        })
        .attr("height", "16px")
        .attr("width", function(d) {
          return (8.6 * Math.abs(d.value[0] - d.value[1])) +"px";
        })
        .attr("x", function(d) {
          var res = d.value[0] < d.value[1] ? d.value[0] : d.value[1];
          return (8 + res * 8.6) + "px"
        })
        .attr("y", "7px");;

      d3.selectAll(".goal_chart")
        .append("circle")
        .classed("made_goals", true)
        .attr("r", "8px")
        .attr("cx", function(d) {
          return (8 + d.value[0] * 8.6) + "px";
        })
        .attr("cy", "15px");

      d3.selectAll(".goal_chart")
        .append("circle")
        .classed("conceded_gols", true)
        .attr("r", "8px")
        .attr("cx", function(d) {
          return (8 + d.value[1] * 8.6) + "px";
        })
        .attr("cy", "15px");


      d3.selectAll(".chartCol").property('innerHTML', "");
      d3.selectAll(".chartCol")
        .append("div")
        .attr("class", "bar_container")
        .append("div").attr("class", "chart")
        .property('innerHTML', function(d) {
          if (d.value > 0) {
            return d.value;
          } else {
            return "";
          }
        });

      //TODO: find max val
      var maxVal = 10;

      d3.selectAll(".chart")
        .style("width", function(d) {
          return (d.value * 10) + "px";
        });

      d3.selectAll(".chart")
        .style("background-color", function(d) {
          if (d) {
            var k = 100 - 80 * d.value / maxVal;
            return "hsl(180,50%," + ~~k + "%)";
          }
        });

    }




    function findMaxVal(data) {
      var maxVal = 0;
      for (var i = 0; i < data.length; i++) {
        if (maxVal < data[i].value) {
          maxVal = data[i].value;
        }
      }
      return maxVal;
    }



    // // // ********************** HACKER VERSION ***************************
    // /**
    //  * Loads in fifa-matches.csv file, aggregates the data into the correct format,
    //  * then calls the appropriate functions to create and populate the table.
    //  *
    //  */
    // d3.csv("data/fifa-matches.csv", function (error, matchesCSV) {

    //     /**
    //      * Loads in the tree information from fifa-tree.csv and calls createTree(csvData) to render the tree.
    //      *
    //      */
    //     d3.csv("data/fifa-tree.csv", function (error, treeCSV) {

    //     // ******* TODO: PART I *******


    //     });

    // });
    // // ********************** END HACKER VERSION ***************************
