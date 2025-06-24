import React from "react";
import { useState } from "react";
import { Select, MenuItem } from "@mui/material";

import "./Modal.css";

function Modal({ closebalance, addBalance  }) {
  const [incomeAmount, setIncomeAmount] = useState("");
  return (
    <div className="modalbackground">
      <div className="modalcontainer">
        <div className="modaltitle">
          <h2>Add Balance</h2>
        </div>
        <div >
          <form className="modalbody">
          <input type="text" required placeholder="Income Amount" className="inputtxt" value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} />
          <div className="buttons">
            <button  type="submit" className="button1" onClick={() => addBalance(incomeAmount)}>Add Balance</button>
            <button className="button2" onClick={() => closebalance(false)}>
              Cancel
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Expensemodal({ closeexpense,addExpense, setExpenseAmount, setExpensePrice, setExpenseCategory, setExpenseDate}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense();
  };

  return (
    <div className="expensebackground">
      <div className="expensecontainer">
        <div className="expensetitle">
          <h2>Add Expenses</h2>
        </div>
        <div className="expensebody">
          <form onSubmit={handleSubmit}>
            <div className="inputrows">
              <input
                type="text"
                required
                placeholder="Income Amount"
                className="expsensetxt"
                onChange={(e) => setExpenseAmount(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="Price"
                className="expsensetxt"
                onChange={(e) => setExpensePrice(e.target.value)}
              />
            </div>
            <div className="inputrows">
              <Select
                placeholder="Select Category"
                className="expsensetxt"
                onChange={(e) => setExpenseCategory(e.target.value)}
                required
              >
                <MenuItem value="food">Food</MenuItem>
                <MenuItem value="travel">Travel</MenuItem>
                <MenuItem value="movie">Movie</MenuItem>
                <MenuItem value="shopping">Shopping</MenuItem>
              </Select>
              <input
                type="text"
                placeholder="dd/mm/yy"
                className="expsensetxt"
                onChange={(e) => setExpenseDate(e.target.value)}
              />
            </div>
            <div className="expsnsebuttons">
              <button className="button1" type="submit"> + Add Expenses</button>
              <button className="exbutton2" type="button" onClick={() => closeexpense(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export { Modal, Expensemodal };
