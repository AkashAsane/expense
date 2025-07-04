import React, { useEffect, useState } from "react";
import "./tracker.css";
import { Expensemodal, Modal } from "./../Components/Allmodals/Modal";
import { Transaction } from "../Components/Transactionview/Transaction";
import ExpensePieChart from "../Components/Charts/Piechart";

function Expense() {
  const [balance, setBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [openBalance, setOpenBalance] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [expenseAmount, setExpenseAmount] = useState("");
  const [expensePrice, setExpensePrice] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  const capitalizeEachWord = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const addExpense = () => {
    if (parseFloat(balance) < parseFloat(expensePrice)) {
      alert("Insufficient balance. Cannot add expense.");
      return;
    }

    const newExpense = {
      amount: capitalizeEachWord(expenseAmount),
      price: expensePrice,
      category: expenseCategory,
      date: expenseDate,
    };

    const updatedBalance = parseFloat(balance) - parseFloat(expensePrice);
    setBalance(updatedBalance);
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    setOpenExpense(false);
  };

  const addBalance = (incomeAmount) => {
    const amount = parseFloat(incomeAmount);
    if (!isNaN(amount)) {
      setBalance((prevBalance) => prevBalance + amount);
      setOpenBalance(false);
    } else {
      alert("Please enter a valid amount");
    }
  };

  const handleSaveExpense = (editedExpense) => {
    const updatedExpenses = expenses.map((expense, index) =>
      index === editedExpense.index
        ? {
            amount: capitalizeEachWord(editedExpense.amount),
            price: editedExpense.price,
            category: editedExpense.category,
            date: editedExpense.date,
          }
        : expense
    );
    setExpenses(updatedExpenses);
  };

  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    const storedExpenses = localStorage.getItem("expenses");
    if (storedBalance) {
      setBalance(JSON.parse(storedBalance));
    }
    if (storedExpenses) {
      const parsedExpenses = JSON.parse(storedExpenses);
      setExpenses(parsedExpenses);
      const total = parsedExpenses.reduce(
        (acc, expense) => acc + parseFloat(expense.price),
        0
      );
      setTotalExpense(total);
    }
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      localStorage.setItem("balance", JSON.stringify(balance));
      localStorage.setItem("expenses", JSON.stringify(expenses));

      const total = expenses.reduce(
        (acc, expense) => acc + parseFloat(expense.price),
        0
      );
      setTotalExpense(total);
    }
  }, [balance, expenses, dataLoaded]);

  return (
    <>
      <div className="wrapper1">
        <h1 className="title1">Expense Tracker</h1>

        <div className="section1">
          <div className="expenses">
            <div className="wallet1">
              <h3>Wallet Balance: ₹{balance} </h3>
              <button
                type="button"
                className="walletbuttons1"
                onClick={() => setOpenBalance(true)}
              >
                + Add Income
              </button>
              {openBalance && (
                <Modal closebalance={setOpenBalance} addBalance={addBalance} />
              )}
            </div>

            <div className="wallet2">
              <h3>Expenses: ₹{totalExpense} </h3>
              <button
                type="button"
                className="walletbutton2"
                onClick={() => setOpenExpense(true)}
              >
                + Add Expense
              </button>

              {openExpense && (
                <Expensemodal
                  closeexpense={setOpenExpense}
                  addExpense={addExpense}
                  setExpenseAmount={setExpenseAmount}
                  setExpensePrice={setExpensePrice}
                  setExpenseCategory={setExpenseCategory}
                  setExpenseDate={setExpenseDate}
                />
              )}
            </div>

            <div className="chart">
              <ExpensePieChart expenses={expenses} className="piechart" />
            </div>
          </div>
        </div>
      </div>

      <div className="tar">
        <Transaction
          expenses={expenses}
          handleDeleteExpense={handleDeleteExpense}
          handleSaveExpense={handleSaveExpense}
        />
      </div>
    </>
  );
}

export default Expense;
