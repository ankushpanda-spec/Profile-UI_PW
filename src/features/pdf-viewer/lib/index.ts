export function buildParams(params: Record<string, any>): URLSearchParams {
    const searchParams = new URLSearchParams();
  
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
  
    return searchParams;
  }
