import { removeToken } from "@/lib/auth";

export async function POST(request) {
    const response = removeToken();
    console.log(response);
    return new Response(JSON.stringify({message: "success"}), {
        status: 200,
    });
}