const axios = require("axios");
const fs = require("fs");
const readline = require("readline");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question("Enter GitHub username: ", async (username) => {
    if (!username) {
        console.log("Error: Username cannot be empty!");
        rl.close();
        return;
    }

    const url = `https://api.github.com/users/${username}/repos`;

    try {
        const response = await axios.get(url, {
            headers: { "User-Agent": "node.js" } // GitHub API requires a User-Agent
        });

        const repos = response.data.map(repo => repo.name);

        if (repos.length === 0) {
            console.log(`No repositories found for user "${username}".`);
        } else {
            const fileName = `${username}.txt`;
            fs.writeFileSync(fileName, repos.join("\n"));
            console.log(`Repositories saved to ${fileName}`);
        }
    } catch (error) {
        console.log("Error fetching repositories. Please check the username and try again.");
    }

    rl.close();
});
