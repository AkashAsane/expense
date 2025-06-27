import "./Transaction.css";
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { PiPizzaLight } from "react-icons/pi";
import { BsSuitcase } from "react-icons/bs";
import { IoGiftOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { EditModal } from "../Allmodals/EditModal";
import CategoryBarChart from "../Charts/Barchart";

function Transaction({ expenses, handleDeleteExpense, handleSaveExpense }) {
  const [page, setPage] = useState(1);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

  const expensesPerPage = 3;
  const totalPages = Math.ceil(expenses.length / expensesPerPage);

  const startIndex = (page - 1) * expensesPerPage;
  const endIndex = startIndex + expensesPerPage;
  const currentExpenses = expenses.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "food":
        return <PiPizzaLight style={{ fontSize: "30px", marginLeft: "15px" }} />;
      case "travel":
        return <BsSuitcase style={{ fontSize: "30px", marginLeft: "15px" }} />;
      case "movie":
        return <IoGiftOutline style={{ fontSize: "30px", marginLeft: "15px" }} />;
      case "shopping":
        return <MdOutlineShoppingCart style={{ fontSize: "30px", marginLeft: "15px" }} />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const handleEditExpense = (expense, index) => {
    setCurrentExpense({ ...expense, index: startIndex + index });
    setOpenEdit(true);
  };

  const handleSave = (editedExpense) => {
    handleSaveExpense(editedExpense);
    setOpenEdit(false);
  };

  const categoryTotals = expenses.reduce((acc, expense) => {
    const { category, price } = expense;
    acc[category] = (acc[category] || 0) + parseFloat(price);
    return acc;
  }, {});

  return (
    <div className="Transactionsbody">
      <div className="bodycontainer">
        <div className="recentTransaction">
          <h2 className="tratxt">Recent Transaction</h2>
          {expenses.length > 0 ? (
            <div className="transactionrecords">
              {currentExpenses.map((expense, index) => (
                <div key={index} className="setrecords">
                  <div className="setimg">
                    <p>{getCategoryIcon(expense.category)}</p>
                  </div>
                  <div className="set1">
                    <div className="amount">{expense.amount}</div>
                    <div className="date">{formatDate(expense.date)}</div>
                  </div>
                  <div className="set2">
                    <p
                      style={{
                        fontSize: "20px",
                        color: "rgba(244, 187, 74, 1)",
                        fontWeight: "700",
                      }}
                    >{`₹${expense.price}`}</p>
                    <button
                      style={{ border: "none", backgroundColor: "rgba(255, 255, 255, 1)" }}
                      onClick={() => handleDeleteExpense(startIndex + index)}
                    >
                      <MdCancel className="cancel" style={{ fontSize: "40px" }} />
                    </button>
                    <button
                      style={{ border: "none", backgroundColor: "rgba(255, 255, 255, 1)" }}
                      onClick={() => handleEditExpense(expense, index)}
                    >
                      <FiEdit className="edit" style={{ fontSize: "40px" }} />
                    </button>
                    {openEdit && (
                      <EditModal
                        closeEditModal={setOpenEdit}
                        expense={currentExpense}
                        handleSave={handleSave}
                      />
                    )}
                  </div>
                </div>
              ))}
              <div className="pagination">
                <button onClick={handlePrevious} disabled={page === 1}>
                  <FaArrowLeftLong style={{ fontSize: "25px" }} />
                </button>
                <span className="page">{page}</span>
                <button onClick={handleNext} disabled={page === totalPages}>
                  <FaArrowRightLong style={{ fontSize: "25px" }} />
                </button>
              </div>
            </div>
          ) : (
            <div className="norecords">
              <h2>No Transaction Records</h2>
            </div>
          )}
        </div>

        <div className="topExpenses">
          <h2 className="norectext">Top Expenses</h2>
          <div className="topdiv">
            {Object.entries(categoryTotals).length > 0 ? (
              Object.entries(categoryTotals).map(([category, total]) => (
                <CategoryBarChart key={category} category={category} amount={total} />
              ))
            ) : (
              <div className="empty-box">No Expenses Record</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Transaction };
