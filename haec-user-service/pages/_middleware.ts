import type { NextFetchEvent, NextRequest } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    return new Response('Request comes from my HAEC Django service')
}

// I want this function to verify that requests are coming from my django api

// export type Middleware = (
//     request: NextRequest,
//     event: NextFetchEvent
// ) => Promise<Response | undefined> | Response | undefined
