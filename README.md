# add-name-affixes

Add prefix and/or suffix to the basename of a file path or URL.  
Supports POSIX paths, Windows paths, and URLs with query/hash.

## Installation

npm install add-name-affixes

## Usage

```ts
import { addNameAffixes } from "add-name-affixes";

// Add prefix and suffix to a POSIX path
console.log(addNameAffixes("/foo/bar/file.txt", { prefix: "pre-", suffix: "-post" }));
// Output: /foo/bar/pre-file-post.txt

// Add prefix to a Windows path and keep backslashes
console.log(
  addNameAffixes("C:\\foo\\bar\\file.txt", {
    prefix: "v2_",
    keepWindowsSeparator: true,
  })
);
// Output: C:\foo\bar\v2_file.txt

// Add suffix to a URL with query and hash
console.log(
  addNameAffixes("https://example.com/dir/file.js?foo=bar#hash", { suffix: "_v1" })
);
// Output: https://example.com/dir/file_v1.js?foo=bar#hash

// If no prefix or suffix provided, input is returned as-is
console.log(addNameAffixes("/foo/bar/file.txt"));
// Output: /foo/bar/file.txt
```

## API

addNameAffixes(input: string, options?: AddNameOptions): string

- input: string — file path or URL.
- options (optional):
  - prefix?: string — string to add before the basename. Default: "".
  - suffix?: string — string to add after the basename but before extension. Default: "".
  - keepWindowsSeparator?: boolean — if true, preserve backslashes (\) in output paths. Default: false.

Returns a new string with prefix and/or suffix added to the basename part of the path or URL.

## License

MIT
