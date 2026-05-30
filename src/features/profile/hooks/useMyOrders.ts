import {useMemo} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {ApiClient} from '@pw-tech/web-sdk';
import {GET_MY_PURCHASES_API} from '../api/apiEndpoints';

interface MyOrderCount {
  totalCount: number | string;
  totalSuccessOrders: number | string;
  totalFailedOrders: number | string;
  totalPendingOrders: number | string;
}

interface GetMyPurchasesResponse {
  data: {
    data: MyOrder[];
    paginate?: MyOrderCount;
  };
}

const useMyOrders = ({
  status,
  limit = 20,
  enabled = true,
}: {
  status?: string;
  limit?: number;
  enabled?: boolean;
} = {}): MyOrders => {
  const {
    data,
    error,
    isLoading,
    isFetched,
    isFetching,
    refetch,
    isRefetching,
    isRefetchError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['my-purchase-orders', {status: status ?? null, limit}],
    queryFn: (queryContext: {pageParam: number}) => {
      const queryParams: Record<string, string> = {
        page: String(queryContext.pageParam || 1),
        limit: String(limit),
      };
      if (status) {
        queryParams.status = status;
      }
      return ApiClient.get<GetMyPurchasesResponse>(GET_MY_PURCHASES_API, {
        params: queryParams,
      });
    },
    initialPageParam: 1,
    enabled,
    getNextPageParam: (
      lastPage: GetMyPurchasesResponse,
      allPages: GetMyPurchasesResponse[]
    ) => {
      if (lastPage.data?.data?.length < limit) {
        return undefined;
      }
      const nextPage = (allPages?.length || 0) + 1;
      return nextPage;
    },
  });

  const myOrders = useMemo(() => {
    const result: MyOrder[] = [];
    data?.pages?.forEach((page: GetMyPurchasesResponse) => {
      page.data?.data?.forEach((item: MyOrder) => {
        if (item?.orderId) {
          result.push({
            ...item,
          });
        }
      });
    });
    return result;
  }, [data]);

  const myOrdersCounts = useMemo(() => {
    const result: MyOrderCount | undefined = (
      data?.pages?.[0] as GetMyPurchasesResponse | undefined
    )?.data?.paginate;
    return result;
  }, [data]);

  return {
    data: myOrders,
    totalCount: myOrdersCounts?.totalCount || 0,
    totalSuccessOrders: myOrdersCounts?.totalSuccessOrders || 0,
    totalFailedOrders: myOrdersCounts?.totalFailedOrders || 0,
    totalPendingOrders: myOrdersCounts?.totalPendingOrders || 0,
    error,
    isFetched,
    isFetching,
    isLoading,
    refetch,
    isRefetching,
    isRefetchError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export interface MyOrders {
  data: MyOrder[];
  totalCount: number | string;
  isLoading: boolean;
  isFetched: boolean;
  isFetching: boolean;
  refetch: () => Promise<unknown>;
  isRefetching: boolean;
  isRefetchError: boolean;
  error: Error | null;
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  totalSuccessOrders: number | string;
  totalFailedOrders: number | string;
  totalPendingOrders: number | string;
}

export interface MyOrder {
  orderId: string;
  itemName: string;
  modeOfPayment: string;
  typeOfOrder: string;
}

export default useMyOrders;
