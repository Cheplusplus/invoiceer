export async function GET(req) {
  const data = { message: "Hello" }
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
