import { assert, expect } from "chai";

import normalizeTag from "../normalizeTag.js";

describe("Normalize tag utility", function() {
  it("should normalize tags (happy path)", function() {
    const input = "mInFaNtAstIskETaG"

    const output = normalizeTag(input);

    expect(output).to.be.string("Minfantastisketag");
  })

  it("should output empty string if given empty string", function() {
    const input = ""

    const output = normalizeTag(input);

    expect(output).to.be.string("");
  })

  it("should output empty string if given non-string input", function() {
    const input = 1234

    const output = normalizeTag(input);

    expect(output).to.be.string("");
  })

  it("should trim whitespace from input", function() {
    const input = "   hej123  "

    const output = normalizeTag(input);

    expect(output).to.be.string("Hej123");
  })

  it("should work with a single character string", function() {
    const input = "h"

    const output = normalizeTag(input);

    expect(output).to.be.string("H");
  })

  it("should work with a two character string", function() {
    const input = "he"

    const output = normalizeTag(input);

    expect(output).to.be.string("He");
  })
});

