import { ContentList } from "../components/ContentList";
import { useCategoryStore } from "../hooks/useCategoryStore";

export const Categories = () => {
  const { categories } = useCategoryStore();
  // console.log(categories)
  return (
    <>
      <div className="product-matrix-container">
        <ContentList
          contents={categories}
          contentType={"3"}
          listType="1"
          cardType={6}
        />
      </div>
    </>
  );
};
