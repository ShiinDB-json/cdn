const axios = require("axios");

async function askBlackbox(question) {
    const payload = {
        messages: [
            {
                role: "user",
                content: question,
                id: Math.random().toString(36).substring(2, 9)
            }
        ],
        id: Math.random().toString(36).substring(2, 9),
        previewToken: null,
        userId: null,
        codeModelMode: true,
        trendingAgentMode: {},
        isMicMode: false,
        userSystemPrompt: null,
        maxTokens: 1024,
        playgroundTopP: null,
        playgroundTemperature: null,
        isChromeExt: false,
        githubToken: "",
        clickedAnswer2: false,
        clickedAnswer3: false,
        clickedForceWebSearch: false,
        visitFromDelta: false,
        isMemoryEnabled: false,
        mobileClient: false,
        userSelectedModel: null,
        userSelectedAgent: "VscodeAgent",
        validated: "a38f5889-8fef-46d4-8ede-bf4668b6a9bb",
        imageGenerationMode: false,
        imageGenMode: "autoMode",
        webSearchModePrompt: false,
        deepSearchMode: false,
        promptSelection: "",
        domains: null,
        vscodeClient: false,
        codeInterpreterMode: false,
        customProfile: {
            name: "",
            occupation: "",
            traits: [],
            additionalInfo: "",
            enableNewChats: false
        },
        webSearchModeOption: {
            autoMode: true,
            webMode: false,
            offlineMode: false
        },
        session: {
            user: {
                name: "User",
                email: "example@email.com",
                image: "",
                id: cryptoRandom()
            },
            expires: new Date(Date.now() + 86400000).toISOString(),
            isNewUser: true
        },
        isPremium: false,
        teamAccount: "",
        subscriptionCache: null,
        beastMode: false,
        reasoningMode: false,
        designerMode: false,
        workspaceId: "",
        asyncMode: false,
        integrations: {},
        isTaskPersistent: false,
        selectedElement: null
    };

    try {
        const result = await axios.post(
            "https://app.blackbox.ai/api/chat",
            payload,
            {
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Content-Type": "application/json",
                    "origin": "https://app.blackbox.ai",
                    "referer": "https://app.blackbox.ai/"
                }
            }
        );

        return result.data?.split("</think>")[1]?.trim() || result.data || "";
    } catch (err) {
        throw new Error(err.response?.data || err.message);
    }
}

function cryptoRandom() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = {
    name: "Groq AI",
    desc: "Groq Chat AI models",
    category: "Openai",
    path: "/ai/groq?question=",

    async run(req, res) {
        const { question } = req.query;

        if (!question) {
            return res.json({
                status: false,
                error: "Question is required"
            });
        }

        try {
            const result = await askBlackbox(question);

            if (!result) {
                return res.status(500).json({
                    status: false,
                    error: "No response from AI"
                });
            }

            res.json({
                status: true,
                result
            });

        } catch (err) {
            res.status(500).json({
                status: false,
                error: err.message
            });
        }
    }
};