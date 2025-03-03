import request from "../../../config/request";

export const fetchAllFoodDisease =  () => {
    return request.get('/api/v1/food_disease', { params: {limit: 100}});
}