import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const n8nWebhookUrl = 'https://n8nashseryoja.dpdns.org/webhook/09c7afc3-fcdc-45dd-a166-374f8ca139ca';

        const payloadToN8n = {
            chatInput: body.message || body.chatInput || "",
            sessionId: body.sessionId || "seryoja_portfolio_session" 
        };

        const response = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payloadToN8n),
        });

        if (!response.ok) {
            return NextResponse.json({ reply: "Ошибка связи с Seryoja_OS." }, { status: response.status });
        }

        const data = await response.json();
        
        // n8n может вернуть либо объект, либо массив объектов.
        // Нам нужно вытащить текст из поля 'output' и отдать его как 'reply'.
        let rawContent = "";
        
        if (Array.isArray(data)) {
            rawContent = data[0]?.output || data[0]?.reply || "Ответ не найден в массиве";
        } else {
            rawContent = data?.output || data?.reply || "Ответ не найден в объекте";
        }

        // ВАЖНО: Твой фронтенд ждет именно ключ "reply"
        return NextResponse.json({ reply: rawContent });

    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json({ reply: "Внутренняя ошибка сервера Next.js" }, { status: 500 });
    }
}