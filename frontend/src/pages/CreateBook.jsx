import React from "react";
import {
  BookAIcon,
  FileDigit,
  PlusCircleIcon,
  ReceiptText,
  Signature,
} from "lucide-react";
import { useBookStore } from "../store/useBookStore";
import StarRating from "../components/StarRating";

function CreateBook() {
  const { addBook, formData, setFormData, resetForm, loading } = useBookStore();

  return (
    <dialog id="add_book_modal" className="modal">
      <div className="modal-box">
        {/* Close Button (use plain button, not form) */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={resetForm}
        >
          X
        </button>

        {/* Modal Header */}
        <h3 className="font-bold text-xl mb-8">Add New Book</h3>

        {/* ✅ ONLY ONE form */}
        <form onSubmit={addBook} className="space-y-6">
          <div className="grid gap-6">
            {/* Book Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Book Name
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <BookAIcon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Book Name"
                  className="input input-bordered w-full pl-10 py-3"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  maxLength={250}
                />
              </div>
            </div>

            {/* Author */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Author</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Signature className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Book Author"
                  className="input input-bordered w-full pl-10 py-3"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  required
                  maxLength={100}
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Description
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <ReceiptText className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Book Description"
                  className="input input-bordered w-full pl-10 py-3"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  maxLength={500}
                />
              </div>
            </div>

            {/* ISBN */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">ISBN</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <FileDigit className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Book ISBN"
                  className="input input-bordered w-full pl-10 py-3"
                  value={formData.isbn}
                  onChange={(e) =>
                    setFormData({ ...formData, isbn: e.target.value })
                  }
                  required
                  maxLength={50}
                />
              </div>
            </div>

            {/* Rating */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Rating</span>
              </label>
              <StarRating
                rating={formData.rating}
                setRating={(value) =>
                  setFormData({ ...formData, rating: value })
                }
              />
            </div>

            {/* Review */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Review</span>
              </label>
              <textarea
                placeholder="Enter Book Review"
                className="textarea textarea-bordered w-full py-3 pl-4"
                value={formData.review}
                onChange={(e) =>
                  setFormData({ ...formData, review: e.target.value })
                }
                required
                maxLength={10000}
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={resetForm}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={
                !formData.title ||
                !formData.author ||
                !formData.description ||
                !formData.review ||
                loading
              }
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="size-5 mr-2" /> Add Book
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Modal backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={resetForm}>close</button>
      </form>
    </dialog>
  );
}

export default CreateBook;
