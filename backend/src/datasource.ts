import { DataSource } from "typeorm";

const datasource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "thegoodcorner",
  password: "password123",
  database: "thegoodcorner",
  entities: ["./src/entities/*.ts"],
  synchronize: true,
  logging: true,
});

export default datasource;
