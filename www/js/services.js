(function() {
  "use strict";
  angular.module("memo")
  .factory("recordsService", recordsService);

  function recordsService($q, DB) {
    var service = {
      addEvent: addEvent,
      addGame: addGame,
      fetchAllRecords: fetchAllRecords
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
    function addGame(opponent, result, number, comment, event_key) {
      var args = [opponent, result, number, comment, event_key];
      DB.query("INSERT INTO games(opponent, result, number, comment, event_key)"+
      " VALUES(?,?,?,?,?)", args)
      .then(console.log("insert into games"));
    }
    function fetchAllRecords() {
      var records = $q.defer();

      // event -> 対応するgame の順に取得
      DB.query("SELECT * FROM events")
      .then(function(result){
        records.resolve(DB.fetchAll(result));
      })
      return records.promise;
    }
  }
})();
