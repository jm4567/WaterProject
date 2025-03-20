import { useEffect, useState } from 'react';
import './CategoryFilter.css';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  //list of categories
  const [categories, setCateogories] = useState<string[]>([]); //remember default state

  //consuming categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/api/Water/GetProjectTypes'
        );
        const data = await response.json(); //getting the json out of it
        console.log('Fetched categories: ', data); //some more error handling
        setCateogories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories(); //calling it to run
  }, []);

  //creating a function for OnChange -- do not exort
  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value]; //see if the box is checked. question mark is true/false
    setSelectedCategories(updatedCategories); //updated the categories basically
  }

  return (
    <div className="category-filter">
      <h5>Project Types</h5>
      <div className="category-list">
        {categories.map((c) => (
          <div className="category-item" key={c}>
            <input
              type="checkbox"
              id={c}
              value={c}
              className="category-checkbox"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CategoryFilter;
