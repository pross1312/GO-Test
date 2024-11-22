import express, {Express, NextFunction, Request, Response} from "express";
import mongoose from "mongoose";
import {ScoreModel} from "./score";
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI as string).then(() => {
    console.log("[SERVER] Successfully connect to mongo-db");
}).catch((err) => {
    throw err;
});

const app: Express = express();

function isValidId(regId: string): Boolean {
    return /^\d{8}$/.test(regId);
}

function isValidSubject(subject: string): Boolean {
    const allSubjects = ["toan","ngu_van","ngoai_ngu","vat_li","hoa_hoc","sinh_hoc","lich_su","dia_li","gdcd"];
    return allSubjects.includes(subject);
}

app.use((req: Request, res: Response, next: NextFunction) => {
    // res.appendHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    // res.appendHeader("Access-Control-Allow-Origin", "https://golden-owl-test-frontend-seven.vercel.app");
    res.appendHeader("Access-Control-Allow-Origin", "*");
    res.appendHeader("Access-Control-Allow-Methods", "*");
    res.appendHeader("Access-Control-Allow-Headers", "*");
    next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Client request for: [${req.path}]`);
    next();
});

app.get("/detail/:regId", async (req: Request, res: Response) => {
    const regId = req.params.regId || "";
    if (regId === "") {
        res.status(400).send({data: null, error: "Missing registration id"});
    } else if (!isValidId(regId)) {
        res.status(200).send({data: null, error: "Invalid registration id"});
    } else {
        const score = await ScoreModel.findOne({sbd: regId});
        if (score) res.status(200).send({data: score, error: null});
        else res.status(200).send({
            data: null,
            error: "Registration ID not found",
        });
    }
});

app.get("/report/:subject", async (req: Request, res: Response) => {
    const subject = req.params.subject || "";
    console.log(subject);
    let result = {
        level1: 0,
        level2: 0,
        level3: 0,
        level4: 0,
    };
    if (subject === undefined) {
        res.status(400).send({data: null, error: "Missing subject"});
    } else if (!isValidSubject(subject)) {
        res.status(200).send({data: null, error: "Invalid subject"});
    } else {
        const report = await ScoreModel.aggregate([
            {
                $project: {
                    // Define levels for the subject 'toan'
                    level1: { $cond: [{ $gte: [`\$${subject}`, 8] }, 1, 0] },  // >= 8
                    level2: { $cond: [{ $and: [{ $gte: [`\$${subject}`, 6] }, { $lt: [`\$${subject}`, 8] }] }, 1, 0] }, // 6 <= toan < 8
                    level3: { $cond: [{ $and: [{ $gte: [`\$${subject}`, 4] }, { $lt: [`\$${subject}`, 6] }] }, 1, 0] }, // 4 <= toan < 6
                    level4: { $cond: [{ $lt: [`\$${subject}`, 4] }, 1, 0] }  // < 4
                }
            },
            {
                $group: {
                    _id: null,  // Aggregate into one document
                    level1: { $sum: "$level1" },  // Count students in level 1
                    level2: { $sum: "$level2" },  // Count students in level 2
                    level3: { $sum: "$level3" },  // Count students in level 3
                    level4: { $sum: "$level4" }   // Count students in level 4
                }
            },
            {
                $project: {
                    _id: 0,  // Exclude _id from the result
                    level1: 1,
                    level2: 1,
                    level3: 1,
                    level4: 1
                }
            }
        ]);
        console.log(report);
        if (report && report[0]) res.send({data: report[0], error: null});
    }
});

app.get("/list/top10/groupA", async (req: Request, res: Response) => {
    const top10 = await ScoreModel.aggregate([
        {$set: {
            sum: {
                $add: ['$toan', '$vat_li', '$hoa_hoc']
            }
        }},
        {$sort: {sum: -1}},
        {$limit: 10},
    ]);
    if (top10) {
        res.send({data: top10, error: null});
    } else {
        res.status(500).send({data: null, error: "Server error"});
    }
});

app.use((req: Request, res, Response) => {
    res.status(404).send({data: null, error: "Not found"});
});

app.listen(3000, () => {
    console.log("[SERVER] Server started on localhost:9999");
});[0]