const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "cricketTeam.db");

let  dbObject = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.get("/players/:playerId/", async (request, response) => {
const getPlayersQuery = `
 SELECT
 *
 FROM
 cricket_team;`;
const playersArray = await database.all(getPlayersQuery);
 response.send(
 playersArray.map((eachPlayer) =>
convertDbObjectToResponseObject(eachPlayer)
)
);
});

app.post("/players/", async (request, response) => {
  const playerDetails = request.body;
  const {
    playerName,
    jerseyNumber
    role,
  } = playerDetails;
  const addPlayerQuery = `
    INSERT INTO
      player (playerName,
    jerseyNumber
    role,)
    VALUES
      (
        '${playerName}',
         ${playerId},
         ${jerseyNumber},
         ${role},
      );`;

  const dbResponse = await db.run(addPlayerQuery);
  const playerId = dbResponse.lastID;
  response.send({ playerId: playerId });
});

app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const playerDetails = request.body;
  const {
    playerId: dbObject.player_id,
    playerName: dbObject.player_name,
    jerseyNumber: dbObject.jersey_number,
    role: dbObject.role,
  } = playerDetails;
  const updatePlayerQuery = `
    UPDATE
      player
    SET
    playerName = ${playerName}',
    jerseyNumber:  ${jerseyNumber},
    
    WHERE
      player_id = ${playerId};`;
  await db.run(updatePlayerQuery);
  response.send("Player Updated Successfully");
});

app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const deletePlayerQuery = `
    DELETE FROM
      player
    WHERE
      player_id = ${playerId};`;
  await db.run(deletePlayerQuery);
  response.send("Player Deleted Successfully");
});
