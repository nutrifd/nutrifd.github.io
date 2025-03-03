import request, { defaultPagination } from "../../../config/request";

export const fetchDiseaseList = (params) => {
    defaultPagination(params);
    return request.get('/api/v1/disease', { params: params});
}

export const fetchRelatedFoodList =  (params) => {
    defaultPagination(params);
    return request.get('/api/v1/food_disease', { params: params});
}
