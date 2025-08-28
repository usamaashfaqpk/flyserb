
'use client';
import React, { ChangeEvent, useState } from "react";
import styles from "../page.module.css";
import { toast } from "react-toastify";

export default function UserForm() {
  const [form, setForm ] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/save/user-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      toast.success('Form submitted successfully!');
      setForm({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error('Error submitting form.');
    });
  }

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="name">Name:</label>
          <input type="text" required className={styles.input} value={form.name} id="name" name="name" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)} />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">Email:</label>
          <input required type="email" className={styles.input} value={form.email} id="email" name="email" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)} />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="message">Message:</label>
          <input required type="text" className={styles.input} value={form.message} id="message" name="message" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)} />
        </div>

        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
}
