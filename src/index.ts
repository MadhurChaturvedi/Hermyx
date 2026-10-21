
import express from "express";
import cors from "cors";
import { simpleGit } from "simple-git";
import { generator } from "./utils/utils";

const app = express();

app.use(cors("*" as any));
app.use(express.json());

app.post("/deploy", async (req, res) => {
    try {
        const { repoURL } = req.body;

        if (!repoURL) {
            res.status(400).json({
                message: "Repository URL is required",
            });
            return;
        }

        const git = simpleGit();
        const id = generator();
        await git.clone(repoURL, "./output/" + id);

        res.json({
            message: "Code cloned successfully",
            id: id,
        });
    } catch (error) {
        // console.error("Deployment error:", error);
        res.status(500).json({ message: "Failed to clone repository" });
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000 🚀");
});
