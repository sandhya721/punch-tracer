const couchbase = require("couchbase");

async function connectDB() {
  const cluster = await couchbase.connect(
    "couchbases://your-cluster-url",
    {
      username: "username",
      password: "password",
    }
  );

  const bucket = cluster.bucket("punchbucket");
  const collection = bucket.defaultCollection();

  return { cluster, collection };
}

module.exports = connectDB;
