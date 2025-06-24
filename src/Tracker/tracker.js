import React, { useEffect, useState } from "react";
import "./tracker.css";
import { Expensemodal, Modal } from "./../Components/Allmodals/Modal";
import { Transaction } from "../Components/Transactionview/Transaction";
import ExpensePieChart from"../Components/Charts/Piechart"
import { Margin } from "@mui/icons-material";

function Expense() {
  const [balance, setBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [openBalance, setOpenBalance] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);

  const [expenseAmount, setExpenseAmount] = useState("");
  const [expensePrice, setExpensePrice] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  const addExpense = () => {
    if (!expenseAmount || !expensePrice || !expenseCategory || !expenseDate) {
      alert("Please fill out all fields.");
      return;
    }

    if (parseFloat(expensePrice) > balance) {
      alert("Insufficient balance!");
      return;
    }

    const newExpense = {
      title: expenseAmount,
      price: parseFloat(expensePrice),
      category: expenseCategory,
      date: expenseDate,
    };

    setExpenses([...expenses, newExpense]);
    setBalance((prevBalance) => prevBalance - parseFloat(expensePrice));
    setOpenExpense(false);
  };

  const addBalance = (incomeAmount) => {
    setBalance((prevBalance) => prevBalance + incomeAmount);
    setOpenBalance(false);
  };

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("balance", JSON.stringify(balance));
  }, [expenses, balance]);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const savedBalance = JSON.parse(localStorage.getItem("balance")) || 5000;
    setExpenses(savedExpenses);
    setBalance(savedBalance);
  }, []);

  return (
    <div className="wrapper">
      <h1>Expense Tracker</h1>
      <div className="wallet-section">
        <h3>Wallet Balance: ₹{balance}</h3>
        <button onClick={() => setOpenBalance(true)}>+ Add Income</button>
        {openBalance && <Modal closebalance={setOpenBalance} addBalance={addBalance} />}
        <button onClick={() => setOpenExpense(true)}>+ Add Expense</button>
        {openExpense && (
          <ExpenseModal
            closeexpense={setOpenExpense}
            addExpense={addExpense}
            setExpenseAmount={setExpenseAmount}
            setExpensePrice={setExpensePrice}
            setExpenseCategory={setExpenseCategory}
            setExpenseDate={setExpenseDate}
          />
        )}
      </div>
    </div>
  );
}


export default Expense;