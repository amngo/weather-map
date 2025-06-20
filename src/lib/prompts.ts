export function formatRephrasePrompt(alert: string): string {
    return `
You are a weather assistant. Take the following weather alert and rephrase it so it’s easy to understand for the general public.

Make it:
- Structured with bold headlines if needed
- Easier to scan and understand quickly
- Use simple language
- Concise
- No emojis or unnecessary symbols

Return the response in JSON format with the following structure:
{
    alerts: [{
        "title": "Title of section",
        "description": "Detailed description of the alert",
    }]
}


Raw Alert:
"""
${alert}
"""
`;
}
