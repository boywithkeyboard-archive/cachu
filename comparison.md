## Comparison

| | `cachu` | [`lru-cache`](https://npm.im/lru-cache) | [`memory-cache`](https://npm.im/memory-cache) | [`node-cache`](https://npm.im/node-cache) | [`flat-cache`](https://npm.im/flat-cache) | [`cache-base`](https://npm.im/cache-base)
| :--- | :----: | :----: | :----: | :----: | :----: | :----: |
| **Storage**  | Memory | Memory | Memory | Memory | Disk | Memory |
| **Mechanism**  | Date Comparison | Date Comparison | Timeout | TTL | Date Comparison | No Auto-Removing |
| **Browser Support**  | ❇️ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Asynchronous** | ✔️ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Set/Remove Item**  | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| **Update Item** | ✔️ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Steal Item** | ✔️ | ❌ | ✔️ | ❌ | ❌ | ❌ |
| **Grab Item** | ✔️ | ✔️ | ❌ | ❌ | ❌ | ❌ |
| **Has Item** | ✔️ | ✔️ | ❌ | ✔️ | ❌ | ✔️ |
| **Dump Cache** | ✔️ | ✔️ | ✔️ | ✔️ | ❌ | ❌ |
| **Prune Cache** | ✔️ | ✔️ | ❌ | ❌ | ❌ | ❌ |
| **Destroy Cache** | ✔️ | ✔️ | ✔️ | ✔️* | ✔️ | ✔️ |
| **Get Amount of Items** | ✔️ | ✔️ | ✔️ | ❌ | ❌ | ✔️ |
| **Get Keys of Items** | ✔️ | ✔️ | ✔️ | ❌ | ❌ | ✔️ |
| **Get Values of Items** | ✔️ | ✔️ | ❌ | ❌ | ❌ | ❌ |
| **Modify Max Age/Amount** | ✔️ | ✔️ | ❌ | ✔️* | ❌ | ❌ |
| **Iterate over Items** | ✔️ | ✔️ | ❌ | ❌ | ❌ | ❌ |
| **Import/Export as JSON** | ❇️ | ❌ | ✔️ | ❌ | ❌ | ❌ |
| **Open Issues** | ![][oi1] | ![][oi2] | ![][oi3] | ![][oi4] | ![][oi5] | ![][oi6] |
| **Closed Issues** | ![][ci1] | ![][ci2] | ![][ci3] | ![][ci4] | ![][ci5] | ![][ci6] |
| **Downloads** | ![][d1] | ![][d2] | ![][d3] | ![][d4] | ![][d5] | ![][d6] |
| **Dependents** | ![][de1] | ![][de2] | ![][de3] | ![][de4] | ![][de5] | ![][de6] |
| **Stars** | ![][s1] | ![][s2] | ![][s3] | ![][s4] | ![][s5] | ![][s6] |
| **TypeScript Support** | ![][ts1] | ![][ts2] | ![][ts3] | ![][ts4] | ![][ts5] | ![][ts6] |
| **Last Commit** | ![][lc1] | ![][lc2] | ![][lc3] | ![][lc4] | ![][lc5] | ![][lc6] |

\* similar feature  
\*\* planned feature  
❇️ unstable feature (available in `cachu@next`)

> ℹ️ Last updated on **December 24, 2021**

<!-- open issues -->
[oi1]: https://badgen.net/github/open-issues/azurydev/cachu?color=grey&label
[oi2]: https://badgen.net/github/open-issues/isaacs/node-lru-cache?color=grey&label
[oi3]: https://badgen.net/github/open-issues/ptarjan/node-cache?color=grey&label
[oi4]: https://badgen.net/github/open-issues/node-cache/node-cache?color=grey&label
[oi5]: https://badgen.net/github/open-issues/royriojas/flat-cache?color=grey&label
[oi6]: https://badgen.net/github/open-issues/jonschlinkert/cache-base?color=grey&label

<!-- closed issues -->

[ci1]: https://badgen.net/github/closed-issues/azurydev/cachu?color=blue&label
[ci2]: https://badgen.net/github/closed-issues/isaacs/node-lru-cache?color=blue&label
[ci3]: https://badgen.net/github/closed-issues/ptarjan/node-cache?color=blue&label
[ci4]: https://badgen.net/github/closed-issues/node-cache/node-cache?color=blue&label
[ci5]: https://badgen.net/github/closed-issues/royriojas/flat-cache?color=blue&label
[ci6]: https://badgen.net/github/closed-issues/jonschlinkert/cache-base?color=blue&label

<!-- downloads -->

[d1]: https://badgen.net/npm/dm/cachu?color=green&label
[d2]: https://badgen.net/npm/dm/lru-cache?color=green&label
[d3]: https://badgen.net/npm/dm/memory-cache?color=green&label
[d4]: https://badgen.net/npm/dm/node-cache?color=green&label
[d5]: https://badgen.net/npm/dm/flat-cache?color=green&label
[d6]: https://badgen.net/npm/dm/cache-base?color=green&label

<!-- dependents -->

[de1]: https://badgen.net/npm/dependents/cachu?color=orange&label
[de2]: https://badgen.net/npm/dependents/lru-cache?color=orange&label
[de3]: https://badgen.net/npm/dependents/memory-cache?color=orange&label
[de4]: https://badgen.net/npm/dependents/node-cache?color=orange&label
[de5]: https://badgen.net/npm/dependents/flat-cache?color=orange&label
[de6]: https://badgen.net/npm/dependents/cache-base?color=orange&label

<!-- stars -->

[s1]: https://badgen.net/github/stars/azurydev/cachu?color=yellow&label
[s2]: https://badgen.net/github/stars/isaacs/node-lru-cache?color=yellow&label
[s3]: https://badgen.net/github/stars/ptarjan/node-cache?color=yellow&label
[s4]: https://badgen.net/github/stars/node-cache/node-cache?color=yellow&label
[s5]: https://badgen.net/github/stars/royriojas/flat-cache?color=yellow&label
[s6]: https://badgen.net/github/stars/jonschlinkert/cache-base?color=yellow&label

<!-- typescript support -->

[ts1]: https://badgen.net/badge/t/included/blue?label
[ts2]: https://badgen.net/badge/t/third%20party/cyan?label
[ts3]: https://badgen.net/badge/t/third%20party/cyan?label
[ts4]: https://badgen.net/badge/t/included/blue?label
[ts5]: https://badgen.net/badge/t/third%20party/cyan?label
[ts6]: https://badgen.net/badge/t/none/grey?label

<!-- last commit -->

[lc1]: https://badgen.net/github/last-commit/azurydev/cachu?color=grey&label
[lc2]: https://badgen.net/github/last-commit/isaacs/node-lru-cache?color=grey&label
[lc3]: https://badgen.net/github/last-commit/ptarjan/node-cache?color=grey&label
[lc4]: https://badgen.net/github/last-commit/node-cache/node-cache?color=grey&label
[lc5]: https://badgen.net/github/last-commit/royriojas/flat-cache?color=grey&label
[lc6]: https://badgen.net/github/last-commit/jonschlinkert/cache-base?color=grey&label
