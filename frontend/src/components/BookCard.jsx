import { EditIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useBookStore } from "../store/useBookStore";
import StarRating from "./StarRating";

function BookCard({ book }) {
  const { deleteBook } = useBookStore();
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      <div className="h-64 w-full overflow-hidden">
        <Link to={`/books/${book.id}`}>
          <img
            src={`https://covers.openlibrary.org/b/isbn/${book.isbn}.jpg`}
            alt={book.title}
            className="w-full h-full object-contain mt-6"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/public/placeholder.jpg"; // make sure this is in /public
            }}
          />
        </Link>
      </div>

      <div className="card-body flex flex-col justify-between">
        <div>
          <Link to={`/books/${book.id}`}>
            <h2 className="card-title text-lg font-semibold hover:text-secondary">{book.title}</h2>
          </Link>
          <h3 className="text-2xl font-bold text-primary">{book.author}</h3>
          <StarRating rating={book.rating} />
        </div>

        <div className="card-actions justify-end mt-4">
          <Link
            to={`/books/edit/${book.id}`}
            className="btn btn-circle btn-outline btn-info"
          >
            <EditIcon className="size-4" />
          </Link>
          <button
            className="btn btn-circle btn-outline btn-error"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this book?")) {
                deleteBook(book.id)
              }
            }}
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
