import escapeHtml from "../utils/escape-html";
import fs from "fs";

test("escapes html inputs", () => {
  const file = fs.readFileSync("./__tests__/xss.txt", "utf8").split("\n");
  expect(escapeHtml("this is fine")).toBe("this is fine");
  expect(escapeHtml("<tag>")).toBe("&lt;tag&gt;");
  expect(escapeHtml("&dope")).toBe("&amp;dope");
  expect(escapeHtml("'")).toBe("&#039;");
  expect(escapeHtml("`")).toBe("&#96;");
  expect(escapeHtml('"')).toBe("&quot;");
  file.map(x => expect(escapeHtml(x)).not.toContain("<"));
  file.map(x => expect(escapeHtml(x)).not.toContain(">"));
});
