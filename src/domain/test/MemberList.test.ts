import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import { MemberList } from "../MemberList.ts";

describe("MemberList", () => {
  let list: MemberList;
  let member: Member;

  beforeEach(() => {
    list = new MemberList();
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
    });
  });

  test("Create an empty member list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a member", () => {
    list.add(member);
    expect(list.getItems()).toEqual([member]);
  });

  test("update fee of a member", () => {
    list.add(member);
    list.updateFee(member.documentId, 1000);
    expect(list.getItems()[0].monthlyFee).toBe(1000);
  });

  test("reject a duplicated document id", () => {
    list.add(member);
    expect(() => list.add(member)).toThrow();
  });

  test("reject a non registred document id for updating fee", () => {
    expect(() => list.updateFee("00000001", 2000)).toThrow();
  });

  test("total fees", () => {
    list.add(member);
    expect(list.totalFees()).toBe(1500);
  });

  test("total discounted fees", () => {
    member.discount = 50;
    list.add(member);
    expect(list.totalDiscounted()).toBe(750);
  });
});
