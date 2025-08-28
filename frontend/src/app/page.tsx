
'use client';
import React from "react";
import styles from "./page.module.css";
import UserForm from "./components/userForm";
import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    <div className={styles.page}>
      <ToastContainer />
      <UserForm />
    </div>
  );
}
