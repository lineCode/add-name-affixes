const PATH_REGEX = /^(?:([a-zA-Z][\w+\-.]*:\/\/[^\/]+))?(.*\/)?([^\/]+?)(\.[^.\?#\/]+)?(\?[^#]*)?(#.*)?$/;

export interface AddNameOptions {
  prefix?: string;
  suffix?: string;
  /**
   * Whether to keep Windows-style backslash separators (`\`) in output.
   * Default is false, output will use forward slashes (`/`).
   */
  keepWindowsSeparator?: boolean;
}

/**
 * Adds a prefix and/or suffix to the basename of a given file path or URL.
 *
 * Supports both POSIX-style (`/`) and Windows-style (`\`) path separators,
 * and correctly handles URLs including query strings and hashes.
 *
 * Examples:
 * - "/foo/bar/file.txt" + prefix="pre-", suffix="-post" => "/foo/bar/pre-file-post.txt"
 * - "C:\foo\bar\file.txt" + prefix="pre-", suffix="-post" => "C:/foo/bar/pre-file-post.txt"
 * - "https://example.com/path/file.js?query=1#hash" + suffix="_v2" => "https://example.com/path/file_v2.js?query=1#hash"
 *
 * @param input The input file path or URL string.
 * @param options Optional settings:
 *   - prefix: string to add before the basename (default: "").
 *   - suffix: string to add after the basename but before extension (default: "").
 *   - keepWindowsSeparator: if true, preserves backslashes (`\`) in output (default: false).
 *
 * @returns The modified path or URL string with prefix and/or suffix added to the basename.
 *          Returns the original input if it cannot be parsed or if no prefix/suffix is provided.
 */
export function addNameAffixes(input: string, options: AddNameOptions = {}): string {
  const { prefix = "", suffix = "", keepWindowsSeparator = false } = options;

  if (!input) return input;

  // Detect if input contains Windows backslashes and is not a URL
  const hasBackslash = input.includes("\\");
  const isWin = hasBackslash && !input.includes("://");

  // Normalize Windows backslashes to forward slashes for uniform processing
  const str = hasBackslash ? input.replace(/\\/g, "/") : input;

  // Parse input into components
  const m = PATH_REGEX.exec(str);
  if (!m) return input;

  // Rebuild the path with prefix/suffix added around the basename (filename)
  const out = [
    m[1], // origin (e.g. "https://example.com")
    m[2], // directory path (e.g. "/foo/bar/")
    prefix, // prefix to add before basename
    m[3], // basename (filename without extension)
    suffix, // suffix to add after basename
    m[4], // extension (e.g. ".txt")
    m[5], // query string (e.g. "?foo=bar")
    m[6], // hash (e.g. "#hash")
  ].join("");

  // If requested, convert slashes back to Windows backslashes
  return keepWindowsSeparator && isWin ? out.replace(/\//g, "\\") : out;
}
