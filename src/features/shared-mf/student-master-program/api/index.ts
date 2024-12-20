import { ApiClient } from "@pw-tech/web-sdk";
import { FaqModelObject } from "../types";

export const getFaqs = async (catId: string, isPrivate?: boolean):  Promise<FaqModelObject>   => {
    try {
      const url = `v1/faq-category/${catId}/list`;
      const config = isPrivate
    ? {} // No params if private
    : {
        params: {
          organizationId: process.env.PUBLIC_ORGANISATION_ID,
        },
      };
      const response = await ApiClient.get<{ data: FaqModelObject }>(url, config);
      return response.data;

    } catch (error) {
      console.error("Error fetching states:", error);
      throw error;
    }
  };