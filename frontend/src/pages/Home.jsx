import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBookStore } from "../store/useBookStore";
import { BookAlert, CirclePlus, RefreshCcwIcon } from "lucide-react";
import BookCard from "../components/BookCard";
import CreateBook from "./CreateBook";

function Home() {
  const { books, fetchBook, loading, error } = useBookStore();

  useEffect(() => {
    (async () => {
      await fetchBook();
    })();
  }, [fetchBook]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center mb-8">
        <button
          className="btn btn-primary"
          onClick={() => {
            document.getElementById("add_book_modal").showModal();
          }}
        >
          <CirclePlus className="size-5 mr-2" />
          Add New Book
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchBook}>
          <RefreshCcwIcon className="size-5" />
        </button>
      </div>

      <CreateBook />

      {error && <div className="alert alert-error mb-8">{error}</div>}

      {books.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <BookAlert className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold">No Books Found</h3>
            <p className="text-gray-500 max-w-sm">
              Add a new book to get started
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;
