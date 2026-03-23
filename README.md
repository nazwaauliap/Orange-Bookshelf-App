# Orange-Bookshelf-App
A web-based bookshelf application built with HTML, CSS, and JavaScript to add, organize, and manage books with localStorage.

# 📚 Orange Bookshelf App

A simple web application to manage a book list with a playful orange-themed UI 🍊  
This project was created as a Dicoding Coding Camp 2026 submission for the course "Belajar Membuat Front-End Web untuk Pemula".
---

## 🌐 Live Demo
https://nazwaauliap.github.io/Orange-Bookshelf-App/
---

## 🚀 Main Features
- ➕ Add new books through a form
- 📂 Display books in two shelves:
  - Unfinished (Not completed)
  - Completed
- 🔄 Move books between shelves
- 🗑️ Delete books from the list
- 💾 Store data using localStorage
---

## ⭐ Additional Features
- 🔍 Search books by title
- ✏️ Edit book data
- 🎨 Playful and modern orange-themed UI
---

## 🛠️ Technologies Used
- HTML5
- CSS3
- JavaScript (Vanilla JS)
---

## 💾 Storage System (localStorage)
This application uses the Web Storage API (localStorage) to store book data in the browser.
- Data remains available even after page refresh or browser restart
- Books are stored as an array of objects with the following structure:

```js
{
  id: number,
  title: string,
  author: string,
  year: number,
  isComplete: boolean
}
