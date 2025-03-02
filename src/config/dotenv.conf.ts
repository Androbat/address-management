import dotenv from "dotenv";
dotenv.config();

const envVars = ["MONGODB_URI", "DATABASE", "SERVER_PORT"];

const missingVars = envVars.filter((envVar) => {
    return !process.env[envVar];
});

if (missingVars.length){
    console.log(`Missing env variables ${missingVars.map((envVar) => `"${envVar}"`).join(", ")}`);
    process.exit(1);
}

const [mongoEnv, databaseEnv] = envVars.map((key) => {
    const value = process.env[key];
    if (!value){
        throw new Error();
    }
    return value;
});

export { mongoEnv, databaseEnv };


