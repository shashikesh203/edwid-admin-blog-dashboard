const Category = {
    Travel: "Travel",
    FoodTheory: "Food Theory",
    Lifestyle: "Lifestyle",
} as const;

export type Category = typeof Category[keyof typeof Category];
export default Category;
