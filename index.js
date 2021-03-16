const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
    const image = core.getInput('image');
    const tag = core.getInput('tag');
    const auth = core.getInput('auth');
    const url = core.getInput('url');
    console.log(`Updating ${image} to ${tag}`);
    const body = { "ref": "main", "inputs": { "image": image, "version": tag } };
    axios.post(url, body, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `token ${auth}`
        }
    }).then(function (res) {
        if (res.status != 204) {
            console.log(res);
            core.setFailed("Not a 204 response code");
        };
    })
        .catch(function (error) {
            console.log(error.message);
            console.log(error);
        });
} catch (error) {
    console.log(error.message);
    core.setFailed(error.message);
}