import { describe, test, expect } from "vitest"
import { addNameAffixes } from "../src/index";

describe("addNameAffixes", () => {
  test("adds prefix and suffix to POSIX path", () => {
    expect(addNameAffixes("/foo/bar/file.txt", { prefix: "pre-", suffix: "-post" })).toBe(
      "/foo/bar/pre-file-post.txt"
    );
  });

  test("adds prefix and suffix to Windows path, outputs / by default", () => {
    expect(addNameAffixes("C:\\foo\\bar\\file.txt", { prefix: "pre-", suffix: "-post" })).toBe(
      "C:/foo/bar/pre-file-post.txt"
    );
  });

  test("preserves \\ in Windows path when keepWindowsSeparator = true", () => {
    expect(
      addNameAffixes("C:\\foo\\bar\\file.txt", {
        prefix: "pre-",
        suffix: "-post",
        keepWindowsSeparator: true,
      })
    ).toBe("C:\\foo\\bar\\pre-file-post.txt");
  });

  test("adds prefix to URL", () => {
    expect(addNameAffixes("https://example.com/dir/file.js", { prefix: "v2_" })).toBe(
      "https://example.com/dir/v2_file.js"
    );
  });

  test("adds suffix to hidden file", () => {
    expect(addNameAffixes("/dir/.hiddenfile", { suffix: "_bak" })).toBe("/dir/.hiddenfile_bak");
  });

  test("adds prefix to file without extension", () => {
    expect(addNameAffixes("/dir/file", { prefix: "new_" })).toBe("/dir/new_file");
  });

  test("preserves query and hash in URL", () => {
    expect(
      addNameAffixes("https://example.com/dir/file.js?foo=bar#hash", { suffix: "_v1" })
    ).toBe("https://example.com/dir/file_v1.js?foo=bar#hash");
  });

  test("returns input directly when no prefix or suffix", () => {
    const input = "/foo/bar/file.txt";
    expect(addNameAffixes(input)).toBe(input);
  });

  test("handles path without directory", () => {
    expect(addNameAffixes("file.txt", { prefix: "pre-" })).toBe("pre-file.txt");
  });

  test("handles path with only extension", () => {
    expect(addNameAffixes(".bashrc", { suffix: "_bak" })).toBe(".bashrc_bak");
  });
});
