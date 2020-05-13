import { Card } from "./card";

export const tier1Cards: Card[] = [
  // best value
  {
    color: "white",
    pointValue: 1,
    tier: 1,
    costs: [{ color: "green", amount: 4 }],
  },
  {
    color: "blue",
    pointValue: 1,
    tier: 1,
    costs: [{ color: "red", amount: 4 }],
  },
  {
    color: "green",
    pointValue: 1,
    tier: 1,
    costs: [{ color: "black", amount: 4 }],
  },
  {
    color: "red",
    pointValue: 1,
    tier: 1,
    costs: [{ color: "white", amount: 4 }],
  },
  {
    color: "black",
    pointValue: 1,
    tier: 1,
    costs: [{ color: "blue", amount: 4 }],
  },
  // great value
  {
    color: "white",
    pointValue: 0,
    tier: 1,
    costs: [
      { color: "red", amount: 2 },
      { color: "black", amount: 1 },
    ],
  },
  {
    color: "blue",
    pointValue: 0,
    tier: 1,
    costs: [
      { color: "white", amount: 1 },
      { color: "black", amount: 2 },
    ],
  },
  {
    color: "green",
    pointValue: 0,
    tier: 1,
    costs: [
      { color: "white", amount: 2 },
      { color: "blue", amount: 1 },
    ],
  },
  {
    color: "red",
    pointValue: 0,
    tier: 1,
    costs: [
      { color: "blue", amount: 2 },
      { color: "green", amount: 1 },
    ],
  },
  {
    color: "black",
    pointValue: 0,
    tier: 1,
    costs: [
      { color: "green", amount: 2 },
      { color: "red", amount: 1 },
    ],
  },
  // medium value
  {
    color: "white",
    pointValue: 0,
    tier: 1,
    costs: [{ color: "blue", amount: 3 }],
  },
  {
    color: "blue",
    pointValue: 0,
    tier: 1,
    costs: [{ color: "black", amount: 3 }],
  },
  {
    color: "green",
    pointValue: 0,
    tier: 1,
    costs: [{ color: "red", amount: 3 }],
  },
  {
    color: "red",
    pointValue: 0,
    tier: 1,
    costs: [{ color: "white", amount: 3 }],
  },
  {
    color: "black",
    pointValue: 0,
    tier: 1,
    costs: [{ color: "green", amount: 3 }],
  },
  // ok value
  {
    color: "white",
    pointValue: 0,
    tier: 1,
    costs: [
      { color: "blue", amount: 1 },
      { color: "green", amount: 1 },
      { color: "red", amount: 1 },
      { color: "black", amount: 1 },
    ],
  },
  {
    color: "blue",
    pointValue: 0,
    tier: 1,
    costs: [
      { color: "white", amount: 1 },
      { color: "green", amount: 1 },
      { color: "red", amount: 1 },
      { color: "black", amount: 1 },
    ],
  },
  {
    color: "green",
    pointValue: 0,
    tier: 1,
    costs: [
      { color: "white", amount: 1 },
      { color: "blue", amount: 1 },
      { color: "red", amount: 1 },
      { color: "black", amount: 1 },
    ],
  },
  {
    color: "red",
    pointValue: 0,
    tier: 1,
    costs: [
      { color: "white", amount: 1 },
      { color: "blue", amount: 1 },
      { color: "green", amount: 1 },
      { color: "black", amount: 1 },
    ],
  },
  {
    color: "black",
    pointValue: 0,
    tier: 1,
    costs: [
      { color: "white", amount: 1 },
      { color: "blue", amount: 1 },
      { color: "green", amount: 1 },
      { color: "red", amount: 1 },
    ],
  },
  // middling value
  {
    color: "white",
    pointValue: 0,
    tier: 1,
    costs: [
      { color: "blue", amount: 2 },
      { color: "black", amount: 2 },
    ],
  },
  {
    color: "blue",
    pointValue: 0,
    tier: 1,
    costs: [
      { color: "green", amount: 2 },
      { color: "black", amount: 2 },
    ],
  },
  {
    color: "green",
    pointValue: 0,
    tier: 1,
    costs: [
      { color: "blue", amount: 2 },
      { color: "red", amount: 2 },
    ],
  },
  {
    color: "red",
    pointValue: 0,
    tier: 1,
    costs: [
      { color: "white", amount: 2 },
      { color: "red", amount: 2 },
    ],
  },
  {
    color: "black",
    pointValue: 0,
    tier: 1,
    costs: [
      { color: "white", amount: 2 },
      { color: "green", amount: 2 },
    ],
  },
];
