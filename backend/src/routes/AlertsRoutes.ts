import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import Anthropic from "@anthropic-ai/sdk";
import config from '../config/config';

const router = Router();
const getAlerts = async (req: Request, res: Response, next: NextFunction) => {
    const query:string = req.body.query;
    const anthropic = new Anthropic({ apiKey: config.anthropicApiKey });
    const profiles = [
        "Steve — Age 38, Georgia, Household Income $95k, Dependents <18: 2, Married",
        "Pam — Age 62, Georgia, Household Income $72k, Dependents <18: 0, Widowed",
        "Jordan — Age 27, Georgia, Household Income $55k, Dependents <18: 0, Single",
    ];

    const propmt = `Using the following news article "${query}". Summarize the article's financial blurbs in 2-3 sentences and Generate a personalized alert for each user profiles. The profiles are as follows, ${profiles.join(", ")}. The alert should only include information that's relevant to them and should also be 2-3 sentences. Focus only on the financial blurbs (income tax cut, child tax credit expansion, disability wage protections, etc). respond in JSON format with the keys summary and alerts. Within the alerts key, include the personalized alert keyed by the profile name.
    `

    try {
        const msg = await anthropic.messages.create({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            system: "You are a data extraction bot. Your output must be a single, valid JSON object.",
            messages: [
                {
                    role: "user",
                    content: propmt,
                }
            ]
        });
        // @ts-ignore
        let parsed:string = msg?.content?.[0]?.text;
        parsed = parsed.replace("```json", "");
        parsed = parsed.replace("```", "");
        parsed = JSON.parse(parsed);
        return res.status(201).json({ response: parsed });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ response: "Something went wrong" });
    }
};

router.post('/', getAlerts);

export default router;

