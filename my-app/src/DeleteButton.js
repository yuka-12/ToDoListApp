import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";

const DeleteButton = ({ id }) => {
  const confirmDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      fetch("api/delete.php?id=" + id, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <Button variant="outline-danger" href="/" onClick={() => confirmDelete(id)}>
      Delete
    </Button>
  );
};

export default DeleteButton;
