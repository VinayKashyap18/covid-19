const a = require("express");
const e = a();
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
const db = null;
e.use(a.json);
const dbpath = path.join(__dirname, "covid19India.db");
const init = async () => {
  try {
    db = open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    e.listen(3000, () => {
      console.log("server is starting ");
    });
  } catch (error) {
    console.log("error");
  }
};
init();

const state = (a) => {
  return {
    stateId: a.state_id,
    state_name: a.state_name,
    population: population,
  };
};
e.get("/states/", async (request, response) => {
  const a = `select * from state`;
  const p = await db.all(a);
  const q = p.map((e) => state(e));
  response.send(q);
});
