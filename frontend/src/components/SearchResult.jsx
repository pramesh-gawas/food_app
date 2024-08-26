import styled from "styled-components";
import { BASE_URL, Container } from "../App";
import { Button } from "../App";
const SearchResult = ({ data }) => {
  return (
    <FoodCardsContainer>
      <Container>
        <FoodCards>
          {data?.map(({ name, text, image, price }) => (
            <FoodCard key={name}>
              <div className="food_image">
                <img src={image} alt="" />
              </div>
              <div className="food-info">
                <div className="info">
                  <h3>{name}</h3>
                  <p>{text}</p>
                </div>
                <Button>${price.toFixed(2)}</Button>
              </div>
            </FoodCard>
          ))}
        </FoodCards>
      </Container>
    </FoodCardsContainer>
  );
};

export default SearchResult;

const FoodCardsContainer = styled.section`
  height: calc(100vh - 210px);
  background-image: url("/bg.png");
  background-size: cover;
`;

const FoodCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 32px;
  column-gap: 20px;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
`;
const FoodCard = styled.div`
  width: 340px;
  height: 167px;
  border: 1px solid;
  border-radius: 20px;
  display: flex;

  .food-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    padding: 10px;
  }

  h3 {
    margin-top: 8px;
    font-size: 16px;
    font-weight: 600;
  }
  p {
    margin-top: 4px;
    font-size: 12px;
  }
  button {
    font-size: 12px;
  }
`;
