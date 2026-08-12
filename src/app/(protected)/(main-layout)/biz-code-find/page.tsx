import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import envConfig from '@/config/env-config';
import { ServerBizCodeFindCondsPageResponse } from '@/contract/biz-code-find/biz-code-find.contract';
import { definePage } from '@/lib/infra/page';
import { createServerQueryClient } from '@/server/hydration/server-query-client';
import { condsPage } from '@/server/service/eda/biz-code-find.service';
import { Maybe } from '@/server/types/index.types';

import BizCodeFindClient from './biz-code-find.client';
import { BizCodeFindQueryKey } from './biz-code-find.query-key';

const title = '编号获取';

async function Page() {
  /**
   * 创建服务端 QueryClient
   */
  const queryClient = createServerQueryClient();

  const params = {
    current: envConfig.NEXT_PUBLIC_PAGE_CURRENT,
    pageSize: envConfig.NEXT_PUBLIC_PAGE_SIZE,
  };
  /**
   * SSR 阶段预加载第一页数据
   *
   * 数据会进入 React Query 缓存
   */
  await queryClient.prefetchQuery({
    queryKey: BizCodeFindQueryKey.page(params),

    queryFn: async (): Promise<Maybe<ServerBizCodeFindCondsPageResponse>> => {
      const result = await condsPage({
        current: envConfig.NEXT_PUBLIC_PAGE_CURRENT,
        pageSize: envConfig.NEXT_PUBLIC_PAGE_SIZE,
      });
      return {
        status: 200,
        body: result,
      };
    },
  });

  // #region server data inject

  // #endregion

  return (
    /**
     * 把服务端缓存“脱水”传给客户端
     */
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BizCodeFindClient />
    </HydrationBoundary>
  );
}
export default definePage(Page);

export const metadata = {
  title,
};
