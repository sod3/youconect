// src/components/Withdraw.js

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// Styled components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #343a40;
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin: 10px 0 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Revenue = styled.p`
  color: #343a40;
  text-align: center;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const SuccessMessage = styled.p`
  color: green;
  text-align: center;
`;

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios
      .get("/api/revenue")
      .then((response) => {
        setTotalRevenue(response.data.totalRevenue);
      })
      .catch((error) => {
        setError("There was an error fetching the revenue!");
      });
  }, []);

  const handleWithdraw = () => {
    if (amount <= 0 || amount > totalRevenue) {
      setError("Invalid amount");
      return;
    }

    axios
      .post("/api/withdraw", {
        amount,
        paymentMethod,
      })
      .then((response) => {
        setSuccess("Withdrawal request submitted successfully");
        setTotalRevenue(totalRevenue - amount);
        setAmount("");
        setPaymentMethod("");
      })
      .catch((error) => {
        setError("There was an error processing the withdrawal!");
      });
  };

  return (
    <Container>
      <Title>Withdraw Earnings</Title>
      <Revenue>Total Revenue: ${totalRevenue.toFixed(2)}</Revenue>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      <Label htmlFor="amount">Amount</Label>
      <Input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <Label htmlFor="paymentMethod">Payment Method</Label>
      <Input
        type="text"
        id="paymentMethod"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        placeholder="Enter payment method"
      />
      <Button onClick={handleWithdraw}>Withdraw</Button>
    </Container>
  );
};

export default Withdraw;
