import React from "react";
import { useState } from "react";
import { Select, MenuItem } from "@mui/material";

import "./Modal.css";

function Modal({ closebalance, addBalance }) {
  const [incomeAmount, setIncomeAmount] = useState("");

  const handleAddBalance = (e) => {
    e.preventDefault();
    const amount = parseFloat(incomeAmount);
    if (!isNaN(amount) && amount > 0) {
      addBalance(amount);
    } else {
      alert("Please enter a valid income amount.");
    }
  };

  return (
    <div className="modalbackground">
      <div className="modalcontainer">
        <div className="modaltitle">
          <h2>Add Balance</h2>
        </div>
        <form className="modalbody" onSubmit={handleAddBalance}>
          <input
            type="number"
            required
            placeholder="Income Amount"
            className="inputtxt"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
          />
          <div className="buttons">
            <button type="submit" className="button1">
              Add Balance
            </button>
            <button
              className="button2"
              type="button"
              onClick={() => closebalance(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Expensemodal({
  closeexpense,
  addExpense,
  setExpenseAmount,
  setExpensePrice,
  setExpenseCategory,
  setExpenseDate,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense();
  };

  return (
    <div className="expensebackground">
      <div className="expensecontainer">
        <div className="expensetitle">
          <h2> + Add Expense</h2>
        </div>
        <form onSubmit={handleSubmit} className="expensebody">
          <div className="inputrows">
            <input
              type="text"
              name="title"
              required
              placeholder="Expense Title"
              className="expsensetxt"
              onChange={(e) => setExpenseAmount(e.target.value)}
            />
            <input
              type="number"
              name="price"
              required
              placeholder="Expense Price"
              className="expsensetxt"
              onChange={(e) => setExpensePrice(e.target.value)}
            />
          </div>
          <div className="inputrows">
            <Select
              placeholder="Select Category"
              className="expsensetxt"
              name="cetegory"
              onChange={(e) => setExpenseCategory(e.target.value)}
              required
            >
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="travel">Travel</MenuItem>
              <MenuItem value="movie">Movie</MenuItem>
              <MenuItem value="shopping">Shopping</MenuItem>
            </Select>
            <input
              type="date"
              name="date"
              required
              className="expsensetxt"
              onChange={(e) => setExpenseDate(e.target.value)}
            />
          </div>
          <div className="expsnsebuttons">
            <button className="button1" type="submit">
              + Add Expense
            </button>
            <button
              className="button2"
              type="button"
              onClick={() => closeexpense(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export { Modal, Expensemodal };
