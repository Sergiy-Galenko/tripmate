import React from 'react';

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  const categories = ['Всі', 'Ресторани', 'Парки', 'Історичні'];

  return (
    <div className="category-filter">
      <select value={selectedCategory} onChange={(e) => onSelectCategory(e.target.value)}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
