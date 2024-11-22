import mongoose from "mongoose";
import fs from "fs";
import csvParser from "csv-parser";
import {ScoreModel} from "./score";
require("dotenv").config();
async function load_csv(csv_file_path: fs.PathLike): Promise<Array<Object>> {
    return new Promise((resolve, reject) => {
        const result: Array<Object> = [];
        fs.createReadStream(csv_file_path)
            .pipe(csvParser())
            .on("data", (data) => {
                result.push(data);
            })
            .on("end", () => {
                resolve(result);
            })
            .on("error", (err: Error) => {
                reject(err);
            });
    });
}
mongoose.connect(process.env.MONGODB_URI as string).then(async () => {
    console.log("[SERVER] Successfully connect to mongo-db");
    console.log("Deleting...");
    await ScoreModel.deleteMany({});
    console.log("Load all scores...");
    const data = await load_csv("dataset/diem_thi_thpt_2024.csv");
    console.log("Inserting...");
    await ScoreModel.insertMany(data);
    console.log("Done");
}).catch((err) => {
    throw err;
});
