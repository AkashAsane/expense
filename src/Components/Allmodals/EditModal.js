import "./EditModal.css";
import {
  Fastfood,
  Flight,
  LocalMovies,
  ShoppingBasket,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Select, MenuItem } from "@mui/material";

function EditModal({ closeEditModal, expense, handleSave }) {
  const [amount, setAmount] = useState(expense?.amount || "");
  const [price, setPrice] = useState(expense?.price || "");
  const [category, setCategory] = useState(expense?.category || "");
  const [date, setDate] = useState(expense?.date || "");

  useEffect(() => {
    if (expense) {
      setAmount(expense.amount);
      setPrice(expense.price);
      setCategory(expense.category);
      setDate(expense.date);
    }
  }, [expense]);

  const handleSaveClick = () => {
    handleSave({ ...expense, amount, price, category, date });
  };

  return (
    <div className="expensebackground">
      <div className="expensecontainer">
        <div className="expensetitle">
          <h2>Edit Expenses</h2>
        </div>

        <div className="expensebody">
          <div className="inputrows">
            <input
              type="number"
              placeholder="Income Amount"
              className="expsensetxt"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              className="expsensetxt"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="inputrows">
            <Select
              name="category"
              className="expsensetxt"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="food">
                <Fastfood className="menuitemIcon" /> Food
              </MenuItem>
              <MenuItem value="travel">
                <Flight className="menuitemIcon" /> Travel
              </MenuItem>
              <MenuItem value="movie">
                <LocalMovies className="menuitemIcon" /> Movie
              </MenuItem>
              <MenuItem value="shopping">
                <ShoppingBasket className="menuitemIcon" /> Shopping
              </MenuItem>
            </Select>
            <input
              type="text"
              placeholder="dd/mm/yy"
              className="expsensetxt"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="expsnsebuttons">
            <button className="exbutton1" onClick={handleSaveClick}>
              Save
            </button>
            <button className="exbutton2" onClick={() => closeEditModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { EditModal };
