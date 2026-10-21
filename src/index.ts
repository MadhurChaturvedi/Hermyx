
import express from "express";
import cors from "cors";
import { simpleGit } from "simple-git";
import { generator } from "./utils/utils";
import {getAllFiles} from "./file";
import path from "path";

const app = express();
app.use(cors("*" as any));
app.use(express.json());

app.post("/deploy", async (req, res) => {
    try {
        const { repoURL } = req.body;

        const git = simpleGit();
        const id = generator();
        await git.clone(repoURL, path.join(__dirname,`./output/${id}`));
        const file = getAllFiles(path.join(__dirname,`./output/${id}`));
        console.log(file)
        res.json({
            message: "Code cloned successfully",
        });
    } catch (error) {
        // console.error("Deployment error:", error);
        res.status(500).json({ message: "Failed to clone repository" });
        console.log(error)
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000 🚀");
});
