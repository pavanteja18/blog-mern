// store/entry.js
import { create } from "zustand";

export const createEntryState = create((set) => ({
  entries: [],
  setEntry: (entries) => set({ entries }),

  createEntry: async (newEntry) => {
    if (!newEntry.title || !newEntry.description || !newEntry.tags) {
      return { success: false, message: "Please fill in all fields" };
    }

    const res = await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    });

    const data = await res.json();
    set((state) => ({
      entries: [...state.entries, data.entry],
    }));

    return {
      success: true,
      message: "Entry created successfully",
      entry: data.entry,
    };
  },

  fetchEntries: async () => {
    try {
      const res = await fetch("http://localhost:3000/api/entries");
      if (!res.ok) {
        console.error("Server error:", res.status);
        return;
      }
      const data = await res.json();
      set({ entries: data.entries || [] });
    } catch (error) {
      console.error("Failed to fetch entries:", error);
    }
  },
  deleteEntry: async (eid) => {
    try {
      const res = await fetch(`/api/entries/${eid}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Failed to delete." };
      }

      set((state) => ({
        entries: state.entries.filter((entry) => entry._id !== eid),
      }));

      return {
        success: true,
        message: data.message || "Entry deleted successfully.",
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "An error occurred while deleting." };
    }
  },
  updateEntry: async (id, updatedData) => {
    try {
      const res = await fetch(`/api/entries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update");

      const updatedEntry = await res.json();

      // ✅ Update entry in global state
      set((state) => ({
        entries: state.entries.map((entry) =>
          entry._id === id ? updatedEntry : entry
        ),
      }));

      return { success: true, message: "Entry updated successfully" };
    } catch (error) {
      return { success: false, message: error.message || "Update failed" };
    }
  },
}));
