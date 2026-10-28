export function GET() {
  return Response.json(
    {
      name: "Luke (嘉乐)",
      role: "Backend Developer",
      focus: ["thoughtful APIs", "efficient databases", "reliable systems"],
      loves: "the details that matter",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
