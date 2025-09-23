import * as request from "@/utils/request";
type ProductQueryParams = {
  page: number;
  limit: number;
  sortBy?: string;
  orderBy?: string;
  search?: string;
  brand?: string[];
  category?: string[];
  classify?: string[];
  price?: number[];
  // Thêm các trường khác nếu cần
};

export const GetProducts = async (params?: ProductQueryParams) => {
  try {
    const res = await request.getMethod("api/product/get-all", {
      params,
      paramsSerializer: (params: ProductQueryParams) => {
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
            if (key === "classify" || key === "brand" || key === "category") {
              const arr = (value as string[] | undefined) ?? [];
              let string = "";
              for (const item of arr) string += key + "=" + item + "&";
              return string;
            }
            if (key === "price") {
              const price = value as number[] | undefined;
              if (!price || price.length < 2) return "";
              let string = "";
              string += "min=" + price[0] + "&" + "max=" + price[1] + "&";
              return string;
            }
            return "";
          })
          .join("&");

        // console.log(serializedParams);
        return serializedParams;
      },
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
