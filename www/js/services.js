(function() {
  "use strict";
  angular.module("memo")
  .factory("recordsService", recordsService);

  function recordsService(DB) {
    var service = {
      addEvent: addEvent,
      addGame: addGame,
      fetchRecords: fetchRecords
    };
    return service;

    function addEvent(name, contest, date, place, official, team) {
      // 大会じゃないと公認も団体もないはず
      if( contest != 1) {
        official = 0;
        team = 0;
      }
      var args = [name, contest, date, place, official, team];
      DB.query("INSERT INTO events(name, contest, date, place, official, team)"+
      " VALUES(?,?,?,?,?,?)",args)
      .then(console.log("insert into events"));
    }
    function addGame() {

    }
    function fetchRecords() {

    }
  }
})();
