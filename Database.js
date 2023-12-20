import * as SQLite from "expo-sqlite";

const database_name = "HikingApp.db";
const database_version = "1.0";
const database_displayname = "Hiking App Database";
const database_size = 200000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
);

const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS hikes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        location TEXT,
        date TEXT,
        parking TEXT,
        length INTEGER,
        level TEXT,
        description TEXT
      );`,
      [],
      () => console.log("Database and table created successfully."),
      (error) => console.log("Error occurred while creating the table.", error)
    );
  });
};

const getHikes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM hikes",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteHike = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM hikes WHERE id = ?",
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const addHike = (name, location, date, parking, length, level, description) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO hikes (name, location, date, parking, length, level, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, location, date, parking, length, level, description],
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const editHike = (id, name, location, date, parking, length, level, description) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        console.log("Updating hike with id:", id);
        console.log("New values - name:", name, "location:", location, "date:", date, "parking:", parking, "length:", length, "level:", level, "description:", description);
  
        tx.executeSql(
          "UPDATE hikes SET name = ?, location = ?, date = ?, parking = ?, length = ?, level = ?, description = ? WHERE id = ?",
          [name, location, date, parking, length, level, description, id],
          () => {
            console.log("Hike updated successfully");
            resolve();
          },
          (_, error) => {
            console.error("Error updating hike:", error);
            reject(error);
          }
        );
      });
    });
  };

  const deleteAllHikes = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM hikes",
          [],
          () => {
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const searchHikes = (query) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM hikes WHERE name LIKE ?",
          [`%${query}%`], // Use the query parameter in the WHERE clause
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };
  
  
  const Database = {
    initDatabase,
    addHike,
    getHikes,
    deleteHike,
    editHike,
    deleteAllHikes,
    searchHikes, 
  };

export default Database;