(function() {
  "use strict";
  angular.module("memo")
  .factory("recordsService", recordsService)
  .factory("configService", configService);

  function configService(localStorageService) {
    var myClass = fetchMyClass();
    var service = {
      myClass: myClass,
      fetchMyClass: fetchMyClass,
      saveMyClass: saveMyClass
    };
    return service;

    function fetchMyClass() {
      var _myClass = localStorageService.get("myClass");
      if (_myClass === null) {
        localStorageService.set("myClass","F");
        _myClass = "F";
      }
      return _myClass;
    }

    function saveMyClass(val) {
      localStorageService.set("myClass", val);
    }
  }

  function recordsService($q, DB) {
    var service = {
      addEvent: addEvent,
      addGame: addGame,
      fetchAllGames: fetchAllGames,
      fetchAllEvents: fetchAllEvents,
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

    function fetchAllEvents() {
      var events = $q.defer();
      DB.query("SELECT id, name, date FROM events")
      .then(
        function(result){
          events.resolve(DB.fetchAll(result));
          console.log("fetch all events");
        }, function(error) {
          console.log("大会データを種得できませんでした");
        }
      );
      return events.promise;
    }

    function fetchAllGames() {
      var games = $q.defer();
      DB.query("SELECT * FROM games")
      .then(
        function(result) {
          games.resolve(DB.fetchAll(result));
          console.log("fetch all games");
        }, function(error) {
          console.log("試合データを取得できませんでした");
        }
      );
      return games.promise;
    }

    function fetchGamesByKey(event_key) {
      var games = $q.defer();
      DB.query("SELECT * FROM games WHERE event_key = ? ;", [event_key])
      .then(
        function(result) {
          games.resolve(DB.fetchAll(result));
        }, function(error) {
          console.log("試合データを取得できませんでした");
        }
      );
      return games.promise;
    }

    function fetchAllRecords() {
      var records = $q.defer();
      var events = fetchAllEvents();
      var games = fetchAllGames();
      $q.all([events,games])
      .then(function() {
        angular.forEach(events, function(event, i) {
        })
        records.resolve(games);
      });
      return records.promise;
    }
  }
})();
