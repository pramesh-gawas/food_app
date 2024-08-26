import styled from "styled-components";
import SearchResult from "./components/SearchResult";

import { useEffect, useState } from "react";
export const BASE_URL = "http://localhost:9000";
function App() {
  const [data, setData] = useState(null);
  const [loading, SetLoading] = useState(false);
  const [error, SetError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedButton, setSelectedButton] = useState("all");

  useEffect(() => {
    const FetchFoodData = async () => {
      SetLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        SetLoading(false);
      } catch (error) {
        SetError("Unable to fetch data from the server!");
      }
    };
    FetchFoodData();
  }, []);
  //FetchFoodData();
  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue == "") {
      setFilteredData(null);
    }

    const filtered = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const filterFood = (type) => {
    if (type == "all") {
      setFilteredData(data);
      setSelectedButton("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedButton(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "BreakFast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading....</div>;

  return (
    <>
      {" "}
      <Container>
        <TopContainer>
          <div>
            <img src="Foody Zone.png" alt="logo" />
          </div>

          <div className="search">
            <input
              type="text"
              onChange={searchFood}
              placeholder="Search Food..."
            />
          </div>
        </TopContainer>

        <FilterContainer>
          {filterBtns.map((value) => (
            <Button key={value.name} onClick={() => filterFood(value.type)}>
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData}></SearchResult>
    </>
  );
}

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;

  .search input {
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid red;
    color: white;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;
  }
  @media (0<width<600px) {
    flex-direction: column;
  }
`;
const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
`;

export const Button = styled.button`
  background: #ff4343;
  padding: 6px 10px;
  border-radius: 5px;
  border-style: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22020;
  }
`;
