import { AtpAgent } from '@atproto/api';
import { CronJob } from 'cron';
import 'dotenv/config';

const agent = new AtpAgent({
    service: 'https://bsky.social'
});

async function main() {
    await agent.login({
        identifier: process.env.BLUESKY_USERNAME as string,
        password: process.env.BLUESKY_PASSWORD as string
    });

    const random = await fetchRandomResponse();
    await agent.post({
        text: random
    });
    console.log(`Posted: ${random}`);
}

async function fetchRandomResponse(): Promise<string> {
    const response = await fetch('https://chew.pw/api/spigotdrama')
        .then(res => res.json());
    return response.response;
}

main();

const job = new CronJob('0 0 * * * *', main);
job.start();