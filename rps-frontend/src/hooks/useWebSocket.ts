import { useEffect, useState } from 'react';
import { WebEventType } from 'rps-shared';

export function useLocalSocket(type: WebEventType, onmessage?: (data: any, ws: WebSocket) => void) {
    const host = window.location.host;
    const url = host.includes('localhost') ? 'ws://localhost:3001' : `ws://${host}`;
    return useWebSocket(url, ws => ws.send(JSON.stringify({ type })), onmessage);
}

export function useWebSocket(url: string, onOpen?: (ws: WebSocket) => void, onmessage?: (data: any, ws: WebSocket) => void) {
    const [connected, setConnected] = useState(false);
    const [ws, setWS] = useState(null as unknown as WebSocket);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            setConnected(true);
            onOpen?.call(null, ws);
        };

        ws.onclose = () => {
            setConnected(false);
        };

        ws.onmessage = event => {
            onmessage?.call(null, JSON.parse(event.data), ws);
        };

        setWS(ws);

        return () => {
            ws.onmessage = null;
            ws.onclose = null;
            ws.close();
        };
    }, []);

    const send = (data: any) => {
        if (ws) {
            ws.send(JSON.stringify(data));
        }
    };

    return [connected, send] as [boolean, (data: any) => void];
}