# Filtering array of objects in react

https://contactmentor.com/reactjs-filter-array-of-objects/

1. Display all cars with details
2. Filter car list by year
3. Filter car list by maker from dropdown

```jsx
// List of all cars satisfing all the filters
const [filteredList, setFilteredList] = useState(carList);

// Selected Brand name filter
const [selectedBrand, setSelectedBrand] = useState("");
// Selected Year filter
const [selectedYear, setSelectedYear] = useState();
```

4. Know what properties we have
   Every car has following properties: name, url, release_year
   {
   name : "BMW M6",
   url : "https://www.bmw.com/en/all-models/m6/",
   release_year : "2016"
   }

5. Declaring state for filter values

filteredList : state for list of all cars that satisfy all filter conditions
selectedBrand : state for the brand_name value based on which filteredList state has to be filtered
selectedYear : state for the year which is used to filter car objects based on relase_year property

3. Display the list of items on the screen
   apply Array.map() on filteredList React state to add details of every entry to JSX code

The filteredList state initially contains the list of all the elements.

```jsx
    return (
        <div>
            {filteredList.map((car,index) => (
                    <li key={index}>
                        <a href={car.url}>{car.name}</a>
                        <span>{car.release_year}</span>
                    </li>
            ))}
        </div>
    );
    )
```

4. Filter items by brand name

Avoid filtering array when selectedBrand = "";
Filter filtedData array to include only car names with selectedBrand word.
return filteredData array

```jsx
const filteredByBrand = (filteredData) => {
  // Avoid filter for empty string
  if (!selectedBrand) {
    return filteredData;
  }

  const filteredCars = filteredData.filter(
    (car) => car.name.split(" ").indexOf(selectedBrand) !== -1
  );
  return filteredCars;
};
```

5. Filter items by year

Avoid filtering array when selectedYear == null
Filter array to include all the car objects where release_year property matches selectedYear
return filteredData array

```jsx
const filterByYear = (filteredData) => {
  if (!selectedYear) {
    return filteredData;
  }

  const filteredCars = filteredData.filter(
    (car) => car.release_year === selectedYear
  );
  return filteredCars;
};
```

6. Functions to handle filter change

Following functions to handle changes in filter values.

1. handleBrandChange : update selectedBrand state based on event target value
2. handleYearChange : Reset selectedYear if same year is selected, else selectedYear is updated with inputYear

```jsx
// Update selectedBrand state
const handleBrandChange = (event) => {
  setSelectedBrand(event.target.value);
};

// Toggle selectedYear state
const handleYearChange = (event) => {
  const inputYear = Number(event.target.id);

  if (inputYear === selectedYear) {
    setSelectedYear("");
  } else {
    setSelectedYear(inputYear);
  }
};
```

7. Add HTML for filters

Apply the jsx code

8. React Hooks to trigger update of filtered values
   The handle filter functions only update the selectedBrand and selectedYear states, but filteredByBrand and filterByYear JS functions are not triggered

```jsx
useEffect(() => {
  let filteredData = filtereByBrand(carList);
  filtedData = filterByYear(filteredData);
  setFilteredList(filteredData);
}, [selectedBrand, selectedYear]);
```
