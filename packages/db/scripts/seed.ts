import { db } from "../client";

async function generateFaculties() {}

async function generateRoles() {}

function seed() {
  Promise.all([generateFaculties(), generateRoles()])
    .then(() => {
      console.log("Seed successful");
      process.exit(0);
    })
    .catch((error) => {
      console.log("Seed failed", error);
      process.exit(1);
    });
}

seed();
