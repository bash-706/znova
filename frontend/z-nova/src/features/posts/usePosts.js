import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllPosts } from '../../services/apiPosts';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function usePosts(type) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // 1. Filtering By Category (Use array of objects instead of just one category obj)
  const category = searchParams.get('category');
  const filter = !category || category === 'all' ? null : { category };

  // 2. Sorting Based On Different Criteria's
  const sortByRaw = searchParams.get('sort');
  const [field, direction] = sortByRaw ? sortByRaw.split('-') : ['', ''];
  const sort = field !== '' && direction !== '' ? { field, direction } : {};

  // 3. Pagination
  const page = !searchParams.get('page') ? 1 : searchParams.get('page');

  const {
    isLoading,
    data: { data: posts, totalDocs } = {},
    error,
  } = useQuery({
    queryKey: ['posts', filter, sort, Number(page)],
    queryFn: async () => await getAllPosts(filter, sort, Number(page), type),
    retry: false,
  });

  const pageCount = Math.ceil(totalDocs / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['posts', filter, sort, Number(page) + 1],
      queryFn: async () => await getAllPosts(filter, sort, Number(page) + 1),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['posts', filter, sort, Number(page) - 1],
      queryFn: async () => await getAllPosts(filter, sort, Number(page) - 1),
    });

  return { posts, isLoading, totalDocs, error };
}
