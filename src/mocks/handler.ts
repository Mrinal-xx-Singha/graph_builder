import { http, HttpResponse, delay } from 'msw'


export const handlers = [
    http.get('/api/apps', async () => {
        await delay(800) //network latency
        return HttpResponse.json([
            {
                id: 'app-1',
                name: "supertokens-golang"
            },
            {
                id: 'app-2',
                name: "supertokens-java"
            }, {
                id: 'app-3',
                name: "supertokens-python"
            }
        ])
    }),
    // get graph data for a specific app 
    http.get('/api/apps/:appId/graph', async ({ params }) => {
        await delay(1000)

        // return a default graph with 3 nodes and 2 edges 
        return HttpResponse.json({
            nodes: [
                { id: 'node-1', type: 'service', position: { x: 100, y: 100 }, data: { name: 'Postgres', status: 'Healthy', cpu: 0.02, memory: 0.05 } },
                { id: 'node-2', type: 'service', position: { x: 100, y: 400 }, data: { name: 'Redis', status: 'Error', cpu: 0.02, memory: 0.05 } },
                { id: 'node-3', type: 'service', position: { x: 500, y: 300 }, data: { name: 'Mongodb', status: 'Error', cpu: 0.02, memory: 0.05 } }
            ],
            edges: [
                { id: 'e1-2', source: 'node-1', target: 'node-2' },
                { id: 'e1-3', source: 'node-1', target: 'node-3' }
            ]
        })

    })
]