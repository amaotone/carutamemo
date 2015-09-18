(function() {
angular.module("memo")
.factory('DB', DB)
.constant("DB_CONFIG", {
  name: "DB",
  tables: [
    {
      name: "testdb",
      columns: [
        {name: "id", type: "integer primary key autoincrement"},
        {name: "content", type: "text"}
      ]
    },
    {
      name: "events",
      columns: [
        {name: "id", type: "integer primary key AUTOINCREMENT"},
        {name: "name", type: "text default null"},
        {name: "contest", type: "integer not null"}, // 0:練習 1:大会
        {name: "date", type: "none not null"},
        {name: "place", type: "text default null"},
        // 大会用設定
        {name: "official", type: "integer not null"}, // 0:非公認 1:公認
        {name: "team", type: "integer not null"}, // 0:個人戦 1:団体戦
      ]
    },
    {
      name: "games",
      columns: [
        {name: "id", type: "integer primary key AUTOINCREMENT"},
        {name: "opponent", type: "text default null"},
        {name: "result", type: "integer not null"}, // 0:負け 1:勝ち
        {name: "number", type: "integer not null"}, // -50 ~ 50
        {name: "comment", type: "text default null"},
        {name: "event_key", type: "integer not null"}
      ]
    }
  ]
});

function DB($q, DB_CONFIG) {
    var self = this;
    self.db = null;
    self.init = function() {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];

            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });

            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
            console.log('Table ' + table.name + ' initialized');
        });
    };

    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();

        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });

        return deferred.promise;
    };

    self.fetchAll = function(result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }

        return output;
    };

    self.fetch = function(result) {
        return result.rows.item(0);
    };

    return self;
}

})();
