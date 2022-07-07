import { store } from "./appStore";
import { takeMove } from "./gameSlice";

describe("game slice", () => {
  it("has correct initial state", () => {
    expect(store.getState()).toStrictEqual({
      boardState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      turn: 1,
    });
  });
});

describe("take move", () => {
  it("success", () => {
    store.dispatch(takeMove(1));
    expect(store.getState()).toStrictEqual({
      boardState: [0, 1, 0, 0, 0, 0, 0, 0, 0],
      turn: 2,
    });
    store.dispatch(takeMove(4));
    expect(store.getState()).toStrictEqual({
      boardState: [0, 1, 0, 0, 2, 0, 0, 0, 0],
      turn: 1,
    });
    store.dispatch(takeMove(0));
    expect(store.getState()).toStrictEqual({
      boardState: [1, 1, 0, 0, 2, 0, 0, 0, 0],
      turn: 2,
    });
    store.dispatch(takeMove(7));
    expect(store.getState()).toStrictEqual({
      boardState: [1, 1, 0, 0, 2, 0, 0, 2, 0],
      turn: 1,
    });
  });
  it("place counter out side board numbers", () => {});
  it("place counter on top of counter", () => {});
  it("three in a row", () => {});
});
