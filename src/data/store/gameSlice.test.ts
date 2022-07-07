import { configureStore } from "@reduxjs/toolkit";
import { GameStore, store } from "./appStore";
import { takeMove } from "./gameSlice";
import gameReducer from "./gameSlice";

describe("game slice", () => {
    it("has correct initial state", () => {
        expect(store.getState()).toStrictEqual({
            boardState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            turn: 1,
            winner: true,
            winnerIs: 0,
    });
  });

  describe("take move", () => {
    let testStore: GameStore;
    beforeEach(() => {
      testStore = configureStore({
        reducer: gameReducer,
      });
    });

    it("success", () => {
      testStore.dispatch(takeMove(1));
      expect(testStore.getState()).toStrictEqual({
        boardState: [0, 1, 0, 0, 0, 0, 0, 0, 0],
          turn: 2,
          winner: true,
          winnerIs: 0,
      });
      testStore.dispatch(takeMove(4));
      expect(testStore.getState()).toStrictEqual({
        boardState: [0, 1, 0, 0, 2, 0, 0, 0, 0],
          turn: 1,
          winner: true,
          winnerIs: 0,
      });
      testStore.dispatch(takeMove(0));
      expect(testStore.getState()).toStrictEqual({
        boardState: [1, 1, 0, 0, 2, 0, 0, 0, 0],
          turn: 2,
          winner: true,
          winnerIs: 0,
      });
      testStore.dispatch(takeMove(7));
      expect(testStore.getState()).toStrictEqual({
        boardState: [1, 1, 0, 0, 2, 0, 0, 2, 0],
          turn: 1,
          winner: true,
          winnerIs: 0,
      });
    });

    it("placed counter out side boards allotted numbers", () => {
      testStore = configureStore({
        reducer: gameReducer,
        preloadedState: {
          boardState: [1, 1, 0, 0, 2, 0, 0, 2, 0],
          turn: 1,
        },
      });
      expect(() => {
        testStore.dispatch(takeMove(12));
      }).toThrow("counter placed outside board");
    });

    it("place counter on top of counter", () => {
      testStore = configureStore({
        reducer: gameReducer,
        preloadedState: {
          boardState: [1, 1, 0, 0, 2, 0, 0, 2, 0],
          turn: 1,
        },
      });
      expect(() => {
        testStore.dispatch(takeMove(7));
      }).toThrow("space occupied");
    });

      it("three in a row", () => {
          testStore = configureStore({
              reducer: gameReducer,
              preloadedState: {
                  boardState: [1, 1, 1, 0, 2, 0, 0, 2, 0],
                  turn: 1,
                  winner: true,
                  winnerIs: 0,
              },
          });
      });
  });
});
