const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
    const image = core.getInput('image');
    const tag = core.getInput('tag');
    const auth = core.getInput('auth');
    const url = "https://api.github.com/repos/sknups/DRM_Apps_Deply/actions/workflows/update_image.yml/dispatches";
    console.log(`Updating ${image} to ${tag}`);
    const body = { "ref": "main", "inputs": { "image": image, "version": tag } };
    const post = async () => {
        const res = await axios.post(url, body, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `token ${auth}`
            }
        });
        console.log(res.data);
    };
} catch (error) {
    console.log(error.message);
    core.setFailed(error.message);
}