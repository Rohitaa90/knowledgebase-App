import "dotenv/config";
import { generateContent } from "./src/lib/gemini";

async function main() {
  console.log("Testing Gemini API...");
  const output = await generateContent("blog", "benefits of remote work", "casual");
  console.log("✅ Gemini response:\n");
  console.log(output);
}

main().catch((e) => {
  console.error("❌ Test failed:", e.message);
  process.exit(1);
});
