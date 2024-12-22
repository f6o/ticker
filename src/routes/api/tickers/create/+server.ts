import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = ({url}) => {
    console.log(`${url}`)
    return new Response("ok");
}