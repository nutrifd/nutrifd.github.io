import request, { defaultPagination } from "../../../config/request";

export const fetchFoodList = (params) => {
    defaultPagination(params);
    return request.get('/api/v1/food', { params: params});
}


export const fetchRelatedDiseaseList =  (params) => {
    defaultPagination(params);
    return request.get('/api/v1/food_disease', { params: params});
}

export const fetchRelatedNutritionList =  (params) => {
    defaultPagination(params);
    return request.get('/api/v1/food_nutrition', { params: params});
}