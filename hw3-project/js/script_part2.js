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


    function getMaxNumOfTeamGoals(teamData) {
      var max = 0;
      for (var k = 0; k < teamData.length; k++) {
        if (max < teamData[k].value["Goals Conceded"]) {
          max = teamData[k].value["Goals Conceded"]
        }
        if (max < teamData[k].value["Goals Made"]) {
          max = teamData[k].value["Goals Made"]
        }
      }
      return max;
    }


    function getArrayOf(maxVal){
      var res = [];
      var k = 0;
      res[0] = 0;
      while (res[k] < maxVal){
        k++;
        res[k].push(res[k-1]+2);
      }
      return res;
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
