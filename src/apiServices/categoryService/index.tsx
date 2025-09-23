import * as request from "@/utils/request";
type CategoryQueryParams = {
  page?: number;
  limit?: number;
  // Thêm các trường khác nếu cần
};

export const getAllCategories = async (params: CategoryQueryParams) => {
  try {
    const response = await request.getMethod("api/category/get-all?", {
      params,
      paramsSerializer: (params: CategoryQueryParams) => {
        const serializedParams = Object.keys(params || {})
          .map((key) => {
            const value = (params as Record<string, unknown>)[key];
            if (value === undefined) return "";
            return key + "=" + value;
          })
          .filter(Boolean)
          .join("&");

        console.log(serializedParams);

        return serializedParams;
      },
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
