import { useState } from "react";
import dayjs from "dayjs";
import "./App.css";
import FilterBar from "./components/FilterBar";
import PersonItem from "./components/PersonItem";
import { data } from "./MOCK_DATA";

const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function App() {
  const [allData, setAllData] = useState(data);
  const generateGenderDataForDropdown = () => {
    return [...new Set(data.map((item) => item.gender))];
  };

  const handleFilterName = (name) => {
    const filterData = data.filter((item) => {
      const fullName = `${item.first_name} ${item.last_name}`;
      if (fullName.toLowerCase().includes(name.toLowerCase())) {
        return item;
      }
    });

    setAllData(filterData);
  };

  const handleFilterEmail = (email) => {
    const filterData = data.filter((item) => {
      if (item.email.toLowerCase().includes(email.toLowerCase())) return item;
    });

    setAllData(filterData);
  };

  const handleFilterGender = (gender) => {
    const filterData = data.filter((item) => {
      if (item.gender === gender) return item;
    });

    setAllData(filterData);
  };

  const handleFilterDate = (date, field) => {
    const filteredData = data.filter((item) => {
      if (field === "from" && dayjs(item.date).isSameOrAfter(dayjs(date))) {
        return item;
      }
      if (field === "to" && dayjs(item.date).isSameOrBefore(dayjs(date))) {
        return item;
      }
    });

    setAllData(filteredData);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
          <FilterBar
            genders={generateGenderDataForDropdown()}
            onNameFilter={handleFilterName}
            onEmailFilter={handleFilterEmail}
            onGenderFilter={handleFilterGender}
            onDateFilter={handleFilterDate}
          />
        </div>
        <div className="col-sm-9">
          <div className="row mt-5">
            {allData.map((item) => (
              <PersonItem item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
