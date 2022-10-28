// url_test.ts
import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import { rules } from "./index.ts";

const _l = console.log;


Deno.test("rules - a", () => {
  const test = "[ankan](https://www.google.com)";
  const re = rules.link.re;
  const temp = rules.link.temp;
  assertEquals(
    test.replace(re, temp),
    '<a src="https://www.google.com">ankan</a>'
  );
});

Deno.test("rules - h1", () => {
  const test = [
    ["#ankan", "<h1>ankan</h1>"],
    ["# ankan", "<h1>ankan</h1>"],
  ];
  const re = rules.h1.re;
  const temp = rules.h1.temp;
  test.forEach(([a, b]) => {
    assertEquals(a.replace(re, temp), b);
  });
});

Deno.test("rules - h2", () => {
  const test = [
    ["## ankan", "<h2>ankan</h2>"],
    ["##ankan", "<h2>ankan</h2>"],
  ];
  const re = rules.h2.re;
  const temp = rules.h2.temp;
  test.forEach(([a, b]) => {
    assertEquals(a.replace(re, temp), b);
  });
});

Deno.test("rules - h3", () => {
  const test = [
    ["###ankan", "<h3>ankan</h3>"],
    ["### ankan", "<h3>ankan</h3>"],
  ];
  const re = rules.h3.re;
  const temp = rules.h3.temp;
  test.forEach(([a, b]) => {
    assertEquals(a.replace(re, temp), b);
  });
});


