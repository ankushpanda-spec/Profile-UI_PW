import { ApiClient } from "@pw-tech/web-sdk";
import { FaqModel, FaqModelObject} from "../types";

export const getFaqs = async (catId: string, isPrivate?: boolean):  Promise<FaqModel[]>   => {
    try {
      const url = `v1/faq-category/${catId}/list`;
      const config = isPrivate
    ? {} // No params if private
    : {
        params: {
          organizationId: process.env.PUBLIC_ORGANISATION_ID,
        },
      };
      const response = await ApiClient.get<FaqModelObject>(url, config);
      return response.data;

    } catch (error) {
      console.error("Error fetching states:", error);
      throw error;
    }
  };