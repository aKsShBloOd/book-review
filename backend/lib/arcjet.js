import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";
import "dotenv/config";

// initialize Arcjet with your key and environment


export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        shield({mode: "LIVE"}),
        detectBot({
            mode:"LIVE",
            allow:[
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),
        tokenBucket({
            mode:"LIVE",
            refillRate:5, // 5 requests per second
            interval:10,
            capacity:10, // 10 requests in burst
        }),
    ],
});