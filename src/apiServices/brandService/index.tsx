import * as request from "@/utils/request";
type BrandQueryParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  orderBy?: string;
  search?: string;
  nation?: string[];
  // Thêm các trường khác nếu cần
};

export const getAllBrands = async (params: BrandQueryParams) => {
  try {
    console.log(params);
    const response = await request.getMethod("api/brand/get-all?", {
      params,
      paramsSerializer: (params: BrandQueryParams) => {
        const serializedParams = Object.keys(params || {})
          .map((key) => {
            const value = (params as Record<string, unknown>)[key];
            if (key === "limit" || key === "page" || key === "search") {
              if (value === undefined) return "";
              return key + "=" + value;
            }
            if (key === "sortBy" || key === "orderBy") {
              if (value === undefined) return "";
              return "sort" + "=" + value;
            }
            if (key === "nation") {
              const arr = (value as string[] | undefined) ?? [];
              let string = "";
              for (const item of arr) string += key + "=" + item + "&";
              return string;
            }
          })
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
