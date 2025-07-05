import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";



const BASE_URL = "http://localhost:3000";

export const useBookStore = create((set, get) => ({
    //book state

    books: [],
    loading: false,
    error: null,
    currentBook: null,
    

    //form state
    formData: {
        title: "",
        author: "",
        description: "",
        isbn: "",
        review: "",
        rating: 0,

    },
    setFormData: (formData) => set({ formData }),
    resetForm: () => set({ formData: { title: "", author: "", description: "", isbn: "", review: "" } }),

    addBook: async (e) => {
        e.preventDefault();
        set({ loading: true });
        try {
            const { formData } = get();
            await axios.post(`${BASE_URL}/books/create`, formData);
            await get().fetchBook();
            get().resetForm();
            toast.success("Book Added Successfully!")
            //close the modal
            document.getElementById("add_book_modal").close();
        } catch (error) {
            toast.error("Something Went Wrong!")
        } finally {
            set({ loading: false });
        }
    },

    fetchBook: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/books`);
            set({ books: response.data.data, error: null });
        } catch (error) {
            if (error.response.status == 429) {
                set({ error: "You have exceeded the rate limit.", books: [] });
            } else {
                set({ error: error.message, books: [] })
            }
        } finally {
            set({ loading: false });
        }
    },

    deleteBook: async (id) => {
        set({ loading: true });
        try {
            await axios.delete(`${BASE_URL}/books/${id}`);
            set(
                (prev) => ({
                    books:
                        prev.books.filter(book => book.id !== id)
                })
            );
            toast.success("Book Deleted successfully");
        } catch (error) {
            console.log(error.message + " Error Deleting Book");
            toast.error(error.message);
        } finally {
            set({ loading: false });
        }
    },

    fetchOneBook: async (id) => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/books/${id}`);
            set({
                currentBook: response.data.data,
                formData: response.data.data,
                error: null
            });
        } catch (error) {
            set({ error: "Something Went Wrong", currentBook: null })
        } finally {
            set({ loading: false });
        }
    },
    updateBook: async (id) => {
        set({ loading: true });
        try {
            const { formData } = get();
            const response = await axios.put(`${BASE_URL}/books/${id}`, formData);
            set({
                currentBook: response.data.data
            });
            toast.success("Book Updated Successfully!");
        } catch (error) {
            toast.error("Something Went Wrong!");
        } finally {
            set({ loading: false });
        }
    },
}))