import React, { useEffect } from "react";
import { useBookStore } from "../store/useBookStore";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeftIcon, EditIcon, Trash2Icon } from "lucide-react";
import StarRating from "../components/StarRating";

function ReadBook() {
  const { currentBook, fetchOneBook, loading, error, deleteBook } =
    useBookStore();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await fetchOneBook(id);
    })();
  }, [fetchOneBook, id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  if (!currentBook) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  

  const createdAt = new Date(currentBook.created_at).toString();
  const updatedAt = new Date(currentBook.updated_at).toString();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button className="btn btn-ghost mb-8" onClick={() => navigate("/")}>
        <ArrowLeftIcon className="size-5 mr-2" />
        Back To Home
      </button>

      <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="card-body flex flex-col justify-between">
          <div className="w-full h-96 md:w-90 md:h-[500px] flex items-center justify-center rounded-2xl overflow-hidden shadow-lg bg-base-100">
            <img
              src={`https://covers.openlibrary.org/b/isbn/${currentBook?.isbn}.jpg`}
              alt={currentBook?.title}
              className="size-full object-contain p-6"
            />
          </div>
          <div>
            <h2 className="card-title text-lg font-semibold ">
              {currentBook.title}
            </h2>

            <h3 className="text-2xl font-bold text-primary">
              {currentBook.author}
            </h3>

            <h4 className="text-md text-accent font-serif">
              ISBN: {currentBook.isbn}
            </h4>
            <StarRating rating={currentBook.rating} />

            <p className="my-1 font-serif">
              Created On: {createdAt.slice(4, 15)}
            </p>

            <p className="font-serif">Updated On: {updatedAt.slice(4, 15)}</p>

            <p className="my-4 font-serif">{currentBook.description}</p>
            <p className="font-serif">Review: {currentBook.review}</p>
          </div>
          <div className="card-actions justify-end mt-4">
            <Link to={`/books/edit/${currentBook.id}`}>
              <button className="btn btn-outline btn-primary">
                <EditIcon className="size-4" />
                Edit
              </button>
            </Link>
            <button className="btn btn-error" onClick={handleDelete}>
              <Trash2Icon className="size-4" />
              Delete Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadBook;
