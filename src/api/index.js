import requests from "./request";

//三级分类接口 /api/product/getBaseCategoryList get 无参数
export const reqCategoryList = () => requests({ url: "/product/getBaseCategoryList", method: "get" });