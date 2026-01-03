"use client";

import { Category, FilterOptions } from "@/types";

const CATEGORIES: Category[] = [
  "Food",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Bills",
  "Other",
];

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  const handleCategoryChange = (category: Category | "All") => {
    onFilterChange({
      ...filters,
      category,
    });
  };

  const handleSearchChange = (searchTerm: string) => {
    onFilterChange({
      ...filters,
      searchTerm,
    });
  };

  const handleReset = () => {
    onFilterChange({
      startDate: "",
      endDate: "",
      category: "All",
      searchTerm: "",
    });
  };

  const hasActiveFilters =
    filters.startDate ||
    filters.endDate ||
    filters.category !== "All" ||
    filters.searchTerm;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-sm text-primary-600 hover:text-primary-800 font-medium"
          >
            Reset Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            value={filters.searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Date
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleDateChange("startDate", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Date
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleDateChange("endDate", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) =>
              handleCategoryChange(e.target.value as Category | "All")
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
