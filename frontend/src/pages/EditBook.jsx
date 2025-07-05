import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookStore } from "../store/useBookStore";
import { ArrowLeftIcon, Trash2Icon, SaveIcon } from "lucide-react";
import StarRating from "../components/StarRating";

function EditBook() {
  const {
    currentBook,
    formData,
    setFormData,
    loading,
    error,
    fetchOneBook,
    updateBook,
    deleteBook,
  } = useBookStore();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await fetchOneBook(id);
    })();
  }, [id, fetchOneBook]);

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button className="btn btn-ghost mb-8" onClick={() => navigate("/")}>
        <ArrowLeftIcon className="size-5 mr-2" />
        Back To Home
      </button>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* book image */}
        <div className="w-full h-96 md:w-90 md:h-[500px] flex items-center justify-center rounded-2xl overflow-hidden shadow-lg bg-base-100">
          <img
            src={`https://covers.openlibrary.org/b/isbn/${currentBook?.isbn}.jpg`}
            alt={currentBook?.title}
            className="size-full object-contain p-6"
          />
        </div>

        {/* book form */}
        <div className="card bg-base-100 shadow-lg md:w-[600px]">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Edit Book</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateBook(id);
              }}
              className="space-y-2"
            >
              {/* Book Name */}

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Book Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Book Name"
                  className="input input-bordered"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  maxLength={250}
                />
              </div>

              {/* Book Author */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Author
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Book Author"
                  className="input input-bordered"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  maxLength={100}
                />
              </div>
              {/* Book Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Description
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Book Description"
                  className="input input-bordered"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  maxLength={500}
                />
              </div>

              {/* Book ISBN */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">ISBN</span>
                </label>
                <input
                  type="text"
                  placeholder="Book ISBN"
                  className="input input-bordered"
                  value={formData.isbn}
                  onChange={(e) =>
                    setFormData({ ...formData, isbn: e.target.value })
                  }
                  maxLength={50}
                />
              </div>
              {/* Rating */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Rating
                  </span>
                </label>
                <StarRating
                  rating={formData.rating}
                  setRating={(value) =>
                    setFormData({ ...formData, rating: value })
                  }
                />
              </div>

              {/* Book Review */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Review
                  </span>
                </label>
                <textarea
                  placeholder="Book Review"
                  className="textarea textarea-bordered"
                  value={formData.review}
                  onChange={(e) =>
                    setFormData({ ...formData, review: e.target.value })
                  }
                  maxLength={10000}
                  rows={6}
                />
              </div>

              {/* Form Action */}
              <div className="flex justify-evenly mt-8">
                <button
                  className="btn btn-error"
                  type="button"
                  onClick={handleDelete}
                >
                  <Trash2Icon className="size-4 mr-2" />
                  Delete Book
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    loading ||
                    !formData.title ||
                    !formData.author ||
                    !formData.description ||
                    !formData.isbn ||
                    !formData.review
                  }
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="size-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBook;
