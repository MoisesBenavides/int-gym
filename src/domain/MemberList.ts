import type { Member } from "./Member.ts";

export class MemberList {
  #items: Member[] = [];

  add(item: Member): void {
    const exists = this.#items.some(
      (member) => member.documentId === item.documentId,
    );
    if (exists) {
      throw new Error("Ya existe un socio con ese documento.");
    }
    this.#items.push(item);
  }

  updateFee(_documentId: string, _fee: number): void {
    // Busca en la lista un miembro con el mismo documento por parametro
    const member = this.#items.find((m) => m.documentId === _documentId);
    if (!member) {
      throw new Error("No existe un socio con ese documento.");
    }
    member.monthlyFee = _fee;
  }

  getItems(): readonly Member[] {
    return [...this.#items];
  }

  totalFees(): number {
    return this.#items.reduce((total, member) => total + member.monthlyFee, 0);
  }

  totalDiscounted(): number {
    return this.#items.reduce(
      (total, member) => total + (member.monthlyFee * member.discount) / 100,
      0,
    );
  }
}
